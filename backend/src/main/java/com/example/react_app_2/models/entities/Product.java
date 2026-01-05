package com.example.react_app_2.models.entities;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private String name;

	@Column(length = 2000)
	private String description;

	private BigDecimal price;

	@ManyToOne
	@JoinColumn(name = "owner_id", nullable = false)
	private User owner;

	public Product() {}

	public Integer getId() { return id; }
	public void setId(Integer id) { this.id = id; }

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }

	public String getDescription() { return description; }
	public void setDescription(String description) { this.description = description; }

	public BigDecimal getPrice() { return price; }
	public void setPrice(BigDecimal price) { this.price = price; }

	public User getOwner() { return owner; }
	public void setOwner(User owner) { this.owner = owner; }

}
