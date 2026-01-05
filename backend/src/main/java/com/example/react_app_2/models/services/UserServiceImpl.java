package com.example.react_app_2.models.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.react_app_2.models.entities.User;
import com.example.react_app_2.models.repositories.UserRepo;

@Service
public class UserServiceImpl implements UserService{

	private final UserRepo repo;

	public UserServiceImpl(UserRepo repo) { this.repo = repo; }

	@Override
	public List<User> findAll() { return repo.findAll(); }

	@Override
	public Optional<User> findById(Integer id) { return repo.findById(id); }

	@Override
	public User save(User user) { return repo.save(user); }

	@Override
	public User update(Integer id, User user) {
		return repo.findById(id).map(existing -> {
			// Only update provided fields
			if (user.getUsername() != null && !user.getUsername().trim().isEmpty()) {
				existing.setUsername(user.getUsername());
			}
			if (user.getEmail() != null && !user.getEmail().trim().isEmpty()) {
				existing.setEmail(user.getEmail());
			}
			if (user.getPassword() != null && !user.getPassword().trim().isEmpty()) {
				existing.setPassword(user.getPassword());
			}
			if (user.getProfileImg() != null) {
				existing.setProfileImg(user.getProfileImg());
			}
			return repo.save(existing);
		}).orElseThrow(() -> new IllegalArgumentException("User not found: " + id));
	}

	@Override
	public void delete(Integer id) { repo.deleteById(id); }

}
