import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException, ArgumentsHost } from '@nestjs/common';
import { Observable,throwError } from 'rxjs';
import { tap,map,catchError } from 'rxjs/operators';


export interface Response<T> {
  // code: Number,
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp();   // 获取请求上下文
    const response = ctx.getResponse(); // 在请求上下文中获取 response 对象
    const request = ctx.getRequest();   // 在请求上下文中获取 request 对象
    // const host = request.host()
    // const header = request.headers

    // ConfigService.get("Cors")
    console.log('Before...');
    return next
      .handle()
      .pipe(
        map(data => ({ code:200,data:data })),
        // catchError(err => throwError(new BadGatewayException())),
      );
  }
}
