import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Returns a Hello World message' })
  @ApiResponse({
    status: 200,
    description: 'The Hello World message has been successfully returned.',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
