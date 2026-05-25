# Animation integration notes

The uploaded `models.zip` GLB animation files have been copied into normalized country folders under `characters-page/models/<country>/emotes/`.

The original file names were renamed to simple handler-friendly names such as `bow.glb`, `dance.glb`, `run.glb`, and `lookAround.glb`. The mapping is registered in `characters-page/script.js` inside the `uploadedModelEmotes` configuration block.

The character page now uses the uploaded animated GLB files directly in the slider. Because these files are separate animated models, the handler clears `animation-name` before changing the model source and lets `<model-viewer autoplay>` play the embedded animation clip.
