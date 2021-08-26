import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterTrackerComponent } from './encounter-tracker.component';

describe('BookkeeperComponent', () => {
  let component: EncounterTrackerComponent;
  let fixture: ComponentFixture<EncounterTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncounterTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
