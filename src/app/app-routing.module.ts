import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CharacterAchievementsComponent} from './character/achievements/character-achievements.component';
import {CharacterCardsComponent} from './character/cards/character-cards.component';
import {CharacterProfessionsComponent} from './character/professions/character-professions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/characters',
    pathMatch: 'full'
  },
  {
    path: 'achievements',
    component: CharacterAchievementsComponent
  },
  {
    path: 'characters',
    component: CharacterCardsComponent
  },
  {
    path: 'professions',
    component: CharacterProfessionsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}
