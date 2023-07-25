// Import the required babel libraries
const babelParser = require('@babel/parser');
const trav = require('@babel/traverse').default;

// Function to parse the provided code string to fetch all URLs
const fetchParser = (codeString) => {
  // Parse the code string into an AST (Abstract Syntax Tree)
  const ast = babelParser.parse(codeString, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  // List to store all fetched URLs
  const urlsList = [];

  // List to store all variables scoped within the function
  const allScopedVars = [];
  // Traverse the AST to collect all scoped variables
  trav(ast, {
    enter(path) {
      // If node is a variable declarator and has an identifier and initializer
      if (
        path.node.type === 'VariableDeclarator' &&
        path.node.id &&
        path.node.init
      ) {
        // If the init node is an identifier
        if (path.node.init.type === 'Identifier') {
          if (path.node.id.name)
            // Store the name and value of the scoped variable
            allScopedVars[path.node.id.name] = {
              assignedVar: path.node.init.name,
            };
        } else if (path.node.id.name)
          // Else, directly store the value of the variable
          allScopedVars[path.node.id.name] = path.node.init.value;
      }
    },
  });

  // Function to get the original value of a variable
  const findOriginalVal = (variable) => {
    if (
      variable in allScopedVars &&
      typeof allScopedVars[variable] === 'string'
    )
      // If the variable exists and its value is a string, return it
      return allScopedVars[variable];

    // Else, recursively find the original value
    return findOriginalVal(allScopedVars[variable].assignedVar);
  };

  // Traverse the AST again to collect all fetch calls
  trav(ast, {
    enter(path) {
      // Check if node is a fetch call
      const isFetchCall =
        path.node.type === 'CallExpression' &&
        path.node.callee?.name === 'fetch';

      if (isFetchCall) {
        // Fetch the argument of the fetch call
        const fetchArg = path.node.arguments[0];
        let fetchObj = {};

        if (path.node.arguments.length > 1) {
          fetchObj = getFetchDetails(path.node.arguments[1].properties, path);
        }
        // console.log(fetchObj);
        if (path.node.arguments.length === 1) fetchObj.method = 'GET';
        // Handle different types of arguments
        if (fetchArg.type === 'StringLiteral') {
          fetchObj['path'] = handleStringLiteral(fetchArg);
        } else if (fetchArg.type === 'TemplateLiteral') {
          fetchObj['path'] = handleTemplateLiteral(fetchArg);
        } else if (fetchArg.type === 'Identifier') {
          fetchObj['path'] = handleIdentifier(fetchArg, findOriginalVal);
        }
        urlsList.push(fetchObj);
      }
    },
  });

  // Return the list of URLs
  return urlsList;
};

// Function to handle string literals in fetch arguments
function handleStringLiteral(fetchArg) {
  // If the argument has a value, add it to the list of URLs
  if (fetchArg.value) {
    return fetchArg.value;
  }
}

// Function to handle template literals in fetch arguments
function handleTemplateLiteral(fetchArg) {
  // If the argument has a raw value, add it to the list of URLs
  const rawValue = fetchArg.quasis?.[0]?.value?.raw;
  if (rawValue !== null) {
    return rawValue;
  }
}

// Function to handle identifiers in fetch arguments
function handleIdentifier(fetchArg, findOriginalVal) {
  // If the argument has an original value, add it to the list of URLs
  const originalValue = findOriginalVal(fetchArg.name);
  if (originalValue !== null) {
    return originalValue;
  }
}

function getFetchDetails(properties, path) {
  const details = {};
  for (const property of properties) {
    if (property.key.name == 'method') {
      details['method'] = property.value.value;
    }
    if (property.key.name.toLowerCase() === 'headers') {
      details['headers'] = getFetchHeaders(property.value.properties);
    }
    if (property.key.name == 'body') {
      details['body'] = getFetchBody(property.value, path);
    }
  }
  // default to get if there is no method specified
  if (!details.hasOwnProperty('method')) details['method'] = 'GET';
  return details;
}

function getFetchHeaders(properties) {
  const headers = {};
  for (const property of properties) {
    if (property.key.value.toLowerCase() === 'content-type')
      headers.contentType = property.value.value;
  }
  return headers;
}

function getFetchBody(body, path) {
  let bodyDetails = {stringified: false};
  // if the data is being stringified before being sent
  if (body.type === 'CallExpression') {
    if (
      body.callee.object.name === 'JSON' &&
      body.callee.property.name === 'stringify'
    ) {
      const argument = body.arguments[0].name;
      const binding = path.scope.getBinding(argument);
      if (binding && binding.path.node.init.type === 'ObjectExpression') {
        const properties = binding.path.node.init.properties;
        bodyDetails.data = properties.map((prop) => ({
          key: prop.key.name,
          value: prop.value.value,
        }));
      }
      bodyDetails.stringified = true;
    }
  } else if (body.type === 'Identifier') {
    // if the body field is assigned an Identifier directly
    const argument = body.name;
    const binding = path.scope.getBinding(argument);
    if (binding && binding.path.node.init.type === 'ObjectExpression') {
      const properties = binding.path.node.init.properties;
      bodyDetails.data = properties.map((prop) => ({
        key: prop.key.name,
        value: prop.value.value,
      }));
    }
  } else {
    bodyDetails.data = body.value;
  }
  // console.log(bodyDetails);
  return bodyDetails;
}

const code = `
import React, { useEffect } from "react";

function AsyncCall() {
  const [harmodevs, setHarmodevs] = useState([]);
  // let data = {user: 'test', password: 'test'}

  useEffect(() => {
    const getDevs = async () => {
      const data = {user: 'bob', password: 'bob123', email: 'bob@bob.com'}
      const reply = await fetch("http://localhost:3000/harmodevs", {
        method: 'POST', 
        mode: "cors", 
        headers: {
        "Content-Type": "application/json",
        }, 
        body: 1
      });
      const parsedList = await reply.json();
      if (parsedList.length > 0) setHarmodevs(parsedList);
    };
    
    const getCoolStuff = async () => {
      const reply = await fetch("http://localhost:3000/cool_stuff");
      const parsedList2 = await reply.json();
      if (parsedList2.length > 0) console.log(parsedList2);
    };

    getDevs();
    getCoolStuff();
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/harmodevious")
      .then((res) => res.json())
      .then((list) => setHarmodevs(list));
  }, []);

  return <div>AsyncCall</div>;
}

export default AsyncCall;
`;

/*
Example return from code snippet above
[
  {
    method: 'POST',
    headers: { contentType: 'application/json' },
    body: { stringified: false, data: 1 },
    path: 'http://localhost:3000/harmodevs'
  },
  { method: 'GET', path: 'http://localhost:3000/cool_stuff' },
  { method: 'GET', path: 'http://localhost:3000/harmodevious' }
]

*/

// console.log(fetchParser(code));
export default fetchParser;
