package com.example.react_app_2.models.services;

import java.util.List;
import java.util.Optional;

import com.example.react_app_2.models.entities.User;

public interface UserService {
	List<User> findAll();
	Optional<User> findById(Integer id);
	User save(User user);
	User update(Integer id, User user);
	void delete(Integer id);
}
