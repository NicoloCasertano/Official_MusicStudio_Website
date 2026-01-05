package com.example.react_app_2.models.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.react_app_2.models.entities.Work;
import com.example.react_app_2.models.repositories.WorkRepo;

@Service
public class WorkServiceImpl implements WorkService{

	private final WorkRepo repo;

	public WorkServiceImpl(WorkRepo repo) { this.repo = repo; }

	@Override
	public List<Work> findAll() { return repo.findAll(); }

	@Override
	public Optional<Work> findById(Integer id) { return repo.findById(id); }

	@Override
	public Work save(Work work) { return repo.save(work); }

	@Override
	public Work update(Integer id, Work work) {
		return repo.findById(id).map(existing -> {
			work.setId(existing.getId());
			return repo.save(work);
		}).orElseThrow(() -> new IllegalArgumentException("Work not found: " + id));
	}

	@Override
	public void delete(Integer id) { repo.deleteById(id); }

}
