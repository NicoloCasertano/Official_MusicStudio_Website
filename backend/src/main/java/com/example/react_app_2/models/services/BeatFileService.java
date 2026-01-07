package com.example.react_app_2.models.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.react_app_2.models.entities.Beat;
import com.example.react_app_2.models.repositories.BeatRepo;

@Service
public class BeatFileService {

    private final BeatRepo beatRepo;
    private static final String AUDIO_FOLDER = "src/main/resources/audio-beats";
    private static final int COVER_IMAGE_COUNT = 14; // bCover_img1.jpg to bCover_img14.jpg
    private static final int NO_REPEAT_THRESHOLD = 10; // Allow repeats only after 10 beats
    
    // All available genres (matching frontend genreColors)
    private static final List<String> ALL_GENRES = Arrays.asList(
        "Trap", "Drill", "Hip-Hop", "Rap", "RnB", "Pop", "Afrobeat", "Dancehall",
        "Reggaeton", "Electronic", "House", "Techno", "EDM", "Chill", "Lofi",
        "Ambient", "Rock", "Indie", "Alternative"
    );
    
    private final Random random = new Random();

    public BeatFileService(BeatRepo beatRepo) {
        this.beatRepo = beatRepo;
    }

    /**
     * Get a random cover image filename from bCover_img1.jpg to bCover_img14.jpg
     * If there are fewer than 10 beats, it ensures no image is repeated.
     * After 10 beats, repeats are allowed.
     */
    private String getRandomCoverImage() {
        List<Beat> existingBeats = beatRepo.findAll();
        
        // If we have 10 or more beats, allow any random image (repeats allowed)
        if (existingBeats.size() >= NO_REPEAT_THRESHOLD) {
            int imageNumber = random.nextInt(COVER_IMAGE_COUNT) + 1; // 1 to 14
            return "bCover_img" + imageNumber + ".jpg";
        }
        
        // Get the set of images already in use
        Set<String> usedImages = existingBeats.stream()
                .map(Beat::getImage)
                .filter(img -> img != null)
                .collect(Collectors.toSet());
        
        // Build list of available (unused) images
        List<String> availableImages = new ArrayList<>();
        for (int i = 1; i <= COVER_IMAGE_COUNT; i++) {
            String imageName = "bCover_img" + i + ".jpg";
            if (!usedImages.contains(imageName)) {
                availableImages.add(imageName);
            }
        }
        
        // If all images are used (shouldn't happen with 14 images and < 10 beats), pick randomly
        if (availableImages.isEmpty()) {
            int imageNumber = random.nextInt(COVER_IMAGE_COUNT) + 1;
            return "bCover_img" + imageNumber + ".jpg";
        }
        
        // Pick a random image from available ones
        return availableImages.get(random.nextInt(availableImages.size()));
    }

    public void syncBeatsFromFolder() {
        File folder = new File(AUDIO_FOLDER);
        if (!folder.exists() || !folder.isDirectory()) {
            // If folder doesn't exist, delete all beats from database
            beatRepo.deleteAll();
            return;
        }

        File[] audioFiles = folder.listFiles((dir, name) -> 
            name.toLowerCase().endsWith(".mp3") || 
            name.toLowerCase().endsWith(".wav") ||
            name.toLowerCase().endsWith(".m4a")
        );

        // Get set of current audio filenames in folder
        Set<String> currentAudioFiles = new HashSet<>();
        if (audioFiles != null) {
            for (File f : audioFiles) {
                currentAudioFiles.add(f.getName());
            }
        }

        // Delete beats whose audio files no longer exist in the folder
        List<Beat> allBeats = beatRepo.findAll();
        for (Beat beat : allBeats) {
            String audioPath = beat.getAudioPath();
            if (audioPath != null && !currentAudioFiles.contains(audioPath)) {
                // Audio file was removed, delete the beat from database
                System.out.println("Audio file removed, deleting beat: " + beat.getTitle() + " (" + audioPath + ")");
                beatRepo.delete(beat);
            }
        }

        // If no audio files, we're done
        if (audioFiles == null || audioFiles.length == 0) {
            return;
        }

        // Add new beats for audio files that don't exist in database
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
                // Assign a random cover image from bCover_img1-14
                beat.setImage(getRandomCoverImage());
                
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

    /**
     * Get a random genre from the available genres list.
     * If there are fewer than 10 beats, it ensures no genre is repeated.
     * After 10 beats, repeats are allowed.
     */
    private String getRandomGenre() {
        List<Beat> existingBeats = beatRepo.findAll();
        
        // If we have 10 or more beats, allow any random genre (repeats allowed)
        if (existingBeats.size() >= NO_REPEAT_THRESHOLD) {
            return ALL_GENRES.get(random.nextInt(ALL_GENRES.size()));
        }
        
        // Get the set of genres already in use (case-insensitive comparison)
        Set<String> usedGenres = existingBeats.stream()
                .map(Beat::getGenre)
                .filter(genre -> genre != null)
                .map(String::toLowerCase)
                .collect(Collectors.toSet());
        
        // Build list of available (unused) genres
        List<String> availableGenres = ALL_GENRES.stream()
                .filter(genre -> !usedGenres.contains(genre.toLowerCase()))
                .collect(Collectors.toList());
        
        // If all genres are used, pick randomly from all
        if (availableGenres.isEmpty()) {
            return ALL_GENRES.get(random.nextInt(ALL_GENRES.size()));
        }
        
        // Pick a random genre from available ones
        return availableGenres.get(random.nextInt(availableGenres.size()));
    }
}
