import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {}

  options = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDgyMTQ4OTI4OGViYThjYjIxZjhiNzljYmY3NzM2OCIsIm5iZiI6MTczNzk5MjQ0NC4zMDMsInN1YiI6IjY3OTdhOGZjMjVkMjk4MGZiMDI0MjI1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ajAtJKUNHea1w7d3UfLtpdDoCUoj283Qk6xWTCya0XE',
    },
  };

  getTopMovies(pageNumber: number): Observable<any> {
    return this.httpClient.get(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNumber}`,
      this.options,
    );
  }
}
