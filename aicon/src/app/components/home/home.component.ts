import { Component, OnInit } from '@angular/core';
import {Foe} from "../../models/foes/foe.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  enemies: Foe[];

  constructor() { }

  ngOnInit(): void {
    this.enemies = [
    ]
  }

}
