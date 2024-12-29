import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto, PoolCreateDto } from './dto/pool.create';
import { parseStream } from 'fast-csv';
import { Readable } from 'stream';
import { Causes } from '@/common/exceptions/causes';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option, Prize, Quiz, RankingPool, User } from '@/databases/entities';
import { OptionQuiz } from '@/shared/enums';
import { QueryPaginationDto } from '@/shared/dto/pagination.query';
import { paginateEntities } from '@/utils/paginate';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,

    @InjectRepository(RankingPool)
    private readonly rankingPoolRepository: Repository<RankingPool>,

    @InjectRepository(Prize)
    private readonly prizeRepository: Repository<Prize>
  ) { }

  async createPool(dto: PoolCreateDto) {
    const newPool = new RankingPool();
    newPool.name = dto.name;
    newPool.description = dto.description;
    newPool.startTime = dto.startDate;
    newPool.endTime = dto.endDate;
    newPool.tags = dto.tags;
    newPool.logo = dto.logo;
    newPool.price = '0';
    newPool.questionPerPool = dto.questionPerPool;

    return this.rankingPoolRepository.save(newPool);
  }

  async importQuestions(fileBuffer: Express.Multer.File['buffer'], body: CreateQuestionDto) {
    const rankingPool = await this.rankingPoolRepository.findOneBy({ id: body.poolId });
    if (!rankingPool) throw new BadRequestException('Pool not found');

    const stream = parseStream(Readable.from(fileBuffer), { headers: true });
    const questions = [];
    stream.on('data', async (row) => {
      questions.push({
        question: row.question,
        options: {
          A: row.A,
          B: row.B,
          C: row.C,
          D: row.D,
        },
        answer: row.answer,
      });
    });

    return new Promise((resolve, reject) => {
      stream
        .on('end', async () => {
          if (questions.length === 0) throw Causes.BAD_REQUEST('Length mismatch');

          await Promise.all(
            questions.map(async (question) => {
              const { question: quiz, options, answer } = question;
              const quizEntity = await this.quizRepository.save({ question: quiz, rankingPool });
              for (const option of Object.keys(options)) {
                const newOption = new Option();
                newOption.answer = options[option];
                newOption.option = option as OptionQuiz;
                newOption.quiz = quizEntity;
                newOption.isCorrect = answer === option;
                await this.optionRepository.save(newOption);
              }
            })
          );

          resolve({ row: questions.length });
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
  catch(error) {
    throw error;
  }

  async findAll(query: QueryPaginationDto) {
    const builder = this.rankingPoolRepository.createQueryBuilder('ranking');
    return await paginateEntities(builder, query);
  }

  async findActive(query: QueryPaginationDto) {
    const builder = this.rankingPoolRepository.createQueryBuilder('ranking').where('ranking.isVerified = true');
    return await paginateEntities(builder, query);
  }

  async findOne(id: number) {
    const pool = await this.rankingPoolRepository.findOne({
      where: { id },
      relations: {
        quizzes: {
          options: true,
        },
      },
    });
    if (!pool) {
      throw new NotFoundException('pool not found');
    }
    return pool;
  }

  async getJoinedPool(id, query: QueryPaginationDto) {
    const builder = this.prizeRepository.createQueryBuilder('prize')
      .leftJoinAndSelect('prize.user', 'user')
      .where('prize.poolId = :id', { id });
    return await paginateEntities(builder, query);
  }

  async joinPool(user: User, id: number) {
    const pool = await this.rankingPoolRepository.findOne({ where: { id } });
    if (!pool) {
      throw new NotFoundException('pool not found');
    }
    const prize = new Prize();
    prize.user = user;
    prize.pool = pool;
    prize.isJoined = true;
    prize.isPassed = false;
    await this.prizeRepository.save(prize);
    return prize;
  }

  async getCertification(user: User, query: QueryPaginationDto) {
    const builder = this.prizeRepository.createQueryBuilder('prize')
      .leftJoinAndSelect('prize.pool', 'pool')
      .where('prize.userId = :id', { id: user.id })
      .andWhere('prize.isPassed = :isPassed', { isPassed: true });

    return await paginateEntities(builder, query);
  }
}
