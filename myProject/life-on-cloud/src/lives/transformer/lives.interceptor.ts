import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap,map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class LivesInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable< Response<T> > {
    return next.handle()
      .pipe(
        map(data => ({ data }))
      );
  }
}

// @Injectable()
// export class LivesInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     console.log('Before...');
//     return next
//       .handle()
//       .pipe(
//         tap(() => console.log(`After...`)),
//       );
//   }
// }
