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

        // Handle different types of arguments
        if (fetchArg.type === 'StringLiteral') {
          handleStringLiteral(fetchArg, urlsList);
        } else if (fetchArg.type === 'TemplateLiteral') {
          handleTemplateLiteral(fetchArg, urlsList);
        } else if (fetchArg.type === 'Identifier') {
          handleIdentifier(fetchArg, urlsList, findOriginalVal);
        }
      }
    },
  });

  // Function to handle string literals in fetch arguments
  function handleStringLiteral(fetchArg, urlsList) {
    // If the argument has a value, add it to the list of URLs
    if (fetchArg.value) {
      urlsList.push(fetchArg.value);
    }
  }

  // Function to handle template literals in fetch arguments
  function handleTemplateLiteral(fetchArg, urlsList) {
    // If the argument has a raw value, add it to the list of URLs
    const rawValue = fetchArg.quasis?.[0]?.value?.raw;
    if (rawValue !== null) {
      urlsList.push(rawValue);
    }
  }

  // Function to handle identifiers in fetch arguments
  function handleIdentifier(fetchArg, urlsList, findOriginalVal) {
    // If the argument has an original value, add it to the list of URLs
    const originalValue = findOriginalVal(fetchArg.name);
    if (originalValue !== null) {
      urlsList.push(originalValue);
    }
  }

  // Return the list of URLs
  return urlsList;
};

export default fetchParser;
