import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs';
import { API_KEY } from '../../../constants';
import { WeatherService } from '../../services/weather/weather-service';
import { WeatherCard } from '../weather-card/weather-card';
@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule, WeatherCard],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  key = API_KEY;
  searchControl = new FormControl();
  city = signal<string>('');
  cityList = signal<City[]>([]);
  weather = signal<any>(null);
  errorMessage = signal<string>('');
  selected = signal(false);
  constructor(private weatherService: WeatherService) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        filter((v: any) => v?.length >= 2),
        switchMap((query) =>
          fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&apiKey=${this.key}`
          ).then((res) => res.json())
        )
      )
      .subscribe({
        next: (data: any) => {
          this.selected.set(false)
          this.cityList.set(
            data.map((dt: any) => ({
              name: `${dt?.name}, ${dt.state ?? ''}`,
              lat: dt.lat,
              lon: dt.lon,
            }))
          );
          console.log('city list', this.cityList());
        },
      });
  }

  selectCity(city: City) {
    this.selected.set(true)
    this.errorMessage.set('');
    this.weatherService.getCurrent(city.name).subscribe({
      next: (data) => {
        console.log('weather', data);
        this.weather.set(data);
      },
      error: (err) => {
        this.errorMessage.set(err.message);
      },
    });
  }
}

interface City {
  name: string;
  lat: number;
  lon: number;
}
