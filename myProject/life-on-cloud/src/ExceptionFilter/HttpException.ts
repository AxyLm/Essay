import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import * as moment from 'moment'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();   // 获取请求上下文
    const response = ctx.getResponse(); // 在请求上下文中获取 response 对象
    const request = ctx.getRequest();   // 在请求上下文中获取 request 对象
    const status = exception.getStatus();   // 获取异常的状态码
    const message = exception.message
    console.log(exception)
    response
      .status(status)
      .json({
        code: status,
        msg: message,
        timestamp: moment().format("YYYY/MM/DD hh:mm:ss"),
      });
  }
}