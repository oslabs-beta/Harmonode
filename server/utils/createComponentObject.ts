import fetchParser from '../ast/clientParser';
import endpointParse from '../ast/serverParser';
import {
  astEndpoint,
  astEndpointFile,
  astFetch,
  astFetchFile,
  astRoot,
} from '../types';
import {v4 as uuid} from 'uuid';

export default function createComponentObject(codeFiles, serverPath) {
  const componentObj: astRoot = {
    fetches: [] as astFetch[],
    endpoints: [] as astEndpoint[],
    fetchFiles: [] as astFetchFile[],
    endpointFiles: [] as astEndpointFile[],
  };

  pushFilesToCompObj(codeFiles, componentObj, serverPath);
  return componentObj;
}

function pushFilesToCompObj(codeFiles, componentObj, serverPath) {
  for (const file of codeFiles) {
    // if it's the server path, let's load the server stuff into an ast
    if (file.fullPath === serverPath) {
      const parsedEndpointsArray = endpointParse(file.contents);
      if (parsedEndpointsArray.length > 0) {
        componentObj.endpointFiles.push({
          fileName: file.fileName,
          fullPath: file.fullPath,
          filePath: file.filePath,
          id: uuid(),
          lastUpdated: file.mDate,
          isServer: true,
          endpoints: parsedEndpointsArray,
        });
      }
      continue; // skip the rest since we have what we need
    }

    const parsedFetchesArray = fetchParser(file.contents);
    const fetchesArray = parsedFetchesArray.map((fetch) => {
      return {path: getEndpoint(fetch), id: uuid()};
    });
    if (parsedFetchesArray.length > 0) {
      componentObj.fetchFiles.push({
        fileName: file.fileName,
        fullPath: file.fullPath,
        filePath: file.filePath,
        id: uuid(),
        lastUpdated: file.mDate,
        fetches: fetchesArray,
      });
    }
  }
}

// URL Sanitizing functions

function isLocalHost(url) {
  const localHostPatterns = [
    /^localhost(:\d+)?$/,
    /^127\.0\.0\.1(:\d+)?$/,
    /^(\d{1,3}\.){3}\d{1,3}(:\d+)?$/, // Match IP addresses like 192.168.1.1:3000
  ];

  return localHostPatterns.some((pattern) => pattern.test(url));
}

function getEndpoint(url) {
  // Check if the URL starts with 'http' or '/' to determine if it's a non-local URL or just a path
  if (!url.startsWith('http') && !url.startsWith('/')) {
    return url; // It's just a path, return it as is
  }

  // Check if the URL is a local URL
  if (isLocalHost(new URL(url).hostname)) {
    // Extract the endpoint by removing the domain and protocol from the URL
    const urlParts = url.split('/');
    return `/${urlParts.slice(3).join('/')}`;
  }

  // It's a non-local URL, return it as is
  return url;
}
