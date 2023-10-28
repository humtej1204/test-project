import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, startWith, switchMap, catchError, map, of } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { PokeApiService } from 'src/app/services/pokeApi/poke-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  typeColors: any = {
    normal: '#DDCCAA',
    fighting: '#FF6A6A',
    flying: '#BAAAFF',
    poison: '#CC88BB',
    ground: '#DEB887',
    rock: '#CD853F',
    bug: '#99CC33',
    ghost: '#778899',
    fire: '#FF7F00',
    water: '#B0E2FF',
    grass: '#99FF66',
    electric: '#FFD700',
    psychic: '#FFB5C5',
    ice: '#ADD8E6',
    dragon: '#AB82FF',
    dark: '#A9A9A9',
    fairy: '#FFB0FF',
    steel: '#CCCCCC'
  };

  user: User | null = null;

  pokemons: any = [];

  displayedColumns: string[] = ['id', 'name', 'types', 'img'];
  dataSource = new MatTableDataSource(this.pokemons);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private authService: AuthService,
    private pokeServ: PokeApiService,
    private router: Router,
  ) {
    this.authService.myProfile$.subscribe((data: User|null) => {
      this.user = data;
    });
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        switchMap(() => {
          console.log('loading')
          return this.pokeServ.getAllPokemons(this.paginator.pageSize * this.paginator.pageIndex, this.paginator.pageSize)
          .pipe(catchError(() => of(null)));
        }),
        map((data: any[]) => {
          console.log('no loading')
          if (data === null) {
            return [];
          }
          
          return data;
        }),
      )
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPokemons() {
    this.pokeServ.getAllPokemons().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
    })
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigateByUrl('/auth/login')
  }
}