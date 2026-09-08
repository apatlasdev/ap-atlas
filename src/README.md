# Sources

The app at the repo root is `index.html` + `app.js` + `vendor/` + `data/`. These are the pieces `app.js` was assembled from.

- `course/shell.html` — page shell + all CSS
- `course/engine_data.js` — modules, cards, schematic diagrams, figure helpers
- `course/lessons_all.js` — the 25 lessons (text, key terms, clinical notes, card lists)
- `course/engine_store.js` — storage, SM-2 scheduler, lesson gating
- `course/engine_sess.js` — study sessions (review, cram, drills)
- `course/ui_full.js` — routing and every view, including the 3D lesson presets (`LESSON3D`)
- `atlas3d/atlas3d.js`, `atlas3d/a3d.css` — the Three.js viewer (click-to-identify with GPU picking, explode, layers, search, model practicals, slice / cross-section mode, joint lab)
- `atlas3d/config.py`, `atlas3d/build.py` — curate/decimate/quantize/pack BodyParts3D into the embedded binary
- `atlas3d/cellbuild.py` — same for the Sketchfab cell glTF
- `tests/smoke.js` — Playwright smoke test (headless WebGL via SwiftShader)

`app.js` = one IIFE of engine_data + lessons_all + engine_store + engine_sess + ui_full, in that order. `data/*.js` are produced by `build.py` / `cellbuild.py` (you need the BodyParts3D archive and the cell model — see ATTRIBUTION.md).
