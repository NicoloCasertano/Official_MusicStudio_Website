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

import com.example.react_app_2.models.entities.Work;
import com.example.react_app_2.models.services.WorkService;

@RestController
@RequestMapping("/api/works")
public class WorkController {

	private final WorkService service;

	public WorkController(WorkService service) { this.service = service; }

	@GetMapping
	public List<Work> all() { return service.findAll(); }

	@GetMapping("/{id}")
	public ResponseEntity<Work> get(@PathVariable Integer id) {
		return service.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<?> create(@RequestBody Work work) {
		try {
			// Validate required fields
			if (work.getTitle() == null || work.getTitle().trim().isEmpty()) {
				return ResponseEntity.badRequest().body("Title is required");
			}
			
			Work saved = service.save(work);
			return ResponseEntity.created(URI.create("/api/works/" + saved.getId())).body(saved);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Failed to create work: " + e.getMessage());
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Work work) {
		try {
			Work updated = service.update(id, work);
			return ResponseEntity.ok(updated);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Failed to update work: " + e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
