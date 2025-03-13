package com.example.backend.controllers;

import com.example.backend.models.Film;
import com.example.backend.services.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/films")
public class FilmController {

    private final FilmService filmService;

    @Autowired
    public FilmController(FilmService filmService) {
        this.filmService = filmService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Film> addFilm(@RequestBody Film film) {
        Film savedFilm = filmService.saveFilm(film);
        return ResponseEntity.ok(savedFilm);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Film> updateFilm(@PathVariable Long id, @RequestBody Film updatedFilm) {
        return filmService.findFilmById(id)
                .map(film -> {
                    film.setTitle(updatedFilm.getTitle());
                    film.setGenre(updatedFilm.getGenre());
                    film.setPremiere(updatedFilm.getPremiere());
                    film.setDirector(updatedFilm.getDirector());
                    film.setDuration(updatedFilm.getDuration());
                    film.setRate((updatedFilm.getRate()));
                    return ResponseEntity.ok(filmService.saveFilm(film));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteFilm(@PathVariable Long id) {
        if (filmService.findFilmById(id).isPresent()) {
            filmService.deleteFilm(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
    @GetMapping
    public ResponseEntity<List<Film>> getAllFilms() {
        return ResponseEntity.ok(filmService.findAllFilms());
    }
}