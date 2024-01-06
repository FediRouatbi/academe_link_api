import { registerEnumType } from '@nestjs/graphql';

export const AuthNextStepEnum: {
  PASS: 'PASS';
  TWO_FACTOR_AUTH: 'TWO_FACTOR_AUTH';
  EMAIL_VALIDATION: 'EMAIL_VALIDATION';
  RESET_PASSWOD: 'RESET_PASSWOD';
  RESET_PASSWOD_FINISH: 'RESET_PASSWOD_FINISH';
} = {
  PASS: 'PASS',
  TWO_FACTOR_AUTH: 'TWO_FACTOR_AUTH',
  EMAIL_VALIDATION: 'EMAIL_VALIDATION',
  RESET_PASSWOD: 'RESET_PASSWOD',
  RESET_PASSWOD_FINISH: 'RESET_PASSWOD_FINISH',
};

export type AuthNextStepEnum =
  (typeof AuthNextStepEnum)[keyof typeof AuthNextStepEnum];

registerEnumType(AuthNextStepEnum, {
  name: 'AuthNextStepEnum',
});
