import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitCard } from './outfit-card';

describe('OutfitCard', () => {
  let component: OutfitCard;
  let fixture: ComponentFixture<OutfitCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutfitCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutfitCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
