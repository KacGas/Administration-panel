package com.example.backend.services;

import com.example.backend.models.Film;
import com.example.backend.repositories.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FilmService {
    private final FilmRepository filmRepository;

    @Autowired
    public FilmService(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    public Film saveFilm(Film film) {
        return filmRepository.save(film);
    }

    public Optional<Film> findFilmById(Long id) {
        return filmRepository.findById(id);
    }

    public List<Film> findAllFilms() {
        return filmRepository.findAll();
    }

    public void deleteFilm(Long id) {
        filmRepository.deleteById(id);
    }
}
