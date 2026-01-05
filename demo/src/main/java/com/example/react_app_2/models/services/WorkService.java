package com.example.react_app_2.models.services;

import java.util.List;
import java.util.Optional;

import com.example.react_app_2.models.entities.Work;

public interface WorkService{
	List<Work> findAll();
	Optional<Work> findById(Integer id);
	Work save(Work work);
	Work update(Integer id, Work work);
	void delete(Integer id);
}
