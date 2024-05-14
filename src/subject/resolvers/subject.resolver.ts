import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Subject } from '../entities/subject.entity';
import { CreateSubjectInput } from '../dto/create-subject.input';
import { UpdateSubjectInput } from '../dto/update-subject.input';
import { SubjectService } from '../services/subject.service';

@Resolver(() => Subject)
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}

  @Mutation(() => Subject)
  createSubject(@Args('createSubject') createSubjectInput: CreateSubjectInput) {
    return this.subjectService.create(createSubjectInput);
  }

  @Query(() => [Subject], { name: 'getSubjects' })
  async getSubjects(@Args('search', { nullable: true }) search?: string) {
    return this.subjectService.findAll(search);
  }

  @Query(() => Subject, { name: 'getSubject' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subjectService.findOne(id);
  }

  @Mutation(() => Subject)
  editSubject(
    @Args('id', { type: () => Int }) id: number,
    @Args('editSubject') updateSubjectInput: UpdateSubjectInput,
  ) {
    return this.subjectService.update(id, updateSubjectInput);
  }

  @Mutation(() => Subject)
  deleteSubject(@Args('id', { type: () => Int }) id: number) {
    return this.subjectService.remove(id);
  }
}
