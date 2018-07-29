// import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
// import {Character} from '../data/character';
//
// @Directive({
//   selector: '[avatar]'
// })
//
// export class CharacterAvatarDirective implements OnChanges {
//   element: HTMLImageElement;
//
//   @Input()
//   character: Character;
//
//   @Input()
//   type: string; // main | profilemain ( outdated?) | inset | avatar
//
//   constructor(el: ElementRef) {
//     this.element = el.nativeElement;
//   }
//
//   ngOnChanges() {
//
//     // https://dev.battle.net/docs/read/community_apis/world_of_warcraft/Character_Renders
//
//     let source = this.character.thumbnail;
//
//     if (this.type) {
//       source = source.replace('avatar', this.type);
//     }
//
//     this.element.src = 'http://render-eu.worldofwarcraft.com/character/' + source;
//     this.element.title = this.character.name;
//   }
// }
