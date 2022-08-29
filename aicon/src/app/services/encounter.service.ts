import { Injectable } from '@angular/core';
import {Statistics} from '../models/foes/statistics';
import {FoeFactory} from '../models/foes/foe-factory';
import {ActiveFoe} from '../models/foes/active-foe.model';

@Injectable({
  providedIn: 'root',
})
export class EncounterService {

  turn: number;
  foes: ActiveFoe[];

  constructor(private foeFactory: FoeFactory) {
    this.foes = [];

    try {
      const session = localStorage.getItem('session');
      if (session) {
        const sessionObj = JSON.parse(session);
        this.turn = sessionObj.turn;
        for (const foeData of sessionObj.foes) {
          const foe = this.foeFactory.loadFoe(foeData);
          this.addFoeToSession(foe);
        }
      }
    } catch (error) {
      window.alert('An error occurred while loading your session.');
    }
  }

  startEncounter(foes: ActiveFoe[]): void {
    this.foes = foes;
    this.turn = 1;
  }

  createNewFoe(foe: Statistics, chapter: number): void {
    try {
      const activeFoe = new ActiveFoe();
      activeFoe.createNew(chapter, foe);
      this.addFoeToSession(activeFoe);
      this.save();
    } catch (error) {
      console.log('An error occurred while trying to save your Foe.');
      console.log(error);
    }
  }

  addFoeToSession(foe: ActiveFoe): void {
    this.foes.push(foe);
  }

  removeFoeFromSession(foe: ActiveFoe): void {
    const index = this.foes.indexOf(foe, 0);
    if (index > -1) {
      this.foes.splice(index, 1);
    }
    this.save();
  }

  save(): void {
    localStorage.setItem('session', JSON.stringify({
      turn: this.turn,
      foes: this.foes
    }));
  }
}
