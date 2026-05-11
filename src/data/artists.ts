export interface Artist {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  bio: string;
  genre: string;
  image: string;
  socials: {
    instagram?: string;
    spotify?: string;
    soundcloud?: string;
    youtube?: string;
  };
}

export const artists: Artist[] = [
  {
    id: "togomori",
    name: "TOGOMORI",
    slug: "togomori",
    tagline: "Born rebel.",
    bio: "TOGOMORI is a sonic architect pushing the limits of experimental sound design and underground electronic music. Drawing from industrial textures, dark ambient landscapes, and fractured rhythms, TOGOMORI crafts immersive worlds that defy genre classification. Each release is a statement — raw, deliberate, and uncompromising.",
    genre: "Experimental / Dark Electronic",
    image: "/images/togomori.png",
    socials: {
      instagram: "https://instagram.com/togomoriiii8",
      spotify: "https://open.spotify.com/artist/6yalalhic157WrYz30jzAS?si=6FcSodIOR4uciW4eHCETJQ",
    },
  },
  {
    id: "muzzz",
    name: "MUZZZ",
    slug: "muzzz",
    tagline: "Static is a frequency.",
    bio: "MUZZZ operates at the intersection of noise, hip-hop, and avant-garde production. Known for dense, layered beats and an unapologetic approach to sound, MUZZZ has carved out a singular identity in the underground scene. Every track feels like a transmission from another dimension — distorted, heavy, and deeply personal.",
    genre: "Noise / Experimental Hip-Hop",
    image: "https://i.scdn.co/image/ab6761610000e5eb93d7705c0e1d4820ec657b24",
    socials: {
      spotify: "https://open.spotify.com/artist/5NaP1z6e7iZ6BYIiKKVMRW",
    },
  },
];
