import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {CharacterModule} from './character/character.module';
import {AppRoutingModule} from './app-routing.module';
import {BattleNetService} from './services/battle-net.service';
import {GameDataService} from './services/game-data.service';

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
