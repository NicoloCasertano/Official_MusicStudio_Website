package com.example.react_app_2.models.services;

import java.util.List;
import java.util.Optional;

import com.example.react_app_2.models.entities.Beat;

public interface BeatService {
	List<Beat> findAll();
	List<Beat> findAvailable();
	Optional<Beat> findById(Integer id);
	Beat save(Beat beat);
	Beat update(Integer id, Beat beat);
	void delete(Integer id);
}
