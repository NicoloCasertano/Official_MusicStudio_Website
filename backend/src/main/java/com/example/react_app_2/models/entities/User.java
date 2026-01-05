package com.example.react_app_2.models.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "app_user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, unique = true)
	private String username;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(length = 10485760) // 10MB for base64 images
	private String profileImg;

	@OneToMany(mappedBy = "owner")
	private List<Product> products = new ArrayList<>();

	@OneToMany(mappedBy = "creator")
	private List<Beat> beats = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Work> works = new ArrayList<>();

	public User() {}

	public Integer getId() { return id; }
	public void setId(Integer id) { this.id = id; }

	public String getUsername() { return username; }
	public void setUsername(String username) { this.username = username; }

	public String getEmail() { return email; }
	public void setEmail(String email) { this.email = email; }

	@com.fasterxml.jackson.annotation.JsonProperty(access = com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY)
	public String getPassword() { return password; }
	public void setPassword(String password) { this.password = password; }

	public String getProfileImg() { return profileImg; }
	public void setProfileImg(String profileImg) { this.profileImg = profileImg; }

	@JsonIgnore
	public List<Product> getProducts() { return products; }
	public void setProducts(List<Product> products) { this.products = products; }

	@JsonIgnore
	public List<Beat> getBeats() { return beats; }
	public void setBeats(List<Beat> beats) { this.beats = beats; }

	@JsonIgnore
	public List<Work> getWorks() { return works; }
	public void setWorks(List<Work> works) { this.works = works; }

}
