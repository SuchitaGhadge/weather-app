import { Component, Input, OnChanges, signal } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  imports: [],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css'
})
export class WeatherCard implements OnChanges{
@Input() weather:any;
time = signal('')

ngOnChanges(): void {
    console.log(this.weather)
}
}
