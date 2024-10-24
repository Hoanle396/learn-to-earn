import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/database/entities';
import type { QueryPaginationDto } from 'src/shared/dto/pagination.query';
import type { IService } from 'src/shared/interfaces/service.interface';
import type { FetchResult } from 'src/utils/paginate';
import { FetchType, paginateEntities } from 'src/utils/paginate';
import { Repository } from 'typeorm';

import type { CreateTokenDto } from './dto/token.create';
import type { QueryTokenDto } from './dto/token.query';
import type { UpdateTokenDto } from './dto/token.update';

@Injectable()
export class TokenService
  implements IService<QueryTokenDto, QueryPaginationDto, CreateTokenDto, Token>
{
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async getItemsByPagination(
    query?: QueryTokenDto,
    pagination?: QueryPaginationDto,
  ): Promise<FetchResult<Token>> {
    const { search, contractAddress, fromDate, toDate, isActive, sort } = query;
    const queryBuilder = this.tokenRepository
      .createQueryBuilder('token')
      .select([
        'token.createdAt',
        'token.updatedAt',
        'token.deletedAt',
        'token.id',
        'token.name',
        'token.icon',
        'token.decimals',
        'token.symbol',
        'token.contractAddress',
        'token.beginningBlock',
        'token.isActive',
      ]);

    if (search) {
      queryBuilder.andWhere(
        '(token.name like :search or token.symbol like :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    if (contractAddress) {
      queryBuilder.andWhere('token.contractAddress = :contractAddress', {
        contractAddress,
      });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('token.isActive = :isActive', {
        isActive,
      });
    }

    if (fromDate) {
      queryBuilder.andWhere('token.createdAt >= :fromDate', {
        fromDate,
      });
    }

    if (toDate) {
      queryBuilder.andWhere('token.createdAt <= :toDate', {
        toDate,
      });
    }

    if (sort) {
      queryBuilder.orderBy('token.createdAt', sort);
    }

    return await paginateEntities<Token>(
      queryBuilder,
      pagination,
      FetchType.MANAGED,
    );
  }

  async getItem(id: number): Promise<Token> {
    const tokenExist = await this.tokenRepository.findOneBy({ id });
    if (!tokenExist) {
      throw new NotFoundException('Token');
    }
    return tokenExist;
  }

  async createItem(
    dto: CreateTokenDto,
    file: Express.Multer.File,
  ): Promise<Token> {
    const { contractAddress } = dto;
    let iconUrl: string;

    const networkExist = await this.tokenRepository.findOneBy({
      contractAddress,
    });

    if (networkExist) {
      throw new ConflictException('Token already exists');
    }

    if (file) {
      iconUrl = '';
    }

    return await this.tokenRepository.save({ ...dto, icon: iconUrl });
  }

  async updateItem(
    id: number,
    dto: UpdateTokenDto,
    file?: Express.Multer.File,
  ): Promise<boolean> {
    let iconUrl: string;

    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('Nothing to update!');
    }

    const networkExist = await this.tokenRepository.findOneBy({
      id,
    });

    if (!networkExist) {
      throw new NotFoundException('Token');
    }

    if (file) {
      iconUrl = '';
    }

    const { affected } = await this.tokenRepository.update(id, {
      ...dto,
      icon: iconUrl,
    });
    return affected > 0;
  }

  async deleteItem(id: number): Promise<boolean> {
    const networkExist = await this.tokenRepository.findOneBy({
      id,
    });
    if (!networkExist) {
      throw new NotFoundException('Token');
    }

    const { affected } = await this.tokenRepository.delete(id);
    return affected > 0;
  }
}