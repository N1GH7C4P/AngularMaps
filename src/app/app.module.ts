import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { TabsComponent } from './tabs/tabs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { SetupComponent } from './setup/setup.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TerrainSliderComponent } from './setup/terrain-slider/terrain-slider.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { TerrainFeatureCardComponent } from './setup/terrain-feature-list/terrain-feature-card/terrain-feature-card.component';
import { ScenarioListComponent } from './setup/scenario-list/scenario-list.component';
import { TerrainFeatureListComponent } from './setup/terrain-feature-list/terrain-feature-list.component';
import { ScenarioCardComponent } from './setup/scenario-list/scenario-card/scenario-card.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatChipsModule } from '@angular/material/chips';
import { TerrainFeatureChipsComponent } from './tabs/map-tab/terrain-feature-chips/terrain-feature-chips.component';
import { ScenarioInfoComponent } from './tabs/map-tab/scenario-info/scenario-info.component';
import { MapTabComponent } from './tabs/map-tab/map-tab.component';
import { MapContainerComponent } from './tabs/map-container/map-container.component';
import { SavedMapsTabComponent } from './tabs/saved-maps-tab/saved-maps-tab.component';
import { MapItemComponent } from './tabs/saved-maps-tab/map-item/map-item.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TerrainFeatureCardListComponent } from './tabs/saved-maps-tab/map-item/terrain-feature-card-list/terrain-feature-card-list.component';
import { TableSliderComponent } from './setup/table-slider/table-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    TabsComponent,
    SetupComponent,
    TerrainSliderComponent,
    TerrainFeatureCardComponent,
    ScenarioListComponent,
    TerrainFeatureListComponent,
    ScenarioCardComponent,
    TerrainFeatureChipsComponent,
    ScenarioInfoComponent,
    MapTabComponent,
    MapContainerComponent,
    SavedMapsTabComponent,
    MapItemComponent,
    TerrainFeatureCardListComponent,
    TableSliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCheckboxModule,
    FormsModule,
    MatSliderModule,
    MatDividerModule,
    MatCardModule,
    OverlayModule,
    MatChipsModule,
    MatListModule,
    MatIconModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
