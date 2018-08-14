import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CharacterCardsComponent} from './character/cards/character-cards.component';
import {CharacterProfessionsComponent} from './character/professions/character-professions.component';
import {CharacterAchievementsBFAComponent} from './character/achievements/character-achievements-bfa.component';
import {CharacterAchievementsLegionComponent} from './character/achievements/character-achievements-legion.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full'
  },
  {
    path: 'achievements',
    redirectTo: 'achievements/bfa',
    pathMatch: 'full'
  },
  {
    path: 'achievements/bfa',
    component: CharacterAchievementsBFAComponent
  },
  {
    path: 'achievements/legion',
    component: CharacterAchievementsLegionComponent
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
