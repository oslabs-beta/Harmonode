// file object for information about files read with fs
export interface FileObj {
  fileName: string;
  filePath: string;
  fullPath: string;
  contents: string;
  mDate?: Date; // <--- last modified date, used for knowing when ast will update the file
}

// directory object for information about directories read with fs
export interface DirObj {
  fileName: string;
  filePath: string;
}

// the root ast structure which has all the ast data collected in it
export interface astRoot {
  fetches: astFetch[];
  endpoints: astEndpoint[];
  fetchFiles: astFetchFile[];
  endpointFiles: astEndpointFile[];
}


// produces information from ast parser with information on a per file basis for fetch requests
export interface astFetchFile {
  fileName: string;
  filePath: string;
  fullPath: string;
  id: string;
  lastUpdated: Date | undefined;
  fetches: object[];
}

// produces information from ast parser with information on a per file basis for endpoint details
export interface astEndpointFile {
  fileName: string;
  filePath: string;
  fullPath: string;
  id: string;
  isServer: boolean;
  lastUpdated: Date | undefined;
  endpoints: string[];
}

// produces information derived from ast parser with information on a per fetch request basis
export interface astFetch {}

// produces information derived from ast parser with information on a per endpoint basis
export interface astEndpoint {}
export interface pathFileObj {
  path: string[];
  file: FileObj;
}