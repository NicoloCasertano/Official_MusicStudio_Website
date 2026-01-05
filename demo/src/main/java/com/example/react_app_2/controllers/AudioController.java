package com.example.react_app_2.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/beats/audio")
public class AudioController {

    private static final String AUDIO_FOLDER = "src/main/resources/audio-beats";

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getAudioFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(AUDIO_FOLDER, filename);
            File file = filePath.toFile();
            
            if (!file.exists() || !file.isFile()) {
                return ResponseEntity.notFound().build();
            }

            byte[] data = Files.readAllBytes(filePath);
            ByteArrayResource resource = new ByteArrayResource(data);

            String contentType = "audio/mpeg";
            if (filename.toLowerCase().endsWith(".wav")) {
                contentType = "audio/wav";
            } else if (filename.toLowerCase().endsWith(".m4a")) {
                contentType = "audio/mp4";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
