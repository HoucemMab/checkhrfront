import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTrainingComponent } from './request-training.component';

describe('RequestTrainingComponent', () => {
  let component: RequestTrainingComponent;
  let fixture: ComponentFixture<RequestTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
