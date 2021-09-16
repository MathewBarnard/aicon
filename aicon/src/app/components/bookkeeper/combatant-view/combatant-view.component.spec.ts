import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatantViewComponent } from './combatant-view.component';

describe('CombatantViewComponent', () => {
  let component: CombatantViewComponent;
  let fixture: ComponentFixture<CombatantViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombatantViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
