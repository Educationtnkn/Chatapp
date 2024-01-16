import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalcoatingComponent } from './finalcoating.component';

describe('FinalcoatingComponent', () => {
  let component: FinalcoatingComponent;
  let fixture: ComponentFixture<FinalcoatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalcoatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalcoatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
