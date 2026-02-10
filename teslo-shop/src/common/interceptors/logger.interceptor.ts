import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorLoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();

    return next.handle().pipe(
      catchError((error) => {
        // Solo logueamos errores inesperados
        if (!error?.status || error.status >= 500) {
          this.logger.error(
            `Error en ${req.method} ${req.url}`,
            error.stack,
          );
        }

        return throwError(() => error);
      }),
    );
  }
}