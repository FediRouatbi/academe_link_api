import { ObjectType } from '@nestjs/graphql';
import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {}
