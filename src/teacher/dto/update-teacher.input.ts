import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTeacher } from './create-teacher.input';
@InputType()
export class UpdateTeacher extends PartialType(CreateTeacher) {}
