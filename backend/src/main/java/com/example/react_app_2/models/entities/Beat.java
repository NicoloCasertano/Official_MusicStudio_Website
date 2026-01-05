package com.example.react_app_2.models.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Beat {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private String title;

	private Integer bpm;

	private String keySignature;

	private String genre;

	private Double price = 27.0;

	private String audioPath;

	private String image;

	@Column(nullable = false)
	private Boolean sold = false;

	@ManyToOne
	@JoinColumn(name = "creator_id")
	private User creator;

	@ManyToMany(mappedBy = "beats")
	private List<Work> works = new ArrayList<>();

	public Beat() {}

	public Integer getId() { return id; }
	public void setId(Integer id) { this.id = id; }

	public String getTitle() { return title; }
	public void setTitle(String title) { this.title = title; }

	public Integer getBpm() { return bpm; }
	public void setBpm(Integer bpm) { this.bpm = bpm; }

	public String getKeySignature() { return keySignature; }
	public void setKeySignature(String keySignature) { this.keySignature = keySignature; }

	public String getGenre() { return genre; }
	public void setGenre(String genre) { this.genre = genre; }

	public Double getPrice() { return price; }
	public void setPrice(Double price) { this.price = price; }

	public String getAudioPath() { return audioPath; }
	public void setAudioPath(String audioPath) { this.audioPath = audioPath; }

	public String getImage() { return image; }
	public void setImage(String image) { this.image = image; }

	public Boolean getSold() { return sold; }
	public void setSold(Boolean sold) { this.sold = sold; }

	public User getCreator() { return creator; }
	public void setCreator(User creator) { this.creator = creator; }

	@JsonIgnore
	public List<Work> getWorks() { return works; }
	public void setWorks(List<Work> works) { this.works = works; }

}
