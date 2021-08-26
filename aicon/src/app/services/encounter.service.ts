import { Injectable } from '@angular/core';
import {PlayerCharacter} from "../models/players/player-character.model";
import {Foe} from "../models/foes/foe.model";
import {FoeFactory} from "../models/foes/foe-factory";
import {FoeType} from "../models/foes/foe-type.enum";
import {ActiveFoe} from "../models/foes/active-foe.model";

@Injectable({
  providedIn: 'root',
})
export class EncounterService {

  turn: number;
  players: PlayerCharacter[];
  foes: ActiveFoe[];

  constructor(private foeFactory: FoeFactory) {
    this.players = [];
    this.foes = [];

    const session = localStorage.getItem('session');
    if (session) {
      const sessionObj = JSON.parse(session);
      this.turn = sessionObj.turn;

      for (let pc of sessionObj.players) {

      }

      for (let foeData of sessionObj.foes) {
        const foe = this.foeFactory.loadFoe(foeData);
        this.addFoeToSession(foe);
      }
    }
  }

  startEncounter(players: PlayerCharacter[], foes: ActiveFoe[]) {
    this.players = players;
    this.foes = foes;
    this.turn = 1;
  }

  createNewFoe(foe: Foe, chapter: number) {
    try {
      const activeFoe = new ActiveFoe();
      activeFoe.createNew(chapter, foe);
      this.addFoeToSession(activeFoe);
      this.save();
    } catch(error) {
      console.log("An error occurred while trying to save your Foe.");
      console.log(error);
    }
  }

  addFoeToSession(foe: ActiveFoe) {
    this.foes.push(foe);
  }

  removeFoeFromSession(foe: ActiveFoe) {
    const index = this.foes.indexOf(foe, 0);
    if (index > -1) {
      this.foes.splice(index, 1);
    }
    this.save();
  }

  save(): void {
    localStorage.setItem('session', JSON.stringify({
      turn: this.turn,
      players: this.players,
      foes: this.foes
    }));
  }
}
