import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  stopAtFirstError: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) =>
    new HttpException(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: errors.reduce(cbReduce, {}),
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    ),
};

const cbReduce = (accumulator, currentValue) => {
  if (
    Array.isArray(currentValue.children) &&
    currentValue.children.length > 0
  ) {
    const childCurrentValue = currentValue.children.reduce(cbReduce, {});
    return { ...accumulator, ...childCurrentValue };
  }
  return {
    ...accumulator,
    [currentValue.property]: Object.values(currentValue.constraints).join(', '),
  };
};

export default validationOptions;
