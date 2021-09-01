import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './components/home/home.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatExpansionModule} from "@angular/material/expansion";
import {FlexLayoutModule} from "@angular/flex-layout";
import { EncounterTrackerComponent } from './components/bookkeeper/encounter-tracker.component';
import {MatIconModule} from "@angular/material/icon";
import { AddFoeModalComponent } from './components/bookkeeper/modals/add-foe-modal/add-foe-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { FoeViewComponent } from './components/bookkeeper/foe-view/foe-view.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTooltipModule} from "@angular/material/tooltip";
import { HealthAndVigorModalComponent } from './components/bookkeeper/modals/health-and-vigor-modal/health-and-vigor-modal.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EncounterTrackerComponent,
    AddFoeModalComponent,
    FoeViewComponent,
    HealthAndVigorModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    MatSidenavModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
