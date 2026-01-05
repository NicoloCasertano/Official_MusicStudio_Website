package com.example.react_app_2.models.repositories;

import com.example.react_app_2.models.entities.Work;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkRepo extends JpaRepository<Work, Integer> {
}
