import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {tap, retry, catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable(
 
)
export class AuthInterceptor implements HttpInterceptor{
    constructor(private router:Router){}

    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>
	{
		if(req.headers.get('No-Auth')=='True')
			return next.handle(req.clone());

		if(localStorage.getItem('userToken')!=null)
		{
			const clonedreq=req.clone({
			headers:req.headers.set('Authorization', 'Bearer '+localStorage.getItem('userToken'))
							   //.set('Content-Type','application/json')
			});
			
			return next.handle(clonedreq).pipe(tap((err:any)=>{
					if(err instanceof HttpErrorResponse)
					{
						console.log(err);
						console.log('req url: '+req.url);
						if(err.status==401)
						{
							this.router.navigateByUrl('/login');
						}
					}
					
				}
		    ));
		

		// return next.handle(clonedreq)
		// .pipe(
		//   retry(1),
		//   catchError((error: HttpErrorResponse) => {
		// 	let errorMessage = '';
		// 	if (error.error instanceof ErrorEvent) {
		// 	  // client-side error
		// 	  errorMessage = `Error: ${error.error.message}`;
		// 	} else {
		// 	  // server-side error
		// 	  errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		// 	}
		// 	window.alert(errorMessage);
		// 	return throwError(errorMessage);
		//   }))
         }
		 else
		 {
		 	this.router.navigateByUrl('/login');
		 }
	}      
}