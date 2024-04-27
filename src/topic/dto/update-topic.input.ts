import {  InputType, PartialType } from '@nestjs/graphql';
import { CreateTopic } from './create-topic.input';

@InputType()
export class UpdateTopic extends PartialType(CreateTopic) {}
