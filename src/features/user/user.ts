import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Game {
  background_image: string;
  background_image2: string;
  cover_image: string;
  created_at: string;
  igdb_id: number;
  metacritic: number | null;
  name: string;
  rating: number | null;
  released: string;
  top: number;
  updated_at: string;
  uuid: string;
}

export interface Platform {
  id: number;
  image: string | null;
  name: string;
  slug: string | null;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Invites {
  uuid: string;
  code: string;
  used: boolean;
  created_at: string;
  usersUuid: string;
}

export interface UserState {
  age: number;
  country: string;
  created_at: string;
  description: string;
  email: string;
  enabled: boolean;
  gamertag: string;
  games: Game[];
  geolocation: string;
  image: string;
  only_same_country: boolean;
  platforms: Platform[];
  tags: Tag[];
  updated_at: string;
  uuid: string;
  push_token?: string;
  push_notifications?: boolean;
  invites: Invites[];
}

export interface EditUpdate {
  gamertag: string;
  description: string;
  age: number;
  country: string;
  only_same_country: boolean;
}

const initialState: UserState = {
  age: 0,
  country: "",
  created_at: "",
  description: "",
  email: "",
  enabled: false,
  gamertag: "",
  games: [],
  geolocation: "",
  image: "",
  only_same_country: false,
  platforms: [],
  tags: [],
  updated_at: "",
  uuid: "",
  push_token: "",
  push_notifications: true,
  invites: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserGames: (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
    },
    updateUserPlatforms: (state, action: PayloadAction<Platform[]>) => {
      state.platforms = action.payload;
    },
    updateUserTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
    updateUserInvites: (state, action: PayloadAction<Invites[]>) => {
      state.invites = action.payload;
    },
    updateEditUser: (state, action: PayloadAction<Partial<UserState>>) => {
      state = { ...state, ...action.payload };
    },
    updateUserState: (state, action: PayloadAction<UserState>) => {
      Object.assign(state, action.payload);
    },
    cleanUserState: (state) => {
      state = initialState;
    },
  },
});

export const {
  updateUserState,
  updateUserGames,
  updateUserPlatforms,
  updateUserTags,
  updateEditUser,
  cleanUserState,
  updateUserInvites,
} = userSlice.actions;

export default userSlice.reducer;
