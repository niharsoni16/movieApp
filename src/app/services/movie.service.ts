import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV} from 'src/environments/environment';

export interface ApiResult{
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  getPopularMovies(page:number):Observable<ApiResult> {
    return this.http.get<ApiResult>(`${ENV.bashUrl}/movie/popular?api_key=${ENV.apiKey}&page=${page}`)
  }

  getMovieDetails(id:string):Observable<any> {
    return this.http.get(`${ENV.bashUrl}/movie/${id}?api_key=${ENV.apiKey}`)
  }



}
