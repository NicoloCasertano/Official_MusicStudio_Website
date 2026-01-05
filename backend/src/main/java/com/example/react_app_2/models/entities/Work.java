package com.example.react_app_2.models.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Work {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private String title;

	private String status;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToMany
	@JoinTable(
		name = "work_beats",
		joinColumns = @JoinColumn(name = "work_id"),
		inverseJoinColumns = @JoinColumn(name = "beat_id")
	)
	private List<Beat> beats = new ArrayList<>();

	public Work() {}

	public Integer getId() { return id; }
	public void setId(Integer id) { this.id = id; }

	public String getTitle() { return title; }
	public void setTitle(String title) { this.title = title; }

	public String getStatus() { return status; }
	public void setStatus(String status) { this.status = status; }

	public User getUser() { return user; }
	public void setUser(User user) { this.user = user; }

	public List<Beat> getBeats() { return beats; }
	public void setBeats(List<Beat> beats) { this.beats = beats; }

}
