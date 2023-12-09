import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiSchema } from '../../../app/decorators/ApiSchema.decorator';
import { CustomerDto } from '../../../customer/dtos/customer.dto';

@ApiSchema({ name: 'Proposta' })
export class PolicyProposalDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '546799e9-8843-4cca-8b49-92ac4388a54f',
    description: 'Id da cotação',
    required: true,
  })
  quoteId: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'f07f595a-e526-478e-a29a-4f9376878d0a',
    description:
      'Código da campanha de venda Olga Seguros, caso haja algum código',
  })
  campaignId?: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CustomerDto)
  @ApiProperty({ type: CustomerDto, required: true })
  customer: CustomerDto;
}
