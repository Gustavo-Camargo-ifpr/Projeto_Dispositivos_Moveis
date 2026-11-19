import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';
import { MovimentacoesService } from './movimentacoes.service';

@ApiTags('movimentacoes')
@Controller('movimentacoes')
export class MovimentacoesController {
  constructor(private readonly movimentacoesService: MovimentacoesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as movimentações da mais recente para a mais antiga' })
  @ApiResponse({ status: 200, description: 'Movimentações listadas com produto e categoria.' })
  listar() {
    return this.movimentacoesService.listar();
  }

  @Post()
  @ApiOperation({ summary: 'Registrar uma movimentação de entrada ou saída' })
  @ApiBody({ type: CreateMovimentacaoDto })
  @ApiResponse({ status: 201, description: 'Movimentação registrada e estoque atualizado.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou estoque insuficiente.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  criar(@Body() dto: CreateMovimentacaoDto) {
    return this.movimentacoesService.criar(dto);
  }
}
