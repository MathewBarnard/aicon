import { Component, OnInit } from '@angular/core';
import {Statistics} from '../../models/foes/statistics';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  enemies: Statistics[];

  constructor() { }

  ngOnInit(): void {
    this.enemies = [];
  }

}
