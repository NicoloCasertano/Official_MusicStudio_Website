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

import com.example.react_app_2.models.entities.Beat;
import com.example.react_app_2.models.services.BeatService;

@RestController
@RequestMapping("/api/beats")
public class BeatController {

	private final BeatService service;
	private final com.example.react_app_2.models.services.BeatFileService fileService;

	public BeatController(BeatService service, com.example.react_app_2.models.services.BeatFileService fileService) { 
		this.service = service;
		this.fileService = fileService;
	}

	@GetMapping
	public List<Beat> all() { 
		// Sync beats from folder before returning
		fileService.syncBeatsFromFolder();
		return service.findAll(); 
	}

	@GetMapping("/available")
	public List<Beat> available() { 
		fileService.syncBeatsFromFolder();
		return service.findAvailable(); 
	}

	@GetMapping("/{id}")
	public ResponseEntity<Beat> get(@PathVariable Integer id) {
		return service.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<?> create(@RequestBody Beat beat) {
		try {
			// Validate required fields
			if (beat.getTitle() == null || beat.getTitle().trim().isEmpty()) {
				return ResponseEntity.badRequest().body("Title is required");
			}
			if (beat.getCreator() == null) {
				return ResponseEntity.badRequest().body("Creator is required");
			}
			
			Beat saved = service.save(beat);
			return ResponseEntity.created(URI.create("/api/beats/" + saved.getId())).body(saved);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Failed to create beat: " + e.getMessage());
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Beat beat) {
		try {
			Beat updated = service.update(id, beat);
			return ResponseEntity.ok(updated);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Failed to update beat: " + e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/{id}/purchase")
	public ResponseEntity<?> purchase(@PathVariable Integer id, @RequestBody PurchaseRequest request) {
		try {
			fileService.markBeatAsSoldAndNotify(id, request.buyerEmail);
			return ResponseEntity.ok().body("Beat purchased successfully");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		} catch (IllegalStateException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Purchase failed: " + e.getMessage());
		}
	}

	@PostMapping("/sync")
	public ResponseEntity<?> syncBeats() {
		try {
			fileService.syncBeatsFromFolder();
			return ResponseEntity.ok("Beats synced successfully");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Sync failed: " + e.getMessage());
		}
	}

	public static class PurchaseRequest {
		public String buyerEmail;
	}

}
