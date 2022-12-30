import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment as ENV } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) { }

  movies = [];
  currentPage = 1;
  imageBaseUrl = ENV.images

  ngOnInit() {
    this.loadMovies()
  }

  async loadMovies(event? : InfiniteScrollCustomEvent) {
    // If we can't use async and await function then we can use promise's then concept..
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present()

    this.movieService.getPopularMovies(this.currentPage).subscribe(res => {
      loading.dismiss();
      // this.movies = [...this.movies, ...res.results]
      this.movies.push(...res.results)
      // console.log(this.movies)
      event?.target.complete()
      // console.log(res.total_pages,this.currentPage)
      if(event){
        event.target.disabled = res.total_pages === this.currentPage
      }
    });
    
  }


  loadMore(event : InfiniteScrollCustomEvent) {
    this.currentPage++
    this.loadMovies(event)
    // console.log(event)
  }

}
