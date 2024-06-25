import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  private apiUrl = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) {}

  getCharacters(page: number, nameFilter: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    if (nameFilter) {
      params = params.append('name', nameFilter);
    }

    return this.http.get<any>(`${this.apiUrl}character`, { params });
  }

  getCharacterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}character/${id}`);
  }

  getEpisodeByUrl(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
