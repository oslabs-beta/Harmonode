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
  endPoints: astEndpoint[];
  fetchFiles: astFetchFile[];
  endpointFiles: astEndpointFile[];
}

// produces information from ast parser with information on a per file basis for fetch requests
export interface astFetchFile {
  fileName: string;
  fullPath: string;
  lastUpdated: Date | undefined;
  fetches: string[];
}

// produces information from ast parser with information on a per file basis for endpoint details
export interface astEndpointFile {}

// produces information derived from ast parser with information on a per fetch request basis
export interface astFetch {}

// produces information derived from ast parser with information on a per endpoint basis
export interface astEndpoint {}
