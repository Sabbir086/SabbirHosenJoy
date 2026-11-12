// Project media registry. Add files under public/ and reference them with root-relative paths.
// Put image/video files in assets/projects/ and reference them here,
// e.g. "assets/projects/street-bot/photo-1.jpg".
// Leave a value empty ("" or []) and the site shows a clean placeholder.
//
// video   : .mp4/.webm path, or a YouTube / Facebook video URL
// cover   : optional main image (defaults to the first gallery photo)
// gallery : list of { src, alt, caption } — use it for project photos,
//           competition photos, certificates, or technical diagrams
// ===================================================================
const PROJECT_MEDIA = {
  streetBot: {
    video: "https://www.facebook.com/joy.hosen.sabbir/videos/842633973430042/",
    cover: "photo/project/S1.jpg",
    gallery: [
      { src: "photo/project/S1.jpg", alt: "Street Bot Image 1" },
      { src: "photo/project/S2.jpg", alt: "Street Bot Image 2" },
      { src: "photo/project/S3.jpg", alt: "Street Bot Image 3" }
    ]
  },
  waterTank: {
    video: "",
    cover: "photo/project/W1.jpg",
    gallery: [
      { src: "photo/project/W1.jpg", alt: "Water Tank Image 1" },
      { src: "photo/project/W2.jpg", alt: "Water Tank Image 2" },
      { src: "photo/project/W3.jpg", alt: "Water Tank Image 3" }
    ]
  },
  laserSecurity: { gallery: [] },
  ultrasonic: { gallery: [] },
  accidentDetection: { gallery: [] },
  crafting: { gallery: [] }
};

export default PROJECT_MEDIA;
