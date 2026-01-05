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

import com.example.react_app_2.models.entities.Product;
import com.example.react_app_2.models.services.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	private final ProductService service;

	public ProductController(ProductService service) { this.service = service; }

	@GetMapping
	public List<Product> all() { return service.findAll(); }

	@GetMapping("/{id}")
	public ResponseEntity<Product> get(@PathVariable Integer id) {
		return service.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<?> create(@RequestBody Product product) {
		try {
			// Validate required fields
			if (product.getName() == null || product.getName().trim().isEmpty()) {
				return ResponseEntity.badRequest().body("Name is required");
			}
			if (product.getOwner() == null) {
				return ResponseEntity.badRequest().body("Owner is required");
			}
			
			Product saved = service.save(product);
			return ResponseEntity.created(URI.create("/api/products/" + saved.getId())).body(saved);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Failed to create product: " + e.getMessage());
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Product product) {
		try {
			Product updated = service.update(id, product);
			return ResponseEntity.ok(updated);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Failed to update product: " + e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
