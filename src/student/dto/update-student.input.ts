import { InputType, PartialType } from '@nestjs/graphql';
import { CreateStudent } from './create-student.input';
@InputType()
export class UpdateStudent extends PartialType(CreateStudent) {}
