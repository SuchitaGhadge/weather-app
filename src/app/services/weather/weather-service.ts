import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { API_KEY, BASE_URL } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
    private key = API_KEY;
    private weatherUrl = BASE_URL + '/weather';
    constructor(private http: HttpClient){}

    getCurrent(city:string): Observable<any>{
      return this.http.get(this.weatherUrl, {
        params: {
          q: city,
          units: 'metric',
          appid: this.key
        }
      }).pipe(
          retry(1), //retry once again if failed
          catchError(this.handleError)
    );
    }

    private handleError(error: HttpErrorResponse) {
    let message = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      message = `Client error: ${error.error.message}`;
    } else if (error.status === 404) {
      message = 'City not found';
    } else if (error.status >= 500) {
      message = 'Server error, please try again later';
    } else {
      message = `Error ${error.status}: ${error.statusText}`;
    }
    return throwError(() => new Error(message));
  }
}
