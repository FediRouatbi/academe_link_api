import { ObjectType } from '@nestjs/graphql';

import { Role } from './role.entity';
import { Paginated } from '@src/graphql/shared/entities/paginated-type.entity';

@ObjectType()
export class PaginatedRole extends Paginated(Role) {}
