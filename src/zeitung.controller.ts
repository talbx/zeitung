import { Controller, Get } from '@nestjs/common';
import { ZeitungService } from './zeitung.service';

@Controller('/cats')
export class ZeitungController {
  constructor(private readonly appService: ZeitungService) {}

  @Get('/hello')
  getHello(): Promise<any> {
    return this.appService.trigger("any");
  }
}
