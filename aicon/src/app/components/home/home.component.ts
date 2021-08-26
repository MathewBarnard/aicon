import { Component, OnInit } from '@angular/core';
import {Foe} from "../../models/foes/foe.model";
import {AbilityService} from "../../services/ability.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  enemies: Foe[];

  constructor(private abilityService: AbilityService) { }

  ngOnInit(): void {
    this.enemies = [
    ]
  }

}
