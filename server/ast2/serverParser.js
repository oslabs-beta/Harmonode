const babelParser = require('@babel/parser');
const trav = require('@babel/traverse').default;

import {Breadcrumb} from './Breadcrumb';
import find from './importsFinder';

const endpointParse = (codeString, fileName, fullPath) => {
  const ast = babelParser.parse(codeString, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  // array of arrays. Each path is an array with one beginning element
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
      if (
        current.type !== 'CallExpression' ||
        current.callee.type !== 'MemberExpression'
      )
        return;

      const methodArray = ['get', 'post', 'put', 'delete', 'patch', 'use'];
      const method = current.callee.property.name;
      if (methodArray.includes(method)) paths.push(routeParse(current, method));
    },
  });

  function routeParse(current, method) {
    if (current.arguments[0].value) {
      let breadcrumb = new Breadcrumb()
        .fileName(fileName)
        .path(current.arguments[0].value)
        .method(method.toUpperCase())
        .fullPath(fullPath);
      if (current.arguments[1] && current.arguments[1].type === 'Identifier') {
        const nextNodeInLine = current.arguments[1];
        breadcrumb.nextFile = findOriginalVal(nextNodeInLine.name);
      }
      return breadcrumb;
    }
  }

  return paths;
};

export default endpointParse;
