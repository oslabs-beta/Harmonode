const babelParser = require('@babel/parser');
const trav = require('@babel/traverse').default;

import find from '..ast/importsFinder';
import {Breadcrumb} from './Breadcrumb';

const routerParser = (codeString, fileName) => {
  const ast = babelParser.parse(codeString, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  const routerObj = {routerEndPoints: []};
  const paths = [];
  const importedRoutes = find(ast);

  const findOriginalVal = (variable) => {
    if (
      variable in importedRoutes &&
      typeof importedRoutes[variable] === 'string'
    )
      return importedRoutes[variable];
    return 'deadEnd';
  };

  trav(ast, {
    enter(path) {
      let current = path.node;
      let isMethodCall =
        current.type === 'CallExpression' &&
        current.callee.type === 'MemberExpression';
      let isGet = isMethodCall && current.callee.property.name === 'get';
      let isPost = isMethodCall && current.callee.property.name === 'post';
      if (isGet) {
        if (current.arguments[0].value) {
          let breadcrumb = new Breadcrumb()
            .fileName(fileName)
            .path(current.arguments[0].value)
            .method('get');
          routerObj.routerEndPoints.push(current.arguments[0].value);
          if (
            current.arguments[1] &&
            current.arguments[1].type === 'Identifier'
          ) {
            const nextInLine = current.arguments[1];
            breadcrumb.nextFile(findOriginalVal(nextInLine.name));
          }
          paths.push();
        }
      } else if (isPost) {
        if (current.arguments[0].value) {
          routerObj.routerEndPoints.push();
        }
      }
    },
  });

  return routerObj;
};

export default routerParser;
