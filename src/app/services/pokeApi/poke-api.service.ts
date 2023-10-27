import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(
    private http: HttpClient
  ) { }

  getAllPokemons() {
    const data = this.http.get<any>(this.apiUrl)
      .pipe(
        map(item => item.results.map((pokemon: any) => {
          return this.getPokemones(pokemon.url);
        })
      ));

    return data;
  }

  getPokemon(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`)
      .pipe(
        map((data) => this.moldPokemonData(data))
      );
  };

  getPokemons(url: string) {
    return this.http.get(url);
  };

  getPokemones(url: string) {
    const data = this.getPokemons(url);
    let pokeInfo: any = {
      id: 0,
      name: '',
      types: [],
      img: '',
    };

    data.subscribe((data: any) => {
      const item: any = this.moldPokemonData(data);

      Object.assign(pokeInfo, item);
    });

    return pokeInfo;
  };

  moldPokemonData(data: any): any {
    const item: any = {
      id: data.id,
      name: data.name,
      weight: data.weight,
      height: data.height,
      stats: [],
      types: [],
      moves: [],
      img: '',
    }

    item.stats = data.stats.map((e: any) => {
      return (
        {name: e.stat.name, base_stat: e.base_stat}
      );
    });

    item.types = data.types.map((e: any) => {
      return (e.type.name);
    });

    item.moves = data.moves.map((e: any) => {
      return (e.move.name);
    });

    item.img = (data.sprites.other['official-artwork'].front_default === null)
      ? 'https://img.icons8.com/color/480/nothing-found.png'
      : data.sprites.other['official-artwork'].front_default;

    return (item);
  }
}
