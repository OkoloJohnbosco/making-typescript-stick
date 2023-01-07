export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export interface Comic extends DataEntity {
  issueNumber: number;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
};

export type DataEntityMapKeys = Extract<keyof DataEntityMap, any>;

type DataStoreMethods = {
  [K in DataEntityMapKeys as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][];
} & {
  [K in DataEntityMapKeys as `get${Capitalize<K>}`]: (
    id: string
  ) => DataEntityMap[K];
} & {
  [K in DataEntityMapKeys as `clear${Capitalize<K>}s`]: () => void;
} & {
  [K in DataEntityMapKeys as `add${Capitalize<K>}`]: (
    args: DataEntityMap[K]
  ) => DataEntityMap[K];
};

function isDefined<T>(x: T | undefined): x is T {
  return typeof x !== "undefined";
}

export class DataStore implements DataStoreMethods {
  #data: { [K in DataEntityMapKeys]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {},
  };

  getAllSongs(): Song[] {
    return Object.keys(this.#data.song)
      .map((songKey) => this.#data.song[songKey])
      .filter(isDefined);
  }

  getSong(id: string): Song {
    const song = this.#data.song[id];
    if (!song) throw new Error(`Could not find song with id ${id}`);
    return song;
  }

  addSong(song: Song) {
    this.#data.song[song.id] = song;
    return song;
  }

  clearSongs() {
    this.#data.song = {};
  }

  getAllMovies(): Movie[] {
    return Object.keys(this.#data.movie)
      .map((movieKey) => this.#data.movie[movieKey])
      .filter(isDefined);
  }
  getMovie(id: string): Movie {
    const movie = this.#data.movie[id];
    if (!movie) throw new Error(`Could not find movie with id ${id}`);
    return movie;
  }

  addMovie(movie: Movie) {
    this.#data.movie[movie.id] = movie;
    return movie;
  }

  clearMovies() {
    this.#data.movie = {};
  }
}

// const cs = new DataStore();
const cs: DataStoreMethods = {} as any;
// cs.a

let age = 35;
age = Number.NaN;

class Person {
  #name: string;
  private age: number;
  constructor(name: string, age: number) {
    this.#name = name;
    this.age = age;
  }
}
class Student extends Person {
  #name: string | string[];
  // private age: number;
  constructor(name: string, age: number | null) {
    super(name, age || 0);
    this.#name = name;
    // this.age = age;
  }
}

type Color = {
  red: number;
  green: number;
  blue: number;
};

class ColorValue implements Color {
  constructor(public red: number, public green: number, public blue: number) {}
}
const c = new ColorValue(4, 3, 2);
console.log(c.blue);
