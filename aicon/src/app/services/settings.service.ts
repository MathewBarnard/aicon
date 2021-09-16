import { Injectable } from '@angular/core';
import {Foe} from '../models/foes/foe.model';
import {FoeFactory} from '../models/foes/foe-factory';
import {ActiveFoe} from '../models/foes/active-foe.model';
import {Deserializable} from "../models/deserializable.interface";

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  settings: Settings;

  constructor() {
    try {
      const settings = localStorage.getItem('settings');
      if (settings) {
        const settingsObj = JSON.parse(settings);
        this.settings = new Settings().deserialize(settingsObj);
      } else {
        this.settings = new Settings();
      }
    } catch (error) {
      window.alert('An error occurred while loading your session.');
    }
  }

  save(): void {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }
}

export class Settings implements Deserializable<Settings> {
  verboseTraits: boolean;

  constructor() {
    this.verboseTraits = false;
  }

  deserialize(input: any): Settings {
    this.verboseTraits = input.verboseTraits ? input.verboseTraits : false;
    return this;
  }
}
