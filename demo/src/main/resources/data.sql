-- Mock data for development: users, beats, works, and associations

-- Users (id, username, email, password)
INSERT INTO "user" (id, username, email, password) VALUES (1, 'alice', 'alice@example.com', 'password1');
INSERT INTO "user" (id, username, email, password) VALUES (2, 'bob', 'bob@example.com', 'password2');

-- Beats - removed old test beats as they were deleted
-- New beats will be automatically synced from audio-beats folder

-- Works (id, title, status, user_id)
INSERT INTO work (id, title, status, user_id) VALUES (1, 'Album Track', 'in-progress', 1);
INSERT INTO work (id, title, status, user_id) VALUES (2, 'Single', 'completed', 2);

-- work_beats association - removed associations with deleted beats
