package com.example.react_app_2.models.repositories;

import com.example.react_app_2.models.entities.Beat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface BeatRepo extends JpaRepository<Beat, Integer> {
    Optional<Beat> findByAudioPath(String audioPath);
    List<Beat> findBySoldFalse();
}
