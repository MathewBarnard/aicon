import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoeModalComponent } from './add-foe-modal.component';

describe('AddFoeModalComponent', () => {
  let component: AddFoeModalComponent;
  let fixture: ComponentFixture<AddFoeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFoeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
