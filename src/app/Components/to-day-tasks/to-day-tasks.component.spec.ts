import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDayTasksComponent } from './to-day-tasks.component';

describe('ToDayTasksComponent', () => {
  let component: ToDayTasksComponent;
  let fixture: ComponentFixture<ToDayTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDayTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDayTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
