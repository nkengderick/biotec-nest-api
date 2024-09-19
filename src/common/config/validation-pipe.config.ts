import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

// Custom global validation pipe configuration
export const ValidationPipeConfig = new ValidationPipe({
  whitelist: true, // Strips properties that are not in the DTO
  forbidNonWhitelisted: true, // Throws an error if unknown properties are present
  transform: true, // Automatically transforms payloads to DTO instances

  // Customize the error response to include detailed error messages
  exceptionFactory: (errors: ValidationError[]) => {
    const errorObjects = errors.map((error) => {
      return {
        field: error.property,
        errors: Object.values(error.constraints || {}),
      };
    });

    // Collect all validation error messages into a single array
    const errorMessages = errors
      .map((error) => Object.values(error.constraints || {}))
      .flat();

    console.log(errorObjects);
    return new BadRequestException({
      statusCode: 400,
      message: errorMessages,
    });
  },
});
