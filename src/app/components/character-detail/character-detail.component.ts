import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from '../../service/rick-and-morty.service';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css'
})

export class CharacterDetailComponent implements OnInit {
  character: any;
  episodes: any[] = [];
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private location: Location, private rickAndMortyService: RickAndMortyService) {}

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null && id !== undefined) {
      const characterId = +id;
      this.rickAndMortyService.getCharacterById(characterId).pipe(
        catchError(err => {
          console.error('Error loading character:', err);
          this.loading = false;
          return of(null);
        })
      ).subscribe(data => {
        if (data) {
          this.character = data;
          this.loadEpisodes(data.episode);
        } else {
          this.loading = false;
        }
      });
    } else {
      console.error('No character ID found in route parameters.');
      this.loading = false;
    }
  }

  loadEpisodes(episodeUrls: string[]): void {
    forkJoin(episodeUrls.map(url => this.rickAndMortyService.getEpisodeByUrl(url).pipe(
      catchError(err => {
        console.error('Error loading episode:', err);
        return of(null);
      })
    ))).subscribe(episodes => {
      this.episodes = episodes.filter(episode => episode !== null);
      this.loading = false;
    });
  }


  goBack(): void {
    this.location.back();
  }
}