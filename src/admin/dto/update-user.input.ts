import { PartialType } from '@nestjs/graphql';
import { CreateUser } from './create-user.input';

export class UpdateUser extends PartialType(CreateUser) {}
