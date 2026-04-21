export type MediaCredit = {
  id: string;
  title: string;
  kind: "video";
  url: string;
  sourceUrl: string;
  licenseName: string;
  licenseUrl: string;
  attribution: string;
};

export const MEDIA: MediaCredit[] = [
  {
    id: "city-timelapse",
    title: "City Timelapse — Free video",
    kind: "video",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/68/City_Timelapse_-_Free_video.webm",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:City_Timelapse_-_Free_video.webm",
    licenseName: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    attribution: "Free Videos (via Wikimedia Commons)",
  },
  {
    id: "clouds-timelapse",
    title: "Wolken Zeitraffer — Clouds Timelapse",
    kind: "video",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/78/Wolken_Zeitraffer_-_Clouds_Timelapse_%28Royalty_Free%29_%28Kostenlos%29_1280x720p_60FPS.webm",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Wolken_Zeitraffer_-_Clouds_Timelapse_(Royalty_Free)_(Kostenlos)_1280x720p_60FPS.webm",
    licenseName: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    attribution: "FreeSwissVideo (via Wikimedia Commons)",
  },
  {
    id: "lost-universe-nasa",
    title: "The Lost Universe (NASA) — trailer",
    kind: "video",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/94/The_Lost_Universe_NASA_video.webm",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:The_Lost_Universe_NASA_video.webm",
    licenseName: "Public domain (USGov/NASA)",
    licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    attribution: "NASA (via Wikimedia Commons)",
  },
  {
    id: "electron-desorption",
    title: "Electron Stimulated Desorption (science clip)",
    kind: "video",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Electron_Stimulated_Desorption_Video.webm",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Electron_Stimulated_Desorption_Video.webm",
    licenseName: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    attribution: "Kerbiereader (via Wikimedia Commons)",
  },
];

export function getMedia(id: string): MediaCredit | undefined {
  return MEDIA.find((m) => m.id === id);
}

