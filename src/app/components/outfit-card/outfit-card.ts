import { UpperCasePipe } from '@angular/common';
import { Component, Input, signal, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-outfit-card',
  imports: [UpperCasePipe],
  templateUrl: './outfit-card.html',
  styleUrl: './outfit-card.css'
})
export class OutfitCard implements OnChanges {
  @Input() weather:any;
  outfit = signal<string[]>([]);

  ngOnChanges(changes: SimpleChanges): void {
    this.generateOutfit(this.weather)
  }
  generateOutfit(w: any) {
    const temp = w.main.temp;
    const cond = w.weather[0].main.toLowerCase();

    let suggestion = '';
    if (temp >= 25) {
      suggestion = cond.includes('rain')
        ? 'Light, loose-fitting clothing made from breathable fabrics like cotton or linen. A light rain jacket and  sandals'
        : 'Light, loose-fitting clothing made from breathable fabrics like cotton or linen. A sun hat and sunglasses can also be helpful';
    } else if (temp >= 15) {
      suggestion = cond.includes('rain')
        ? 'Long-sleeve shirt + umbrella + jeans'
        : 'Long pant or jeans with a long-sleeve shirt, sweater or light jacket. Closed-toe shoe may also be necessary';
    } else {
      suggestion = cond.includes('snow')
        ? 'Heavy jackets or coats, scarves, hats, gloves and warm, waterproof boots or shoe. Consider wearing a warm sweater or thermal wear'
        : 'Layers clothing, such as a light sweater under heavy jacket or coat, with long pants or jeans and closed-toe shoe or boots';
    }

    this.outfit.set(suggestion.split("."));
  }
}
