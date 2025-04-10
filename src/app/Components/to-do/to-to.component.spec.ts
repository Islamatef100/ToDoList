import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToToComponent } from './to-to.component';

describe('ToToComponent', () => {
  let component: ToToComponent;
  let fixture: ComponentFixture<ToToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToToComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
