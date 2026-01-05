package com.example.react_app_2.models.services;

import java.util.List;
import java.util.Optional;

import com.example.react_app_2.models.entities.Product;

public interface ProductService {
	List<Product> findAll();
	Optional<Product> findById(Integer id);
	Product save(Product product);
	Product update(Integer id, Product product);
	void delete(Integer id);
}
