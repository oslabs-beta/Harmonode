import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
const trav = traverse.default;

const endPoints = (codeString) => {
  const ast = parse(codeString);
  const serverEndPoints = [];

  trav(ast, {
    enter(path) {
      let current = path.node;
      if (
        current.type === "CallExpression" &&
        current.callee.type === "MemberExpression" &&
        current.callee.object.name === "app" &&
        current.callee.property.name === "use"
      ) {
        if (current.arguments[0].value) serverEndPoints.push(current.arguments[0].value);
      }
    },
  });

  return serverEndPoints;
};

export default endPoints;