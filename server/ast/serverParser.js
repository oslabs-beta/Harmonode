const babelParser = require("@babel/parser");
const trav = require("@babel/traverse").default;

const endpointParse = (codeString) => {
  const ast = babelParser.parse(codeString, {
    sourceType: "module",
    plugins: ["jsx"],
  });

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
        if (current.arguments[0].value)
          serverEndPoints.push(current.arguments[0].value);
      }
    },
  });

  return serverEndPoints;
};

export default endpointParse;
