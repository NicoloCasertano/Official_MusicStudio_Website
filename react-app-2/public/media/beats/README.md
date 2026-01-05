This folder should contain your beats audio files (MP3/OGG).

- Place audio files here, e.g. `beat-01.mp3`.
- In `src/data/beats.js` add an entry with `fileName: 'beat-01.mp3'` and the `file` path will resolve to `/media/beats/beat-01.mp3`.

Example beats entry in `src/data/beats.js`:

```
export default [
  { id: 1, title: 'Chill Loop', price: 29, fileName: 'chill-loop.mp3' }
]
```

Note: Do not commit large audio files to the repository if not intended.
