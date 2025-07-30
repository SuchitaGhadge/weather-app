import { Component, signal } from '@angular/core';
import { WeatherService } from './services/weather/weather-service';


import { Header } from './components/header/header';
@Component({
  selector: 'app-root',
  imports: [ Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


  weather = signal<any>(null);
  forecast = signal<any[]>([]);
  errorMessage = signal<string>('');
  outfit = signal<string>('');
  constructor(private weatherService: WeatherService){
  
  }




  //   selectCity(c: any) {
  //   this.error.set('');
  //   this.svc.getCurrent(c.lat, c.lon).subscribe({
  //     next: w => {
  //       this.weather.set(w);
  //       this.generateOutfit(w);
  //     },
  //     error: e => this.error.set(e.message)
  //   });

  //   this.svc.getForecast(c.lat, c.lon).subscribe({
  //     next: f => {
  //       this.forecast.set(f.list.slice(0, 8));
  //       this.renderChart();
  //     },
  //     error: e => console.error(e)
  //   });
  // }

  generateOutfit(data: any) {
    const t = data.main.temp;
    const cond = data.weather[0].main.toLowerCase();
    this.outfit.set(t>=25 ? (cond.includes('rain') ? 'T‑shirt + rain jacket' : 'T‑shirt + shorts') :
      t>=15 ? (cond.includes('rain') ? 'Long‑sleeve + umbrella' : 'Shirt + jeans') :
      cond.includes('snow') ? 'Heavy coat + boots' : 'Coat + scarf');
  }

}

