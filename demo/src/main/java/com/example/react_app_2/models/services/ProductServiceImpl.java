package com.example.react_app_2.models.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.react_app_2.models.entities.Product;
import com.example.react_app_2.models.repositories.ProductRepo;

@Service
public class ProductServiceImpl implements ProductService{

	private final ProductRepo repo;

	public ProductServiceImpl(ProductRepo repo) { this.repo = repo; }

	@Override
	public List<Product> findAll() { return repo.findAll(); }

	@Override
	public Optional<Product> findById(Integer id) { return repo.findById(id); }

	@Override
	public Product save(Product product) { return repo.save(product); }

	@Override
	public Product update(Integer id, Product product) {
		return repo.findById(id).map(existing -> {
			product.setId(existing.getId());
			return repo.save(product);
		}).orElseThrow(() -> new IllegalArgumentException("Product not found: " + id));
	}

	@Override
	public void delete(Integer id) { repo.deleteById(id); }

}
