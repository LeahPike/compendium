import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BattleNetService} from './data/battle-net.service';
import {HttpClientModule} from '@angular/common/http';
import {CharacterAvatarDirective} from './character/character-avatar.directive';
import {CharacterCardComponent} from './character/character-card.component';


@NgModule({
  declarations: [
    AppComponent,
    CharacterAvatarDirective,
    CharacterCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [BattleNetService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
