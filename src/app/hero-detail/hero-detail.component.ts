import {Component, Input} from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { trigger } from '@angular/animations';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  hero!:Hero;
  constructor (private activatedRoute: ActivatedRoute,
    private location: Location,
    private herosrv: HeroService){}
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.getHero();
    }
    getHero():void{
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.herosrv.getHero(id).subscribe(h=>this.hero=h)
    }
    goBack():void{
      this.location.back();
    }
    Save():void{
      if(this.hero){
        this.herosrv.updateHero(this.hero).subscribe(()=>this.goBack())
      }
    }
  
}
