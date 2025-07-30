import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
      })
    }
}
