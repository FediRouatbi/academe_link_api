import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
  Query,
} from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { Auth } from '../models/auth.model';
import { Token } from '../models/token.model';
import { LoginInput } from '../dto/login.input';
import { SignupInput } from '../dto/signup.input';
import { RefreshTokenInput } from '../dto/refresh-token.input';
import { GqlAuthGuard, UserEntity } from '../gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../dto/user.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Query(() => CurrentUser)
  @UseGuards(GqlAuthGuard)
  async getCurrentUser(@UserEntity() user: CurrentUser) {
    return user;
  }

  @Mutation(() => Auth)
  async signup(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase();
    const { accessToken, refreshToken } = await this.auth.createUser(data);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Auth)
  async login(@Args('data') { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.auth.login(
      email.toLowerCase(),
      password,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token);
  }
}
