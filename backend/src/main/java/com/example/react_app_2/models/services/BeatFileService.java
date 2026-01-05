package com.example.react_app_2.models.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.react_app_2.models.entities.Beat;
import com.example.react_app_2.models.repositories.BeatRepo;

@Service
public class BeatFileService {

    private final BeatRepo beatRepo;
    private static final String AUDIO_FOLDER = "src/main/resources/audio-beats";
    private static final String BEAT_IMAGE = "IMG_0357.JPG";
    private static final List<String> GENRES = Arrays.asList("Trap", "Hip-Hop", "R&B", "Drill", "Lo-Fi", "Boom Bap");

    public BeatFileService(BeatRepo beatRepo) {
        this.beatRepo = beatRepo;
    }

    public void syncBeatsFromFolder() {
        File folder = new File(AUDIO_FOLDER);
        if (!folder.exists() || !folder.isDirectory()) {
            return;
        }

        File[] audioFiles = folder.listFiles((dir, name) -> 
            name.toLowerCase().endsWith(".mp3") || 
            name.toLowerCase().endsWith(".wav") ||
            name.toLowerCase().endsWith(".m4a")
        );

        if (audioFiles == null || audioFiles.length == 0) {
            return;
        }

        for (File audioFile : audioFiles) {
            String filename = audioFile.getName();
            String filenameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
            
            // Check if beat already exists
            if (beatRepo.findByAudioPath(filename).isPresent()) {
                continue;
            }

            // Parse filename: Title_BPMbpm_Key_Genre.mp3
            String[] parts = filenameWithoutExt.split("_");
            if (parts.length >= 3) {
                Beat beat = new Beat();
                beat.setTitle(parts[0].replace("-", " "));
                
                // Parse BPM
                String bpmStr = parts[1].toLowerCase().replace("bpm", "");
                try {
                    beat.setBpm(Integer.parseInt(bpmStr));
                } catch (NumberFormatException e) {
                    beat.setBpm(120); // default
                }
                
                // Parse Key
                beat.setKeySignature(parts[2]);
                
                // Parse Genre (4th part if available, otherwise random)
                if (parts.length >= 4) {
                    beat.setGenre(parts[3]);
                } else {
                    beat.setGenre(getRandomGenre());
                }
                
                beat.setAudioPath(filename);
                beat.setPrice(27.0);
                beat.setSold(false);
                beat.setImage(BEAT_IMAGE);
                
                beatRepo.save(beat);
            }
        }
    }

    public void markBeatAsSoldAndNotify(Integer beatId, String buyerEmail) {
        Beat beat = beatRepo.findById(beatId).orElseThrow(() -> 
            new IllegalArgumentException("Beat not found")
        );

        if (beat.getSold()) {
            throw new IllegalStateException("Beat already sold");
        }

        // Mark as sold
        beat.setSold(true);
        beatRepo.save(beat);

        // Send email notification
        sendSoldNotification(beat, buyerEmail);

        // Delete audio file
        deleteAudioFile(beat.getAudioPath());
    }

    private void sendSoldNotification(Beat beat, String buyerEmail) {
        // Email notification - TODO: Configure mail sender in application.properties
        String notification = String.format(
            "BEAT SOLD NOTIFICATION\n" +
            "======================\n" +
            "To: info.nosaintz@gmail.com\n\n" +
            "A beat has been sold!\n\n" +
            "Beat Title: %s\n" +
            "Genre: %s\n" +
            "BPM: %d\n" +
            "Key: %s\n" +
            "Price: €%.2f\n" +
            "Buyer Email: %s\n\n" +
            "The beat has been removed from the website and the audio file has been deleted.\n" +
            "Exclusive rights have been sold.",
            beat.getTitle(), beat.getGenre(), beat.getBpm(), 
            beat.getKeySignature(), beat.getPrice(), buyerEmail
        );
        System.out.println(notification);
        // TODO: Implement actual email sending when mail configuration is added
    }

    private void deleteAudioFile(String audioPath) {
        if (audioPath == null) return;
        try {
            Path path = Paths.get(AUDIO_FOLDER, audioPath);
            Files.deleteIfExists(path);
        } catch (IOException e) {
            System.err.println("Failed to delete audio file: " + e.getMessage());
        }
    }

    private String getRandomGenre() {
        return GENRES.get(new Random().nextInt(GENRES.size()));
    }
}
