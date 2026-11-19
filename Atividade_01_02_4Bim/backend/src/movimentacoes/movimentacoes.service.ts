import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, TipoMovimentacao } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';

@Injectable()
export class MovimentacoesService {
  constructor(private readonly prisma: PrismaService) {}

  async listar() {
    return this.prisma.movimentacao.findMany({
      orderBy: { criadoEm: 'desc' },
      select: {
        id: true,
        tipo: true,
        quantidade: true,
        criadoEm: true,
        produto: {
          select: {
            id: true,
            nome: true,
            preco: true,
            quantidade: true,
            categoria: { select: { id: true, nome: true } },
          },
        },
      },
    });
  }

  async criar(dto: CreateMovimentacaoDto) {
    return this.prisma.$transaction(async (tx) => {
      const produto = await tx.produto.findUnique({
        where: { id: dto.produtoId },
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

      let produtoAtualizado;

      if (dto.tipo === TipoMovimentacao.SAIDA) {
        const resultado = await tx.produto.updateMany({
          where: {
            id: dto.produtoId,
            quantidade: { gte: dto.quantidade },
          },
          data: { quantidade: { decrement: dto.quantidade } },
        });

        if (resultado.count === 0) {
          throw new BadRequestException(
            `Estoque insuficiente. Disponível: ${produto.quantidade}, solicitado: ${dto.quantidade}`,
          );
        }

        produtoAtualizado = await tx.produto.findUniqueOrThrow({
          where: { id: dto.produtoId },
          select: {
            id: true,
            nome: true,
            preco: true,
            quantidade: true,
            categoria: { select: { id: true, nome: true } },
          },
        });
      } else {
        produtoAtualizado = await tx.produto.update({
          where: { id: dto.produtoId },
          data: { quantidade: { increment: dto.quantidade } },
          select: {
            id: true,
            nome: true,
            preco: true,
            quantidade: true,
            categoria: { select: { id: true, nome: true } },
          },
        });
      }

      const movimentacao = await tx.movimentacao.create({
        data: {
          produtoId: dto.produtoId,
          tipo: dto.tipo,
          quantidade: dto.quantidade,
        },
      });

      return {
        id: movimentacao.id,
        produto: produtoAtualizado,
        tipo: movimentacao.tipo,
        quantidade: movimentacao.quantidade,
        criadoEm: movimentacao.criadoEm,
      };
    }, {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    });
  }
}
