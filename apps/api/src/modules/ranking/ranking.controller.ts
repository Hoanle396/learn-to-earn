import { Body, Controller, Get, Header, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AdminJwtGuard } from '../auth/guards/admin_jwt.guard';
import { CreateQuestionDto, PoolCreateDto } from './dto/pool.create';
import { FileInterceptor } from '@nestjs/platform-express';
import { format } from 'fast-csv';
import { Response } from 'express';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  async createPool(@Body() dto: PoolCreateDto) {}

  @Post('question')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of questions',
    type: CreateQuestionDto,
  })
  async importQuestions(@Body() body: CreateQuestionDto, @UploadedFile() file: Express.Multer.File) {
    const questions = await this.rankingService.importQuestions(file.buffer, body);
    return questions;
  }

  @Get('template')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="example.csv"')
  async templateExportCsv(@Res() res: Response) {
    const data = [
      {
        question: 'What is your name?',
        A: 'John Doe',
        B: 'Jane Doe',
        C: 'John Smith',
        D: 'Jane Smith',
        answer: 'A',
      },
    ];
    const csvStream = format({ headers: true });
    data.forEach((whitelist) => csvStream.write(whitelist));
    csvStream.pipe(res);
    csvStream.end();
  }
}
