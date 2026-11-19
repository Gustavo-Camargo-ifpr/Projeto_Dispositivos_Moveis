import { ApiProperty } from '@nestjs/swagger';
import { TipoMovimentacao } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateMovimentacaoDto {
  @ApiProperty({ description: 'ID do produto', type: Number, example: 1 })
  @Type(() => Number)
  @IsNotEmpty({ message: 'O produtoId é obrigatório.' })
  @IsInt({ message: 'O produtoId deve ser um número inteiro.' })
  produtoId: number;

  @ApiProperty({ description: 'Tipo da movimentação', enum: TipoMovimentacao, example: 'ENTRADA' })
  @IsNotEmpty({ message: 'O tipo é obrigatório.' })
  @IsEnum(TipoMovimentacao, { message: 'O tipo deve ser ENTRADA ou SAIDA.' })
  tipo: TipoMovimentacao;

  @ApiProperty({ description: 'Quantidade movimentada', minimum: 1, example: 5 })
  @Type(() => Number)
  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  @IsInt({ message: 'A quantidade deve ser um número inteiro.' })
  @Min(1, { message: 'A quantidade deve ser maior que zero.' })
  quantidade: number;
}
