import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockHistoricalComponent } from './stock-historical.component';

describe('StockHistoricalComponent', () => {
  let component: StockHistoricalComponent;
  let fixture: ComponentFixture<StockHistoricalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockHistoricalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
