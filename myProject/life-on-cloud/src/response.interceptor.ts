import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable,throwError } from 'rxjs';
import { tap,map,catchError } from 'rxjs/operators';


export interface Response<T> {
  // code: Number,
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T,Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    console.log('Before...');
    return next
      .handle()
      .pipe(
        map(data => ({ data })),
        // catchError(err => throwError(new BadGatewayException())),
      );
  }
}
