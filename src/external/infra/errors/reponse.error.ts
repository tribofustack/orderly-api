import { HttpException, HttpStatus } from '@nestjs/common';

export const responseError = (err: Error) => {
  throw new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      error: err.message,
    },
    HttpStatus.BAD_REQUEST,
    {
      cause: err,
    },
  );
};
