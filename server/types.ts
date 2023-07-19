export interface FileObj {
  fileName: string;
  filePath: string;
  fullPath: string;
  contents: string;
  mDate?: Date;
}

export interface DirObj {
  fileName: string;
  filePath: string;
}

export interface astRoot {
  fetches: astFetch[];
  endPoints: astEndpoint[];
  fetchFiles: astFetchFile[];
  endpointFiles: astEndpointFile[];
}

export interface astFetchFile {
  fileName: string;
  fullPath: string;
  lastUpdated: Date | undefined;
  fetches: string[];
}

export interface astEndpointFile {}

export interface astFetch {}

export interface astEndpoint {}
