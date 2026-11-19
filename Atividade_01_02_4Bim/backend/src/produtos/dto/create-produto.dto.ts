import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty({ description: 'Nome do produto', minLength: 2, example: 'Refrigerante 2L' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser um texto.' })
  @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres.' })
  nome: string;

  @ApiProperty({ description: 'Preço do produto', type: Number, example: 8.5 })
  @Type(() => Number)
  @IsNotEmpty({ message: 'O preço é obrigatório.' })
  @IsNumber({}, { message: 'O preço deve ser numérico.' })
  @IsPositive({ message: 'O preço deve ser maior que zero.' })
  preco: number;

  @ApiProperty({ description: 'Quantidade inicial em estoque', minimum: 0, example: 20 })
  @Type(() => Number)
  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  @IsInt({ message: 'A quantidade deve ser um número inteiro.' })
  @Min(0, { message: 'A quantidade deve ser maior ou igual a zero.' })
  quantidade: number;

  @ApiProperty({ description: 'ID da categoria', type: Number, example: 1 })
  @Type(() => Number)
  @IsNotEmpty({ message: 'O categoriaId é obrigatório.' })
  @IsInt({ message: 'O categoriaId deve ser um número inteiro.' })
  categoriaId: number;
}
