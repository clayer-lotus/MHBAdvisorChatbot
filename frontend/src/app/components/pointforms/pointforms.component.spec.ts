import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointformsComponent } from './pointforms.component';

describe('PointformsComponent', () => {
  let component: PointformsComponent;
  let fixture: ComponentFixture<PointformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointformsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
