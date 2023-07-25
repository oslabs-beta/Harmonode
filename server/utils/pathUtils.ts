import * as path from "path";

export const getPathArray = (routeString : string) : string[] => {
  const pathParts : string[] = routeString.split(path.sep);
  const last : string = pathParts[pathParts.length - 1]
  if (last.includes("."))
    pathParts[pathParts.length - 1] = last.slice(0, last.indexOf("."));
  return pathParts;
};
