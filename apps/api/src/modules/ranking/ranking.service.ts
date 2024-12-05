import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto, PoolCreateDto } from './dto/pool.create';
import { parseStream } from 'fast-csv';
import { Readable } from 'stream';
import { Causes } from '@/common/exceptions/causes';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option, Quiz, RankingPool, UserQuiz } from '@/databases/entities';
import { OptionQuiz } from '@/shared/enums';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,

    @InjectRepository(RankingPool)
    private readonly rankingPoolRepository: Repository<RankingPool>,

    @InjectRepository(UserQuiz)
    private readonly userQuizRepository: Repository<UserQuiz>
  ) {}

  createPool(dto: PoolCreateDto) {
    const newPool = new RankingPool();
    newPool.name = dto.name;
    newPool.description = dto.description;
    newPool.startTime = dto.startDate;
    newPool.endTime = dto.endDate;
    newPool.tags = dto.tags;
    newPool.logo = dto.logo;
    newPool.price = dto.price;
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
}
