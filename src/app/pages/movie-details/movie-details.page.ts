import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { environment as ENV } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  constructor(private route:ActivatedRoute, private movieService: MovieService) { }

  movie;
  imageBaseUrl=ENV.images

  ngOnInit() {

    console.log(this.route)
    const id = this.route.snapshot.params.id
    // const id = this.route.snapshot.paramMap.get('id')


    this.movieService.getMovieDetails(id).subscribe(res => {
      this.movie=res
      console.log(res)
    });
    
  }

  openHomePage(){
    if(this.movie.homepage){
      window.open(this.movie.homepage)
    }else{
      console.log("No Website Available")
    }
    // console.log(url)
  }



}
