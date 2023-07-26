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
import {getPathArray} from './pathUtils';

// module that creates the component object that will be sent to the front end

export default function createComponentObject(codeFiles, serverPath) {
  // the basic structure of the data object we use to drive everything in harmonode
  const componentObj: astRoot = {
    fetches: [] as astFetch[],
    endpoints: [] as astEndpoint[],
    fetchFiles: [] as astFetchFile[],
    endpointFiles: [] as astEndpointFile[],
  };

  // call the helper function to push the data we need to into our component object
  pushFilesToCompObj(codeFiles, componentObj, serverPath);
  createFetchArray(componentObj);
  // this will be the object we eventually return to the front end
  return componentObj;
}

function pushFilesToCompObj(codeFiles, componentObj, serverPath) {
  const fetchPaths = {};
  const allPathArrays: Array<Array<string>> = [];
  for (const file of codeFiles) {
    allPathArrays.push(getPathArray(file.fullPath, serverPath));
    // if it's the server path, let's load the server stuff into an ast
    if (file.fullPath === serverPath) {
      // get the AST for the server
      const serverObj = endpointParse(file.contents);
      const parsedEndpointsArray = serverObj.serverEndPoints;
      const endpointsArray = parsedEndpointsArray.map((endpoint) => {
        return {
          path: endpoint,
          id: uuid(),
        };
      });
      if (parsedEndpointsArray.length > 0) {
        componentObj.endpointFiles.push({
          fileName: file.fileName,
          fullPath: file.fullPath,
          filePath: file.filePath,
          id: uuid(),
          lastUpdated: file.mDate,
          isServer: true,
          endpoints: endpointsArray,
        });

        componentObj.fromImports = serverObj;
      }

      continue; // skip the rest since we have what we need
    }
    // getting the AST for fetches
    const parsedFetchesArray = fetchParser(file.contents);
    const fetchesArray = parsedFetchesArray.map((fetch) => {
      const fetchStore = `${fetch.path}-${fetch.method}`;
      if (!fetchPaths.hasOwnProperty(fetchStore)) {
        fetchPaths[fetchStore] = {
          ...fetch,
          path: getEndpoint(fetch.path),
          id: uuid(),
        };
      }

      return fetchPaths[fetchStore];
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

function createFetchArray(componentObj) {
  const fetches = {};
  for (const fetchFile of componentObj.fetchFiles) {
    for (const fetch of fetchFile.fetches) {
      const fetchStore = `${fetch.path}-${fetch.method}`;
      console.log(fetches[fetchStore]);
      if (!fetches.hasOwnProperty(fetchStore)) {
        fetches[fetchStore] = {
          ...fetch,
          files: [fetchFile.fileName],
        };
      } else {
        fetches[fetchStore] = {
          ...fetches[fetchStore],
          files: fetches[fetchStore].files.concat(fetchFile.fileName),
        };
      }
      componentObj.fetches.push(fetches[fetchStore]);
    }
  }
  console.log(JSON.stringify(componentObj));
}

// URL Sanitizing functions for fetch request URL's to extract the endpoints
function isLocalHost(url) {
  const localHostPatterns = [
    /^localhost(:\d+)?$/,
    /^127\.0\.0\.1(:\d+)?$/,
    /^(\d{1,3}\.){3}\d{1,3}(:\d+)?$/, // Match IP addresses like 192.168.1.1:3000
  ];

  return localHostPatterns.some((pattern) => pattern.test(url));
}

function getEndpoint(url) {
  if (typeof url !== 'string') return 'unknownurl';
  // Check if the URL starts with 'http' or '/' to determine if it's a non-local URL or just a path
  if (!url.startsWith('http') && !url.startsWith('/')) {
    if (isLocalHost(url.split('/')[0])) {
      // It's a local URL without the protocol
      // Extract the endpoint by removing the domain and protocol from the URL
      const urlParts = url.split('/');
      return `/${urlParts.slice(1).join('/')}`;
    }
    // It's just a path, return it as is
    return url;
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
