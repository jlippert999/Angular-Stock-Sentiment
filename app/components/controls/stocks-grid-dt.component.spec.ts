import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksGridDtComponent } from './stocks-grid-dt.component';

describe('StocksGridDtComponent', () => {
  let component: StocksGridDtComponent;
  let fixture: ComponentFixture<StocksGridDtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksGridDtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksGridDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
