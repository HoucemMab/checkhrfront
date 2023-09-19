import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentByIdComponent } from './document-by-id.component';

describe('DocumentByIdComponent', () => {
  let component: DocumentByIdComponent;
  let fixture: ComponentFixture<DocumentByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
