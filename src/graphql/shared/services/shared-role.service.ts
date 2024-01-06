import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { RoleFindOptionsInput } from '@src/graphql/modules/role/dto/role-find-options.input';
import { PaginatedRole } from '@src/graphql/modules/role/entities/paginated-role.entity';

import { PrismaService } from '@src/common/services/prisma.service';

import { PaginationInput } from '../dto/pagination.input';

@Injectable()
export class SharedRoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllPaginated(
    paginationInput?: PaginationInput,
    roleFindOptionsInput?: RoleFindOptionsInput,
    extraFind: Prisma.roleWhereInput = {},
  ): Promise<PaginatedRole> {
    const { filterOption, searchOption, sortOption } = roleFindOptionsInput;
    const [res, pageInfo] = await this.prismaService
      .withExtensions()
      .role.paginate({
        where: {
          AND: [
            extraFind,
            searchOption?.getWhereStatement || {},
            filterOption || {},
          ],
        },
        orderBy: sortOption?.getSortStatement || {},
      })
      .withPages(paginationInput);

    return { pageInfo, data: res };
  }
}
