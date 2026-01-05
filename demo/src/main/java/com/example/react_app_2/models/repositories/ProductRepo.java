package com.example.react_app_2.models.repositories;

import com.example.react_app_2.models.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, Integer> {
}
