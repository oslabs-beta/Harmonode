const babelParser = require("@babel/parser");
const trav = require("@babel/traverse").default;

import { Breadcrumb } from "./Breadcrumb";
import find from "./importsFinder";

const endpointParse = (codeString, fileName) => {
  const ast = babelParser.parse(codeString, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  // array of arrays. Each path is an array with one beginning element
  const paths = [];

  const importedRoutes = find(ast);

  const findOriginalVal = (variable) => {
    if (
      variable in importedRoutes &&
      typeof importedRoutes[variable] === "string"
    )
      return importedRoutes[variable];
    return "deadEnd";
  };

  trav(ast, {
    enter(path) {
      let current = path.node;
      if (
        current.type === "CallExpression" &&
        current.callee.type === "MemberExpression" &&
        current.callee.object.name === "app" &&
        current.callee.property.name === "use"
      ) {
        if (current.arguments[0].value) {
          let newTrail = [];
          newTrail.push(
            new Breadcrumb().file(fileName).path(current.arguments[0].value)
          );
          paths.push(newTrail);

          if (
            current.arguments[1] &&
            current.arguments[1].type === "Identifier"
          ) {
            const nextInLine = current.arguments[1];
            routesObj[nextInLine.name] = findOriginalVal(nextInLine.name);
          }
        }
      }
    },
  });

  return routesObj;
};

export default endpointParse;
