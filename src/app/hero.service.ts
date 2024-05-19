import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable,of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
private herosUrl='api/heroes';
httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  constructor(private messageSrv: MessageService,
    private http: HttpClient
    ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.herosUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
    catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHero(id: number):Observable<Hero>{
    const url=`${this.herosUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
    /*const hero=HEROES.find(h=>h.id==id)!;
    this.messageSrv.add(`HeroService: fetched hero id=${id}`);
    return of(hero);*/
  }
  log(message: string): void{
    this.messageSrv.add(`HeroService: ${message}`);
  }

  updateHero(hero:Hero):Observable<any>{
    return this.http.put(this.herosUrl,hero,this.httpOptions).pipe(
      tap(_=>this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }
 
  addHero(hero: Hero):Observable<Hero>{
    return this.http.post<Hero>(this.herosUrl,hero,this.httpOptions).pipe
    (
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id: number):Observable<Hero>{
    const url = `${this.herosUrl}/${id}`;
    return this.http.delete<Hero>(url,this.httpOptions).pipe(
      tap(_=>this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }
  searchHeros(term:string):Observable<Hero[]>{
    
    if(!term.trim()){
      return of([]);
    }
      return this.http.get<Hero[]>(`${this.herosUrl}/?name=${term}`).pipe(

        tap(x=>x.length? this.log(`found heroes matching "${term}"`): this.log(`no found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      )
    
  }
}
