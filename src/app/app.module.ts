import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BattleNetService} from './data/battle-net.service';
import {HttpClientModule} from '@angular/common/http';
import {GameDataService} from './data/game-data.service';
import {CharacterModule} from './character/character.module';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CharacterModule,
    AppRoutingModule
  ],
  providers: [
    BattleNetService,
    HttpClientModule,
    GameDataService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
