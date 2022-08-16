import { BadRequestException } from '@nestjs/common';

export class EntityExistException extends BadRequestException {
  constructor(error?: string) {
    super(`Duplicate Entity Error - Already Exists`, error);
  }
}
