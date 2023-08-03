const babelParser = require("@babel/parser");
const trav = require("@babel/traverse").default;

import find from "./importsFinder";

const routerParser = (codeString) => {
  const ast = babelParser.parse(codeString, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  const routerObj = { routerEndPoints: [] };
  const routerEnds = [];

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
      let isMethodCall =
        current.type === "CallExpression" &&
        current.callee.type === "MemberExpression";
      let isGet = isMethodCall && current.callee.property.name === "get";
      let isPost = isMethodCall && current.callee.property.name === "post";
      if (isGet) {
        if (current.arguments[0].value) {
          routerObj.routerEndPoints.push(current.arguments[0].value);
          if (
            current.arguments[1] &&
            current.arguments[1].type === "Identifier"
          ) {
            const nextInLine = current.arguments[1];
            routerObj[nextInLine.name] = findOriginalVal(nextInLine.name);
          }
        }
      }
    },
  });

  return routerObj;
};

export default routerParser;
