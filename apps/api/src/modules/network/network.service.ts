import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Network } from 'src/database/entities';
import type { QueryPaginationDto } from 'src/shared/dto/pagination.query';
import type { IService } from 'src/shared/interfaces/service.interface';
import type { FetchResult } from 'src/utils/paginate';
import { FetchType, paginateEntities } from 'src/utils/paginate';
import { Repository } from 'typeorm';

import type { CreateNetworkDto } from './dto/network.create';
import type { QueryNetworkDto } from './dto/network.query';
import type { UpdateNetworkDto } from './dto/network.update';

@Injectable()
export class NetworkService
  implements
    IService<QueryNetworkDto, QueryPaginationDto, CreateNetworkDto, Network>
{
  constructor(
    @InjectRepository(Network)
    private readonly networkRepository: Repository<Network>,
  ) {}

  async getItemsByPagination(
    query?: QueryNetworkDto,
    pagination?: QueryPaginationDto,
  ): Promise<FetchResult<Network>> {
    const { chainId, search, fromDate, toDate, isActive } = query;
    const queryBuilder = this.networkRepository.createQueryBuilder('network');

    if (chainId) {
      queryBuilder.where('network.chainId = :chainId', { chainId });
    }

    if (search) {
      queryBuilder.andWhere(
        '(network.name like :search or network.symbol like :search)',
        {
          search: `%${search}%`,
        },
      );
    }

    if (fromDate) {
      queryBuilder.andWhere('network.createdAt >= :fromDate', {
        fromDate,
      });
    }

    if (toDate) {
      queryBuilder.andWhere('network.createdAt <= :toDate', {
        toDate,
      });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('network.isActive = :isActive', {
        isActive,
      });
    }

    return await paginateEntities<Network>(
      queryBuilder,
      pagination,
      FetchType.MANAGED,
    );
  }

  async getItem(chainId: number): Promise<Network> {
    const networkExist = await this.networkRepository.findOneBy({ chainId });
    if (!networkExist) {
      throw new NotFoundException('Network');
    }
    return networkExist;
  }

  async createItem(
    dto: CreateNetworkDto,
    _file: Express.Multer.File,
  ): Promise<Network> {
    const { chainId } = dto;
    let iconUrl: string;

    const networkExist = await this.networkRepository.findOneBy({
      chainId,
    });

    if (networkExist) {
      throw new ConflictException('Network already exists');
    }

    return await this.networkRepository.save({ ...dto, icon: iconUrl });
  }

  async updateItem(
    chainId: number,
    dto: UpdateNetworkDto,
    _file?: Express.Multer.File,
  ): Promise<boolean> {
    let iconUrl: string;

    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('Nothing to update!');
    }

    const networkExist = await this.networkRepository.findOneBy({
      chainId,
    });

    if (!networkExist) {
      throw new NotFoundException('Network');
    }

    const { affected } = await this.networkRepository.update(chainId, {
      ...dto,
      icon: iconUrl,
    });
    return affected > 0;
  }

  async deleteItem(chainId: number): Promise<boolean> {
    const networkExist = await this.networkRepository.findOneBy({
      chainId,
    });
    if (!networkExist) {
      throw new NotFoundException('Network');
    }
    const { affected } = await this.networkRepository.delete(chainId);
    return affected > 0;
  }
}
