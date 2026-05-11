export interface Release {
  id: string;
  slug?: string;
  title: string;
  artist: string;
  artistSlug: string;
  featuredArtists?: string[];
  type: "Album" | "EP" | "Single" | "Mixtape";
  year: number;
  cover: string;
  covers?: string[];
  tracks?: string[];
  streamingLinks: {
    spotify?: string;
    appleMusic?: string;
    soundcloud?: string;
    youtube?: string;
  };
  description: string;
}

export const releases: Release[] = [
  {
    id: "togomori-fovea",
    slug: "fovea",
    title: "FOVEA",
    artist: "TOGOMORI & MUZZZ",
    artistSlug: "togomori",
    type: "EP",
    year: 2026,
    cover: "/images/fovea-cover-1.png",
    covers: [
      "/images/fovea-cover-1.png",
      "/images/fovea-cover-2.png",
      "/images/fovea-cover-3.png",
    ],
    tracks: [
      "NOT ONE STEP BACK (feat. MUZZZ)",
      "MY TIME (feat. MUZZZ)",
      "SYNDROME (feat. MUZZZ & MOVII)",
      "FOVEA INTERLUDE (feat. MUZZZ)",
      "MI AMORE (feat. MUZZZ)",
      "SPZ (feat. MUZZZ)",
      "HOMMAGE (feat. MUZZZ)",
    ],
    streamingLinks: {
      spotify: "https://open.spotify.com/album/0cvxxxg1B4Up8KV1uRprbE?si=1B1HVuhFRLy-UvBHrg2Y8Q",
    },
    description:
      "A seven-track collab EP between TOGOMORI and MUZZZ. FOVEA is the sharpest point — the centre of focus. Features MOVII on SYNDROME.",
  },
  {
    id: "togomori-muzzz-my-time",
    title: "MY TIME",
    artist: "TOGOMORI & MUZZZ",
    artistSlug: "togomori",
    type: "Single",
    year: 2025,
    cover: "https://i.scdn.co/image/ab67616d0000b2736e30cdbb46b443f71a896e90",
    streamingLinks: {
      spotify: "https://open.spotify.com/album/0Ll9Zv0CUTf6rkYnb8GgUO",
    },
    description: "A joint single from TOGOMORI and MUZZZ.",
  },
  {
    id: "togomori-on-peut-saimer-encore",
    title: "ON PEUT S'AIMER ENCORE",
    artist: "TOGOMORI",
    artistSlug: "togomori",
    type: "Single",
    year: 2025,
    cover: "https://i.scdn.co/image/ab67616d0000b273936dc50fbe23a7363b0f877d",
    streamingLinks: {
      spotify: "https://open.spotify.com/album/3nt9gXz80lLluCwMLgQAqL",
    },
    description: "A TOGOMORI single.",
  },
  {
    id: "muzzz-bounce",
    title: "BOUNCE",
    artist: "MUZZZ",
    artistSlug: "muzzz",
    type: "Single",
    year: 2025,
    cover: "https://i.scdn.co/image/ab67616d0000b27373d525d6f66470ae6d5b1bf0",
    streamingLinks: {
      spotify: "https://open.spotify.com/album/3Gsq1ch715JFj72BAUi96Y",
    },
    description: "A MUZZZ single.",
  },
];
