import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(private readonly prisma: PrismaService) {}

  private validarId(id: string): number {
    const numero = Number(id);
    if (!/^\d+$/.test(id) || !Number.isInteger(numero)) {
      throw new BadRequestException('O ID deve ser numérico.');
    }
    return numero;
  }

  async listar() {
    return this.prisma.produto.findMany({
      orderBy: { nome: 'asc' },
      select: {
        id: true,
        nome: true,
        preco: true,
        quantidade: true,
        categoria: { select: { id: true, nome: true } },
      },
    });
  }

  async buscarPorId(id: string) {
    const produtoId = this.validarId(id);
    const produto = await this.prisma.produto.findUnique({
      where: { id: produtoId },
      select: {
        id: true,
        nome: true,
        preco: true,
        quantidade: true,
        categoria: { select: { id: true, nome: true } },
      },
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }
    return produto;
  }

  async criar(dto: CreateProdutoDto) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id: dto.categoriaId },
    });
    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    return this.prisma.produto.create({
      data: {
        nome: dto.nome,
        preco: dto.preco,
        quantidade: dto.quantidade,
        categoriaId: dto.categoriaId,
      },
      select: {
        id: true,
        nome: true,
        preco: true,
        quantidade: true,
        categoria: { select: { id: true, nome: true } },
      },
    });
  }

  async remover(id: string) {
    const produtoId = this.validarId(id);

    return this.prisma.$transaction(async (tx) => {
      const produto = await tx.produto.findUnique({
        where: { id: produtoId },
        include: { _count: { select: { movimentacoes: true } } },
      });

      if (!produto) {
        throw new NotFoundException('Produto não encontrado.');
      }
      if (produto._count.movimentacoes > 0) {
        throw new ConflictException('O produto possui movimentações registradas e não pode ser removido.');
      }

      await tx.produto.delete({ where: { id: produtoId } });
      return { message: 'Produto removido com sucesso.' };
    }, {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    });
  }
}
