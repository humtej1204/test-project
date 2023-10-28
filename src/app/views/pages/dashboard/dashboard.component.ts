import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { PokeApiService } from 'src/app/services/pokeApi/poke-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  user: User | null = null;

  pokemons: any = [];

  constructor(
    private authService: AuthService,
    private pokeServ: PokeApiService,
    private router: Router,
  ) {
    this.authService.myProfile$.subscribe((data: User|null) => {
      this.user = data;
    });
  }

  displayedColumns: string[] = ['id', 'name', 'types', 'img'];
  dataSource = new MatTableDataSource(this.pokemons);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getPokemons();
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