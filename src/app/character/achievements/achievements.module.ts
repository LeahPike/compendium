import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {AvatarModule} from '../avatar/avatar.module';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {AchievementsLegionComponent} from './achievements-legion.component';
import {AchievementsBfaComponent} from './achievements-bfa.component';
import {AchievementsShadowlandsComponent} from './achievements-shadowlands.component';
import {AchievementComponent} from './achievement.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AvatarModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    AchievementsLegionComponent,
    AchievementsBfaComponent,
    AchievementsShadowlandsComponent,
    AchievementComponent,
  ],
  exports: []
})
export class AchievementsModule {
}
