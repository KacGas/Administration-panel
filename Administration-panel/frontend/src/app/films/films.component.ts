import { Component, OnInit } from '@angular/core';
import { FilmService} from '../core/services/film.service';
import {NgForOf, NgIf} from '@angular/common';
import {AuthService} from '../core/services/auth.service';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: any[] = [];
  isAdmin: boolean = false;

  newFilm = {
    title: '',
    genre: '',
    premiere: '',
    director: '',
    duration: '',
    rate: ''
  };

  editMode = {
    enabled: false,
    film: null as any
  };

  constructor(private filmService: FilmService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadFilms();
  }

  loadFilms(): void {
    this.filmService.getFilms().subscribe(
      (response) => {
        this.films = response;
      },
      (error) => {
        console.error('Błąd podczas pobierania filmów', error);
      }
    );
  }

  addFilm(): void {
    if (!this.isAdmin) return;
    this.filmService.addFilm(this.newFilm).subscribe(
      () => {
        this.loadFilms();
        this.newFilm = { title: '', genre: '', premiere: '', director: '', duration: '', rate: '' };
      },
      (error) => {
        console.error('Error adding film:', error);
      }
    );
  }

  deleteFilm(id: number): void {
    if (!this.isAdmin) return;
    this.filmService.deleteFilm(id).subscribe(
      () => this.loadFilms(),
      (error) => console.error('Error deleting film:', error)
    );
  }

  enableEdit(film: any): void {
    this.editMode = {
      enabled: true,
      film: { ...film }
    };
  }

  saveEdit(): void {
    if (!this.isAdmin || !this.editMode.enabled) return;

    this.filmService.updateFilm(this.editMode.film).subscribe(
      () => {
        this.editMode = { enabled: false, film: null };
        this.loadFilms();
      },
      (error) => {
        console.error('Error updating film:', error);
      }
    );
  }

  cancelEdit(): void {
    this.editMode = { enabled: false, film: null };
  }
}
