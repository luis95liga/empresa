import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Matricula } from '../../shared/interface/matricula.interface';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  constructor(
    private http: HttpClient
  ) { }


  getMatricula(): Observable<Matricula[]>{
    return this.http.get<Matricula[]>(`${environment.API_URL}/matricula`)
    .pipe(catchError(this.handlerError));
  }
  postMatricula(Matricula: Matricula):Observable<Matricula>{
    return this.http.post<Matricula>(`${environment.API_URL}/matricula`, Matricula)
    .pipe(catchError(this.handlerError));
  }
  getIdMatricula(pk: number | string): Observable<Matricula>{
    return this.http.get<Matricula>(`${environment.API_URL}/matricula/${pk}`)
    .pipe(catchError(this.handlerError));
  }
  putMatricula(Matricula: Matricula, pk: number | string):Observable<Matricula>{
    return this.http.put<Matricula>(`${environment.API_URL}/matricula/${pk}`, Matricula)
    .pipe(catchError(this.handlerError));
  }
  deleteMatricula(pk: number | string):Observable<Matricula>{
    return this.http.delete<Matricula>(`${environment.API_URL}/matricula/${pk}`)
    .pipe(catchError(this.handlerError));
  }

  private handlerError(err: any): Observable<never>{
    let errorMessage = 'an error occured retrienving data';
    if(err){
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
   }
}
