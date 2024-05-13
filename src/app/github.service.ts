import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from './user-details/user-details.model';
import { Repository } from './repository-list/repository.model';
import { shareReplay } from 'rxjs/operators';

interface SearchResponse {
  items: any[]; // Adjust the type accordingly
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private http: HttpClient) {}

  fetchUserDetails(username: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`https://api.github.com/users/${username}`).pipe(
      shareReplay(1) // Cache the response and replay it to subsequent subscribers
    );
  }

  fetchRepositories(username: string, perPage: number, currentPage: number): Observable<Repository[]> {
    return this.http.get<Repository[]>(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${currentPage}`).pipe(
      shareReplay(1) // Cache the response and replay it to subsequent subscribers
    );
  }

  searchRepositories(username: string, searchQuery: string, perPage: number, page: number): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`https://api.github.com/search/repositories?q=${searchQuery}+user:${username}&per_page=${perPage}&page=${page}`).pipe(
      shareReplay(1) // Cache the response and replay it to subsequent subscribers
    );
  }
}
