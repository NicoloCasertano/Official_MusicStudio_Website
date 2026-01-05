package com.example.react_app_2.models.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.react_app_2.models.entities.Beat;
import com.example.react_app_2.models.repositories.BeatRepo;

@Service
public class BeatServiceImpl implements BeatService{

	private final BeatRepo repo;

	public BeatServiceImpl(BeatRepo repo) { this.repo = repo; }

	@Override
	public List<Beat> findAll() { return repo.findAll(); }

	@Override
	public List<Beat> findAvailable() { return repo.findBySoldFalse(); }

	@Override
	public Optional<Beat> findById(Integer id) { return repo.findById(id); }

	@Override
	public Beat save(Beat beat) { return repo.save(beat); }

	@Override
	public Beat update(Integer id, Beat beat) {
		return repo.findById(id).map(existing -> {
			beat.setId(existing.getId());
			return repo.save(beat);
		}).orElseThrow(() -> new IllegalArgumentException("Beat not found: " + id));
	}

	@Override
	public void delete(Integer id) { repo.deleteById(id); }

}
