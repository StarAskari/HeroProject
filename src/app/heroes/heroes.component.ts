import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes',
  standalone: false,
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {


  lstHero: Hero[]=[]
  /*selectedHero?: Hero;
  onSelect(hero: Hero): void{
    this.selectedHero=hero;
    this.msgService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }*/
  
  constructor(private heroService: HeroService) {}
   getHeroes(): void{
    this.heroService.getHeroes().subscribe(h=>this.lstHero=h);
   }

   ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getHeroes();
   }

   add(name: string){
    name=name.trim();
    if(!name) {return;}
    this.heroService.addHero({name} as Hero).subscribe(hero=>this.lstHero.push(hero))

   };
   deleteHero(hero: Hero):void{
    this.lstHero=this.lstHero.filter(h=>h!==hero);
    this.heroService.deleteHero(hero.id).subscribe()
   }
}
