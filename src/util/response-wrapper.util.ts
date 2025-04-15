import { HttpStatus } from "@nestjs/common";

export function wrapResponse(response: any, message = 'Success', statusCode = HttpStatus.OK) {
  return {
    statusCode,
    message,
    response,
  };
}
