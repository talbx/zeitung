import {NestFactory} from '@nestjs/core';
import {ZeitungModule} from './zeitung.module';
import {ZeitungService} from "./zeitung.service";
import {HttpStatus} from "@nestjs/common";
import {Callback, Context, Handler} from "aws-lambda";


export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback,
) => {
  const appContext = await NestFactory.createApplicationContext(ZeitungModule);
  const appService = appContext.get(ZeitungService);
  const resp = await appService.trigger(event)
  return {
    body: resp,
    statusCode: HttpStatus.OK,
  };
};