const {parse} = require('@babel/parser');
const generate = require('@babel/generator').default;
const trav = require('@babel/traverse').default;

const input = `
const express = require('express');
const fetch = require('node-fetch');
const app = express();
let data = {user: 'WRONG USER', role: 'WRONG ROLE'}
app.listen(3000, (data) => {
  //data = {user: 'RIGHT USER', role: 'RIGHT ROLE'}
  fetch('http://localhost:3000/harmodevs', {
    method: 'POST',
    headers: { contentType: 'application/json' },
    body: {user: 'RIGHT USER', role: 'RIGHT ROLE'}
  });
  fetch('http://localhost:3000/cool_stuff');
  fetch('http://localhost:3000/harmodevious');
});
`;

function fetchParser(input) {
  // Parse the input to an Abstract Syntax Tree (AST)
  const ast = parse(input, {
    sourceType: 'module',
    plugins: ['jsx', 'flow'],
  });

  // Create an object to hold all variables in scope
  const allScopedVars = {};

  // Container for parsed fetch calls
  const fetchCalls = [];

  // Traverse the AST
  trav(ast, {
    enter(path) {
      // Check for assignment expressions and store the variable to allScopedVars
      if (
        path.node.type === 'AssignmentExpression' &&
        path.node.left &&
        path.node.right
      ) {
        if (path.node.left.type === 'Identifier') {
          allScopedVars[path.node.left.name] = path.node.right;
        }
      }

      // Check for variable declarations and store the variable to allScopedVars
      if (
        path.node.type === 'VariableDeclarator' &&
        path.node.id &&
        path.node.init
      ) {
        allScopedVars[path.node.id.name] = path.node.init;
      }
    },
  });

  // Function to retrieve the body of a fetch request
  function getFetchBody(body, path) {
    const bodyDetails = {stringified: false, keys: []};
    if (body.type === 'CallExpression') {
      if (
        body.callee.object.name === 'JSON' &&
        body.callee.property.name === 'stringify'
      ) {
        const argument = body.arguments[0];
        if (argument.type === 'Identifier') {
          const originalValue = allScopedVars[argument.name];
          if (typeof originalValue === 'object' && originalValue.properties) {
            const properties = originalValue.properties;
            properties.forEach((prop) => bodyDetails.keys.push(prop.key.name));
            bodyDetails.stringified = true;
          }
        }
      }
    } else if (body.type === 'Identifier') {
      const originalValue = allScopedVars[body.name];
      if (typeof originalValue === 'object' && originalValue.properties) {
        const properties = originalValue.properties;
        properties.forEach((prop) => bodyDetails.keys.push(prop.key.name));
        bodyDetails.stringified = false;
      }
    } else if (body.type === 'ObjectExpression') {
      body.properties.forEach((prop) => {
        bodyDetails.keys.push(prop.key.name);
      });
    }
    return bodyDetails;
  }

  // Second pass through the AST
  trav(ast, {
    enter(path) {
      if (
        path.node.type === 'CallExpression' &&
        path.node.callee.name === 'fetch'
      ) {
        // Get the URL of the fetch call
        const fetchUrl = generate(path.node.arguments[0]).code.replace(
          /['"]+/g,
          ''
        );
        const fetchOptions = path.node.arguments[1];

        if (fetchOptions) {
          // Get the method of the fetch call
          const methodProp = fetchOptions.properties.find(
            (p) => p.key.name === 'method'
          );
          const method = methodProp
            ? generate(methodProp.value).code.replace(/['"]+/g, '')
            : 'GET';
          // Get the body of the fetch call
          const bodyProp = fetchOptions.properties.find(
            (p) => p.key.name === 'body'
          );
          const body = bodyProp ? getFetchBody(bodyProp.value) : null;

          // Push the method, URL, and body of the fetch call to the fetchCalls array
          fetchCalls.push({
            method,
            path: fetchUrl,
            body,
          });
        } else {
          // If the fetch call has no options, push the method and URL to the fetchCalls array
          fetchCalls.push({
            method: 'GET',
            path: fetchUrl,
          });
        }
      }
    },
  });

  // Return the array of parsed fetch calls
  return fetchCalls;
}

export default fetchParser;
