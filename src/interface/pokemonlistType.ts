export interface pokemonType {
  name: string;
  url: string;
}

export interface pokemonTypeInterface {
  slot: number;
  type: { name: string; url: string };
  color?:string
}
export interface polemonlistType {
  count: number;
  next: string | null;
  previous: string | null;
  results: pokemonType[];
}

export interface sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export type UserType = {
  username: string;
  password: string;
  name: string;
  email: string;
};

export type UserStateType = {
  user: UserType | null;
  setuser: React.Dispatch<React.SetStateAction<UserType | null>>;
  todolist: string[];
  settodolist: React.Dispatch<React.SetStateAction<string[]>>;
  url: string;
  seturl: React.Dispatch<React.SetStateAction<string>>;

  pokemonlist: any;
  device:string
};

export type Evo ={
  name: string,
  index: number,
  id?: number,
}[]