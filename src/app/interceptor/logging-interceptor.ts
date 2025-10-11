import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const t0 = Date.now();
  
  return next(req).pipe(
    tap(() => console.log('HTTP OK:', req.method, req.url)), //le tap se declenche si tout se passe bien et on affiche la methode et l'url
    //le catchError se declenche si il y a une erreur
    catchError(err => {
      console.error('HTTP ERR:', req.method, req.url, err.status);
      return throwError(() => err);
    }),
    finalize(() => console.log('HTTP', req.method, req.url, //finalize se declenche dans les deux cas 
      'durée=', Date.now() - t0, 'ms')) //on verifie la duree de la requete
  );
};
