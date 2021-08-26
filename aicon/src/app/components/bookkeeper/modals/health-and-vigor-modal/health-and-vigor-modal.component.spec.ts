import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthAndVigorModalComponent } from './health-and-vigor-modal.component';

describe('HealthAndVigorModalComponent', () => {
  let component: HealthAndVigorModalComponent;
  let fixture: ComponentFixture<HealthAndVigorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthAndVigorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthAndVigorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
