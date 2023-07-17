"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import all components here
const react_pro_sidebar_1 = require("react-pro-sidebar");
const LandingPage_1 = __importDefault(require("./pages/LandingPage/LandingPage"));
const Sidebar_1 = __importDefault(require("./components/Sidebar"));
const App = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(LandingPage_1.default, null),
        react_1.default.createElement(Sidebar_1.default, null)));
};
exports.default = App;
//# sourceMappingURL=App.js.map