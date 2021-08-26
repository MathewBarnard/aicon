import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoeViewComponent } from './foe-view.component';

describe('FoeViewComponent', () => {
  let component: FoeViewComponent;
  let fixture: ComponentFixture<FoeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
