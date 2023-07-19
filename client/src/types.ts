// Directory stuff
export interface DirectoryTree {
  directories: Directory[];
}

export interface Directory {
  name: string;
  fullPath: string;
  checked: boolean;
  children?: Directory[];
}
