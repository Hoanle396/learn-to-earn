import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { SocialAuthEnum } from 'src/shared/enums';

export class CreateUserBySocialDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    enum: SocialAuthEnum,
    example: SocialAuthEnum.GOOGLE,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  provider: SocialAuthEnum;
}
