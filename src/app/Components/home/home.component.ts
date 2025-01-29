import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { IMovie } from '../../interfaces/imovie';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  // Properties
  private readonly _moviesService: MoviesService = inject(MoviesService);
  movies: IMovie[] = [];
  pageNumber: number = 1;
  baseImgPath: string = 'https://image.tmdb.org/t/p/w500';
  @ViewChild('pagination') paginationElement!: ElementRef<HTMLElement>;
  totalPages!: number;

  // Hooks
  ngOnInit(): void {
    if (
      typeof window !== 'undefined' &&
      window.localStorage.getItem('pageNumber')
    )
      this.pageNumber = Number(window.localStorage.getItem('pageNumber'));
    this.getMovies(this.pageNumber);
  }
  ngAfterViewInit(): void {
    this.activePage();
  }

  // Methods
  getMovies(pageNum: number): void {
    this.pageNumber = pageNum;
    if (this.pageNumber < 1) this.pageNumber = 1;
    if (this.pageNumber > this.totalPages) this.pageNumber = this.totalPages;
    this._moviesService.getTopMovies(this.pageNumber).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.totalPages = response.total_pages;
      },
    });
  }

  onPageClick(pageNum: number): void {
    this.getMovies(pageNum);
    this.activePage();
    window.localStorage.setItem('pageNumber', `${this.pageNumber}`);
  }

  activePage(): void {
    Array.from(
      this.paginationElement.nativeElement.querySelectorAll('a'),
    ).forEach((anchor) => anchor.classList.remove('home__activePage'));

    Array.from(
      this.paginationElement.nativeElement.querySelectorAll('a'),
    ).forEach((anchor) => {
      if (Number(anchor.textContent) === this.pageNumber)
        anchor.classList.add('home__activePage');
    });
  }
}
