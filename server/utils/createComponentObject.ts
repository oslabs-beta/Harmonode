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
import fullBackEndCreator from './getBackEndObj';

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
  const paths = {};
  const endpoints: any = [];
  const allPathArrays: Array<Array<string>> = [];

  for (const file of codeFiles) {
    // getting the AST for fetches
    allPathArrays.push(getPathArray(file.fullPath, serverPath));
    // if it's the server path, let's load the server stuff into an ast
    if (file.fullPath === serverPath) {
      // get the AST for the server
      const serverObj = endpointParse(file.contents).serverEndPoints.filter(
        (path) => path[0] !== '.'
      );
      const parsedEndpointsArray = serverObj;
      const endpointsArray = parsedEndpointsArray.map((endpoint) => {
        return {
          method: 'GLOBAL',
          path: endpoint,
          id: uuid(),
        };
      });
      // if (parsedEndpointsArray.length > 0) {
      //   componentObj.endpointFiles.push({
      //     fileName: file.fileName,
      //     fullPath: file.fullPath,
      //     filePath: file.filePath,
      //     id: uuid(),
      //     lastUpdated: file.mDate,
      //     isServer: true,
      //     endpoints: endpointsArray,
      //   });
      //   // endpoints.push(...endpointsArray);
      //   componentObj.fromImports = serverObj;
      // }

      continue; // skip the rest since we have what we need
    }
    // getting the AST for fetches
    const parsedFetchesArray = fetchParser(file.contents);
    const fetchesArray = parsedFetchesArray.map((fetch) => {
      const endpoint = getEndpoint(fetch.path);
      const fetchStore = `${endpoint}-${fetch.method}`;
      const idProp = `${endpoint}-id`;
      if (!paths.hasOwnProperty(idProp)) paths[idProp] = uuid();
      if (!paths.hasOwnProperty(fetchStore)) {
        paths[fetchStore] = {
          ...fetch,
          path: getEndpoint(fetch.path),
          id: paths[idProp],
        };
      }
      // endpoints.push(paths[fetchStore]);
      return paths[fetchStore];
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
  const backendCreation = fullBackEndCreator(codeFiles, serverPath);
  const backendRoutes = backendAdd(backendCreation, paths);

  for (const route of backendRoutes) {
    const pathsProp = `${route.path}-${route.method}`;
    const idProp = `${route.path}-id`;
    if (!paths.hasOwnProperty(idProp)) {
      paths[idProp] = uuid();
    }
    if (paths.hasOwnProperty(pathsProp)) {
      paths[pathsProp] = {
        ...paths[pathsProp],
        fullPath: route.fullPath,
        fileName: route.fileName,
        lastUpdated: route.lastUpdated,
      };
    } else {
      paths[pathsProp] = {
        method: route.method,
        path: route.path,
        fileName: route.fileName,
        fullPath: route.fullPath,
        lastUpdated: route.lastUpdated,
        id: paths[idProp],
      };
    }
    endpoints.push(paths[pathsProp]);
  }
  // console.log(endpoints, '!!!!!ENDPOINTS!!!!!!!!');
  componentObj.endpoints.push(...endpoints);
  const endpointFiles: any = [];
  const serverAndEndpoints = [...endpoints];
  const endpointCache: any = {};
  for (const endpoint of serverAndEndpoints) {
    if (endpoint.method !== 'GLOBAL') {
      const idProp = `${endpoint.path}-id`;
      if (!endpointCache.hasOwnProperty(endpoint.fileName)) {
        endpointCache[endpoint.fileName] = {
          fileName: endpoint.fileName,
          fullPath: endpoint.fullPath,
          lastUpdated: endpoint.lastUpdated,
          id: uuid(),
          endpoints: [
            {method: endpoint.method, path: endpoint.path, id: paths[idProp]},
          ],
        };
      } else {
        endpointCache[endpoint.fileName].endpoints.push({
          method: endpoint.method,
          path: endpoint.path,
          id: paths[idProp],
        });
      }
    }
  }
  for (const key of Object.keys(endpointCache)) {
    // console.log(endpointCache[key], '!!!ENDPOINT CACHE!!!!!!');
    endpointFiles.push(endpointCache[key]);
  }
  componentObj.endpointFiles.push(...endpointFiles);
  // console.log(endpoints, '!!!!!ENDPOINTS!!!!!!');
}

function createFetchArray(componentObj) {
  const fetches = {};
  for (const fetchFile of componentObj.fetchFiles) {
    for (const fetch of fetchFile.fetches) {
      const fetchStore = `${fetch.path}-${fetch.method}`;
      if (!fetches.hasOwnProperty(fetchStore)) {
        fetches[fetchStore] = {
          ...fetch,
          files: [{name: fetchFile.fileName, id: fetchFile.id}],
        };
      } else {
        fetches[fetchStore] = {
          ...fetches[fetchStore],
          files: fetches[fetchStore].files.concat({
            name: fetchFile.fileName,
            id: fetchFile.id,
          }),
        };
      }
    }
  }
  for (const key of Object.keys(fetches)) {
    componentObj.fetches.push(fetches[key]);
  }
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
  url = url.replaceAll('`', '').split('?')[0];
  // if creating a url triggers an error, then we know it's missing a '/' at the beginning
  try {
    new URL(url).hostname;
  } catch (error) {
    if (!url.startsWith('/')) url = '/' + url;
  }
  if (!url.startsWith('http') && url.startsWith('/')) {
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

function backendAdd(backendCreation, paths) {
  let pathCache: any = [];

  for (const creation of backendCreation) {
    let method = creation.method === 'USE' ? '' : creation.method;
    const pathArray = creation.fileName.split('.');
    const pathCacheFind = pathCache.find((path) => {
      let nextFile = path.nextFile;
      if (!path.nextFile) return false;
      nextFile = nextFile.split('/');
      nextFile = nextFile[nextFile.length - 1];
      return nextFile === pathArray[0];
    });

    if (pathCacheFind && method) {
      const creationPath = creation.path.endsWith('/')
        ? creation.path.slice(0, creation.path.length - 1)
        : creation.path;

      pathCache.push({...pathCacheFind});

      delete pathCacheFind.nextFile;

      pathCacheFind.path = `${pathCacheFind.path}${creationPath}`;
      pathCacheFind.method = method;
      pathCacheFind.fileName = creation.fileName;
      pathCacheFind.fullPath = creation.fullPath;
      pathCacheFind.lastUpdated = creation.lastUpdated;
    } else {
      const newPathObj: any = {};

      if (creation.nextFile) newPathObj.nextFile = creation.nextFile;
      pathCache.push({
        ...newPathObj,
        path: creation.path,
        method: method,
      });
    }
  }
  return pathCache.filter((path) => path.method != '');
}
