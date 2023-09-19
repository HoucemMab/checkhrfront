import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainginsListComponent } from './traingins-list.component';

describe('TrainginsListComponent', () => {
  let component: TrainginsListComponent;
  let fixture: ComponentFixture<TrainginsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainginsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainginsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
