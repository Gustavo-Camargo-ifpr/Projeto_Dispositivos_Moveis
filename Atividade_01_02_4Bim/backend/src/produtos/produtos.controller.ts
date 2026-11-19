import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ProdutosService } from './produtos.service';

@ApiTags('produtos')
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos em ordem alfabética' })
  @ApiResponse({ status: 200, description: 'Produtos listados com suas categorias.' })
  listar() {
    return this.produtosService.listar();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar um produto pelo ID' })
  @ApiParam({ name: 'id', description: 'ID numérico do produto', example: 1 })
  @ApiResponse({ status: 200, description: 'Produto encontrado.' })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  buscarPorId(@Param('id') id: string) {
    return this.produtosService.buscarPorId(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo produto' })
  @ApiBody({ type: CreateProdutoDto })
  @ApiResponse({ status: 201, description: 'Produto criado.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  criar(@Body() dto: CreateProdutoDto) {
    return this.produtosService.criar(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um produto' })
  @ApiParam({ name: 'id', description: 'ID numérico do produto', example: 1 })
  @ApiResponse({ status: 200, description: 'Produto removido.' })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  @ApiResponse({ status: 409, description: 'Produto possui movimentações.' })
  remover(@Param('id') id: string) {
    return this.produtosService.remover(id);
  }
}
