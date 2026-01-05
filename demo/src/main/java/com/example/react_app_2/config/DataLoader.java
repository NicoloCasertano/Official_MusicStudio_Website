package com.example.react_app_2.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.react_app_2.models.entities.Beat;
import com.example.react_app_2.models.entities.User;
import com.example.react_app_2.models.entities.Work;
import com.example.react_app_2.models.repositories.BeatRepo;
import com.example.react_app_2.models.repositories.UserRepo;
import com.example.react_app_2.models.repositories.WorkRepo;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepo userRepo;
    private final BeatRepo beatRepo;
    private final WorkRepo workRepo;

    public DataLoader(UserRepo userRepo, BeatRepo beatRepo, WorkRepo workRepo) {
        this.userRepo = userRepo;
        this.beatRepo = beatRepo;
        this.workRepo = workRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepo.count() > 0) return; // already seeded

        // Seed generic users for demo/testing
        User alice = new User();
        alice.setUsername("user1");
        alice.setEmail("alice@example.com");
        alice.setPassword("password1");
        alice = userRepo.save(alice);

        User bob = new User();
        bob.setUsername("user2");
        bob.setEmail("bob@example.com");
        bob.setPassword("password2");
        bob = userRepo.save(bob);

        // Beats removed - they will be automatically synced from audio-beats folder by BeatFileService
        // This prevents re-creating deleted beats on application restart

        Work w1 = new Work();
        w1.setTitle("Album Track");
        w1.setStatus("in-progress");
        w1.setUser(alice);
        // No beats associated initially
        workRepo.save(w1);

        Work w2 = new Work();
        w2.setTitle("Single");
        w2.setStatus("completed");
        w2.setUser(bob);
        // No beats associated initially
        workRepo.save(w2);
    }
}
