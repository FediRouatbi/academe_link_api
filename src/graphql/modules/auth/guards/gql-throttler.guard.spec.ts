import { GqlThrottlerGuard } from './gql-throttler.guard';

describe('GqlThrottlerGuard', () => {
  it('should be defined', () => {
    expect(new GqlThrottlerGuard()).toBeDefined();
  });
});
