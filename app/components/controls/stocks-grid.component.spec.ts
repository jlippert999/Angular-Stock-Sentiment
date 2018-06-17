import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksGridComponent } from './stocks-grid.component';

describe('StocksGridComponent', () => {
  let component: StocksGridComponent;
  let fixture: ComponentFixture<StocksGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
