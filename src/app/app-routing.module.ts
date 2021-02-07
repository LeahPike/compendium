import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CharacterCardsComponent} from './character/cards/character-cards.component';
import {CharacterProfessionsComponent} from './character/professions/character-professions.component';
import {AchievementsBfaComponent} from './character/achievements/achievements-bfa.component';
import {AchievementsLegionComponent} from './character/achievements/achievements-legion.component';
import {AchievementsShadowlandsComponent} from './character/achievements/achievements-shadowlands.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  {
    path: 'achievements/shadowlands',
    component: AchievementsShadowlandsComponent
  },
  {
    path: 'achievements/bfa',
    component: AchievementsBfaComponent
  },
  {
    path: 'achievements/legion',
    component: AchievementsLegionComponent
  },
  {
    path: 'characters',
    component: CharacterCardsComponent
  },
  {
    path: 'professions',
    component: CharacterProfessionsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '**',
    redirectTo: 'characters'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
