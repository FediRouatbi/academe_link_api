import mercurius from 'mercurius';

import ERRORS from '../../assets/error-messages.json';

export type ErrorCodes = keyof typeof ERRORS;

export class GqlException extends mercurius.ErrorWithProps {
  constructor(code: ErrorCodes, message?: string, stack?: string) {
    const [status, randomCode] = code && code.split('.');
    super(
      message || ERRORS[code] || 'Internal server error!',
      { errorCode: code, stack },
      status ? +status : 500,
    );
  }
}
