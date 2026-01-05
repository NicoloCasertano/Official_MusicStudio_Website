package com.example.react_app_2.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.react_app_2.models.entities.User;
import com.example.react_app_2.models.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserService service;

	public UserController(UserService service) { this.service = service; }

	@GetMapping
	public List<User> all() { return service.findAll(); }

	@GetMapping("/{id}")
	public ResponseEntity<User> get(@PathVariable Integer id) {
		return service.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<?> create(@RequestBody User user) {
		try {
			// Validate required fields
			if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
				return ResponseEntity.badRequest().body("Username is required");
			}
			if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
				return ResponseEntity.badRequest().body("Email is required");
			}
			if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
				return ResponseEntity.badRequest().body("Password is required");
			}
			
			User saved = service.save(user);
			return ResponseEntity.created(URI.create("/api/users/" + saved.getId())).body(saved);
		} catch (org.springframework.dao.DataIntegrityViolationException e) {
			// Handle duplicate email or username
			String message = "Registration failed: Email or username already exists";
			if (e.getMessage() != null) {
				if (e.getMessage().contains("email")) {
					message = "Registration failed: Email already exists";
				} else if (e.getMessage().contains("username")) {
					message = "Registration failed: Username already exists";
				}
			}
			return ResponseEntity.status(409).body(message);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Registration failed: " + e.getMessage());
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody User user) {
		try {
			User updated = service.update(id, user);
			return ResponseEntity.ok(updated);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		} catch (org.springframework.dao.DataIntegrityViolationException e) {
			String message = "Update failed: Email or username already exists";
			if (e.getMessage() != null) {
				if (e.getMessage().contains("email")) {
					message = "Update failed: Email already exists";
				} else if (e.getMessage().contains("username")) {
					message = "Update failed: Username already exists";
				}
			}
			return ResponseEntity.status(409).body(message);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Update failed: " + e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
