package com.example.react_app_2.models.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.react_app_2.models.entities.User;

public interface UserRepo extends JpaRepository<User, Integer> {
	Optional<User> findByEmail(String email);
	Optional<User> findByEmailAndPassword(String email, String password);
}
