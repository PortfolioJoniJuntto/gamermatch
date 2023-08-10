export interface Game {
    background_image: string;
    background_image2: string;
    cover_image: string;
    created_at: string;
    igdb_id: number;
    metacritic: null;
    name: string;
    rating: null;
    released: string;
    top: number;
    updated_at: string;
    uuid: string;
}

export interface Platform {
    id: number;
    image: null;
    name: string;
    slug: null;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export interface User {
  age: number;
    country: string;
    created_at: string;
    description: string;
    email: string;
    enabled: boolean;
    gamertag: string;
    gamesDetail: Game[];
    geolocation: string;
    image: string;
    only_same_country: boolean;
    platformsDetail: Platform[];
    tagsDetail: Tag[];
    updated_at: string;
    uuid: string;
}