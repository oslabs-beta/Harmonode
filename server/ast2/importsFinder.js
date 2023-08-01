const babelParser = require('@babel/parser');
const trav = require('@babel/traverse').default;

const find = (ast) => {
  const importedRoutes = {};

  trav(ast, {
    enter(path) {
      if (path.node.type === 'VariableDeclarator') {
        if (
          path.node.init.type === 'CallExpression' &&
          path.node.init.callee.name === 'require'
        ) {
          importedRoutes[path.node.id.name] = path.node.init.arguments[0].value;
        }
      }
    },
  });

  return importedRoutes;
};

export default find;
