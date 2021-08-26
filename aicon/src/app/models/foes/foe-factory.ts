import {Foe} from "./foe.model";
import {FoeType} from "./foe-type.enum";
import {combineLatest, forkJoin, Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {ActiveFoe} from "./active-foe.model";

@Injectable({
  providedIn: 'root',
})
export class FoeFactory {

  constructor(private http: HttpClient) {
  }

  loadJob(foeClass: string): Observable<Foe> {
    return this.http.get(`../assets/data/foes/jobs/${foeClass.toLowerCase().replace(' ', '')}.json`).pipe(
      map(res => {
        return new Foe().deserialize(res);
      }));
  }

  loadFaction(foeFaction: string, foeTemplate: string): Observable<Foe> {
    return this.http.get(`../assets/data/foes/factions/${foeFaction.toLowerCase().replace(' ', '')}/${foeTemplate.toLowerCase().replace(' ', '')}.json`).pipe(
      map(res => {
        return new Foe().deserialize(res);
      }));
  }

  createFoe(foeClass: string, foeJob: string, foeFaction: string, foeTemplate: string) {
    if (foeFaction && foeTemplate) {
      return combineLatest(
        this.loadJob(foeClass),
        this.loadJob(foeJob),
        this.loadFaction(foeFaction, foeFaction),
        this.loadFaction(foeFaction, foeTemplate)
      ).pipe(
        map(res => {
          const faction = res[3].inheritFrom(res[2]);
          const job = res[1].inheritFrom(res[0]);
          return job.inheritFrom(faction);
        })
      )
    }

    return combineLatest(
      this.loadJob(foeClass),
      this.loadJob(foeJob)
    ).pipe(
      map(res => {
        return res[1].inheritFrom(res[0]);
      })
    )
  }
/*
  createFoe(foeClass: Foe, foeJob: Foe, foeFaction: Foe, foeTemplate: Foe, chapter: number): Foe {
    return foeJob.inheritFrom(foeClass);
  }*/

  loadFoe(data: any): ActiveFoe {
    const foe = new ActiveFoe().deserialize(data);
    return foe;
  }

  getClasses(): string[] {
    return AllClasses;
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
  "Demon",
  "Imperial",
  "Jotunn",
  "Lowlander",
  "Relict",
  "Ruin Beast",
  "Scavenger"
]

const AllTemplates = [
  "Armor Demon",
  "Bulging Demon",
  "Color Demon",
  "Cutter Demon",
  "Demon",
  "Gaping Demon",
  "Hollow Demon",
  "Lurking Demon",
  "Natal",
  "Prowling Demon",
  "Puppeteer Demon",
  "Screaming Demon",
  "Starving Demon",
  "Unstable Demon",
  "Artillerist",
  "Auxillary",
  "Drillmaster",
  "Imperial",
  "Imperial Demolitionist",
  "Imperial Officer",
  "Imperial Powdermage",
  "Imperial Sniper",
  "Imperial Spy",
  "Legionnaire",
  "Praetorian",
  "Warbeast",
  "Beastblood Jotunn",
  "Blackblood Jotunn",
  "Deepwater Jotunn",
  "Hunter Jotunn",
  "Jotunn",
  "Nightblood Jotunn",
  "Starblood Jotunn",
  "Stormblood Jotunn",
  "Wildblood Jotunn",
  "Apothecary",
  "Boil",
  "Butcher",
  "Lowlander",
  "Monster Hunter",
  "Mule",
  "Raider",
  "Ruinspeaker",
  "Thresher",
  "Viper",
  "Fused",
  "Ghoul",
  "Idol",
  "Relict",
  "Wight",
  "Wraith",
  "Aethertick",
  "Burrower",
  "Gulper",
  "Halitoad",
  "Horned Beast",
  "Howler",
  "Ironfeather",
  "Ruinape",
  "Ruinbeast",
  "Ruin Centipede",
  "Stalker",
  "Stone Lizard",
  "Yellow Creeper",
  "Looter",
  "Quickfinger",
  "Ruffian",
  "Scavenger",
  "Shank",
  "Toetaker"
]

const TemplateInheritance = {
  "Demon": [
    "Armor Demon",
    "Bulging Demon",
    "Color Demon",
    "Cutter Demon",
    "Demon",
    "Gaping Demon",
    "Hollow Demon",
    "Lurking Demon",
    "Natal",
    "Prowling Demon",
    "Puppeteer Demon",
    "Screaming Demon",
    "Starving Demon",
    "Unstable Demon"
  ],
  "Imperial": [
    "Artillerist",
    "Auxillary",
    "Drillmaster",
    "Imperial",
    "Imperial Demolitionist",
    "Imperial Officer",
    "Imperial Powdermage",
    "Imperial Sniper",
    "Imperial Spy",
    "Legionnaire",
    "Praetorian",
    "Warbeast"
  ],
  "Jotunn": [
    "Beastblood Jotunn",
    "Blackblood Jotunn",
    "Deepwater Jotunn",
    "Hunter Jotunn",
    "Jotunn",
    "Nightblood Jotunn",
    "Starblood Jotunn",
    "Stormblood Jotunn",
    "Wildblood Jotunn"
  ],
  "Lowlander": [
    "Apothecary",
    "Boil",
    "Butcher",
    "Lowlander",
    "Monster Hunter",
    "Mule",
    "Raider",
    "Ruinspeaker",
    "Thresher",
    "Viper",
  ],
  "Relict": [
    "Fused",
    "Ghoul",
    "Idol",
    "Relict",
    "Wight",
    "Wraith"
  ],
  "Ruin Beast": [
    "Aethertick",
    "Burrower",
    "Gulper",
    "Halitoad",
    "Horned Beast",
    "Howler",
    "Ironfeather",
    "Ruinape",
    "Ruinbeast",
    "Ruin Centipede",
    "Stalker",
    "Stone Lizard",
    "Yellow Creeper"
  ],
  "Scavenger": [
    "Looter",
    "Quickfinger",
    "Ruffian",
    "Scavenger",
    "Shank",
    "Toetaker"
  ]
}


const AllClasses = [
  "Artillery",
  "Elite",
  "Heavy",
  "Leader",
  "Mob",
  "Skirmisher"
]

const AllJobs = [
  "Alchemist",
  "Arbalest",
  "Illwright",
  "Siegewright",
  "Summoner",
  "Archon",
  "Archpriest",
  "Eldenwright",
  "Rogue",
  "Brute",
  "Impaler",
  "Knuckle",
  "Sledge",
  "Soldier",
  "Cantrix",
  "Commander",
  "Incanter",
  "Zealot",
  "Auxilary",
  "Chaff",
  "Natal",
  "Needler",
  "Assassin",
  "Berserker",
  "Hellion",
  "Shortbow",
  "Skulk"
]

const JobInheritance = {
  "Artillery": [
    "Alchemist",
    "Arbalest",
    "Illwright",
    "Siegewright",
    "Summoner"
  ],
  "Elite": [
    "Archon",
    "Archpriest",
    "Eldenwright",
    "Rogue"
  ],
  "Heavy": [
    "Brute",
    "Impaler",
    "Knuckle",
    "Sledge",
    "Soldier"
  ],
  "Leader": [
    "Cantrix",
    "Commander",
    "Incanter",
    "Zealot"
  ],
  "Mob": [
    "Chaff",
    "Natal",
    "Needler"
  ],
  "Skirmisher": [
    "Assassin",
    "Berserker",
    "Hellion",
    "Shortbow",
    "Skulk"
  ]
}
