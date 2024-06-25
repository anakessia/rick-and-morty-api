import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { RickAndMortyService } from '../../service/rick-and-morty.service';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError, finalize } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SearchBarComponent, RouterModule, CommonModule, InfiniteScrollDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
 
})
export class DashboardComponent implements OnInit {
  allCharacters: any[] = [];
  filteredCharacters: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  page: number = 1;

  private searchTerms = new Subject<string>();

  constructor(private router: Router, private rickAndMortyService: RickAndMortyService) {}

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((term: string) => {
      this.searchTerm = term;
      this.page = 1; 
      this.loadCharacters(true);
    });

    this.loadCharacters();
  }

  loadCharacters(reset: boolean = false) {
    if (reset) {
      this.allCharacters = [];
      this.filteredCharacters = [];
    }
    
    this.loading = true;
    this.rickAndMortyService.getCharacters(this.page, this.searchTerm).pipe(
      tap((data: any) => {
        this.allCharacters = [...this.allCharacters, ...data.results];
        this.applySearchFilter();
      }),
      catchError(error => {
        console.error('Error loading characters:', error);
        return of([]); 
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe();
  }

  redirectToDetails(id: number) {
    this.router.navigate(['/characters', id]);
  }

  loadMore() {
    this.page++;
    this.loadCharacters();
  }

  onFilterChange(term: string) {
    this.searchTerms.next(term);
  }

  applySearchFilter() {
    if (this.searchTerm) {
      this.filteredCharacters = this.allCharacters.filter(character =>
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCharacters = [...this.allCharacters];
    }
  }
}