import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloStudent } from './hello-student';

describe('HelloStudent', () => {
  let component: HelloStudent;
  let fixture: ComponentFixture<HelloStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelloStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
