import { Category, Token } from '@/databases/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from 'hidrajs-winston-logger';

@Injectable()
export class CategorySeedService {
  logger = new Logger(CategorySeedService.name);

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async bootstrap(): Promise<void> {
    await this.truncateTables();
    await this.seed();

    this.logger.log('The data seeding process for category has been completed successfully!');
  }

  private async truncateTables(): Promise<void> {
    await this.categoryRepository.query(`TRUNCATE TABLE category RESTART IDENTITY CASCADE`);
  }

  private async seed(): Promise<void> {
    const categories = [
      {
        id: 1,
        name: 'Design',
        icon: '0xc3761eb917cd790b30dad99f6cc5b4ff93c4f9ea',
        description: 'UI/UX design system',
        isActive: true,
      },
      {
        id: 2,
        name: 'Development',
        icon: '0x2e3d8b7f3f5a3f3f2b6f5e3f3f3f3f3f3f3f3f3',
        description: 'Frontend, backend, fullstack',
        isActive: true,
      },
      {
        id: 3,
        name: 'Business',
        icon: 'hahahscbwncuwuy64xsh7hj287xhjts9xi8arvxjts7',
        description: 'Business, marketing, sales',
        isActive: true,
      },
      {
        id: 4,
        name: 'IT & Software',
        icon: '0x2e3d8b7f3f5a3f3f2b6f5e3f3f3f3f3f3f3f3f3',
        description: 'IT, software, networking',
        isActive: true,
      },
      {
        id: 5,
        name: 'Personal Development',
        icon: '0x2e3d8b7f3f5a3f3f2b6f5e3f3f3f3f3f3f3f3f3',
        description: 'Personal development, productivity, leadership',
        isActive: true,
      },
      {
        id: 6,
        name: 'Health & Fitness',
        icon: '0x2e3d8b7f3f5a3f3f2b6f5e3f3f3f3f3f3f3f3f3',
        description: 'Health, fitness, nutrition',
        isActive: true,
      },
      {
        id: 7,
        name: 'Music',
        icon: '0x2e3d8b7f3f5a3f3f2b6f5e3f3f3f3f3f3f3f3f3',
        description: 'Music, instruments, production',
        isActive: true,
      },
      {
        id: 8,
        name: 'Photography',
        icon: '0x2e3d8b7f3f5a3f3f2b6f5e3f3f3f3f3f3f3f3f3',
        description: 'Photography, video, editing',
        isActive: true,
      },
      {
        id: 9,
        name: 'Marketing',
        icon: '0x2e3d8b7f3f5a3f3f2b6f5e3f3f3f3f3f3f3f3f3',
        description: 'Marketing, social media, advertising',
        isActive: true,
      },
      {
        id: 10,
        name: 'Lifestyle',
        icon: '0x2e3d8b7f3f5a3f3f2b6f5e3f3f3f3f3f3f3f3f3',
        description: 'Lifestyle, travel, fashion',
        isActive: true,
      },
    ];

    await this.categoryRepository.save(categories);
  }
}
