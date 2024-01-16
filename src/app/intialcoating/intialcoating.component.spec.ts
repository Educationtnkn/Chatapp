import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntialcoatingComponent } from './intialcoating.component';

describe('IntialcoatingComponent', () => {
  let component: IntialcoatingComponent;
  let fixture: ComponentFixture<IntialcoatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntialcoatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntialcoatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
