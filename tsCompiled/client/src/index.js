"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const react_router_dom_1 = require("react-router-dom");
const App_1 = __importDefault(require("./App"));
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
(0, react_dom_1.render)(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement(App_1.default, null)), document.getElementById('root'));
//# sourceMappingURL=index.js.map