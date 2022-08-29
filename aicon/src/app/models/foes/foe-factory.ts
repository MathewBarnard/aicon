import {Statistics} from './statistics';
import {FoeType} from './foe-type.enum';
import {combineLatest, forkJoin, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ActiveFoe} from './active-foe.model';

@Injectable({
  providedIn: 'root',
})
export class FoeFactory {

  constructor(private http: HttpClient) {
  }

  loadFoe(data: any): ActiveFoe {
    const foe = new ActiveFoe().deserialize(data);
    return foe;
  }

  getClasses(): string[] {
    return AllClasses;
  }

  getSpecialClasses(): string[] {
    return AllSpecialClasses;
  }

  getJobs(classFilter: string): string[] {
    if (classFilter) {
      return JobInheritance[classFilter];
    } else {
      return AllJobs;
    }
  }

  getFactions(): string[] {
    return AllFactions;
  }

  getTemplates(factionFilter: string): string[] {
    if (factionFilter) {
      return TemplateInheritance[factionFilter];
    } else {
      return AllFactions;
    }
  }
}

const AllFactions = [
  'Demon',
  'Folk',
  'Hob',
  'Imperial',
  'Jotunn',
  'Lowlander',
  'Relict',
  'Ruin Beast',
  'Scavenger'
];

const TemplateInheritance = {
  Demon: [
    'Armor Demon',
    'Bulging Demon',
    'Color Demon',
    'Cutter Demon',
    'Demon',
    'Gaping Demon',
    'Hollow Demon',
    'Lurking Demon',
    'Natal',
    'Prowling Demon',
    'Puppeteer Demon',
    'Screaming Demon',
    'Starving Demon',
    'Unstable Demon'
  ],
  Imperial: [
    'Artillerist',
    'Auxillary',
    'Drillmaster',
    'Imperial',
    'Imperial Demolitionist',
    'Imperial Officer',
    'Imperial Powdermage',
    'Imperial Sniper',
    'Imperial Spy',
    'Legionnaire',
    'Praetorian',
    'Warbeast'
  ],
  Jotunn: [
    'Beastblood Jotunn',
    'Blackblood Jotunn',
    'Deepwater Jotunn',
    'Hunter Jotunn',
    'Jotunn',
    'Nightblood Jotunn',
    'Starblood Jotunn',
    'Stormblood Jotunn',
    'Wildblood Jotunn'
  ],
  Lowlander: [
    'Apothecary',
    'Boil',
    'Butcher',
    'Lowlander',
    'Monster Hunter',
    'Mule',
    'Raider',
    'Ruinspeaker',
    'Thresher',
    'Viper',
  ],
  Relict: [
    'Fused',
    'Ghoul',
    'Idol',
    'Relict',
    'Wight',
    'Wraith'
  ],
  'Ruin Beast': [
    'Aethertick',
    'Burrower',
    'Gulper',
    'Halitoad',
    'Horned Beast',
    'Howler',
    'Ironfeather',
    'Ruinape',
    'Ruinbeast',
    'Ruin Centipede',
    'Stalker',
    'Stone Lizard',
    'Yellow Creeper'
  ],
  Scavenger: [
    'Looter',
    'Quickfinger',
    'Ruffian',
    'Scavenger',
    'Shank',
    'Toetaker'
  ]
};


const AllClasses = [
  'Heavy',
  'Skirmisher',
  'Leader',
  'Artillery',
  'Unique'
];

const AllSpecialClasses = [
  'Normal',
  'Mob',
  'Elite',
  'Legend'
];


const AllJobs = [
  'Alchemist',
  'Arbalest',
  'Illwright',
  'Siegewright',
  'Summoner',
  'Archon',
  'Archpriest',
  'Eldenwright',
  'Rogue',
  'Brute',
  'Impaler',
  'Knuckle',
  'Sledge',
  'Soldier',
  'Cantrix',
  'Commander',
  'Incanter',
  'Zealot',
  'Auxilary',
  'Chaff',
  'Natal',
  'Needler',
  'Assassin',
  'Berserker',
  'Hellion',
  'Shortbow',
  'Skulk'
];

const JobInheritance = {
  Artillery: [
    'Alchemist',
    'Arbalest',
    'Illwright',
    'Siegewright',
    'Summoner'
  ],
  Elite: [
    'Archon',
    'Archpriest',
    'Eldenwright',
    'Rogue'
  ],
  Heavy: [
    'Brute',
    'Impaler',
    'Knuckle',
    'Sledge',
    'Soldier'
  ],
  Leader: [
    'Cantrix',
    'Commander',
    'Incanter',
    'Zealot'
  ],
  Mob: [
    'Chaff',
    'Natal',
    'Needler'
  ],
  Skirmisher: [
    'Assassin',
    'Berserker',
    'Hellion',
    'Shortbow',
    'Skulk'
  ]
};
