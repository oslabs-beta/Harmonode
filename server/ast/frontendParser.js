import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
const trav = traverse.default;

const harmonodeParser = (codeString) => {
    const ast = parse(codeString);
    const urlsList = [];

    const allScopedVars = [];

    trav(ast, {
        enter(path) {
            if (path.node.type === "VariableDeclarator") {
                if (path.node.init.type === "Identifier") {
                    allScopedVars[path.node.id.name] = {
                        assignedVar: path.node.init.name,
                    };
                } else allScopedVars[path.node.id.name] = path.node.init.value;
            }
        },
    });


    const findOriginalVal = (variable) => {
        if (
            variable in allScopedVars &&
            typeof allScopedVars[variable] === "string"
        )
            return allScopedVars[variable];
        return findOriginalVal(allScopedVars[variable].assignedVar);
    };

    trav(ast, {
        enter(path) {
            if (
                path.node.type === "AwaitExpression" &&
                path.node.argument.callee.name === "fetch"
            ) {
                const fetchArg = path.node.argument.arguments[0];
                if (fetchArg.type === "StringLiteral") {
                    urlsList.push(path.node.argument.arguments[0].value);
                } else
                    urlsList.push(findOriginalVal(path.node.argument.arguments[0].name));
            }
        },
    });

    return urlsList;
};

export default harmonodeParser;
