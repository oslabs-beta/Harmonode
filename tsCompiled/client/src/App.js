"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_1 = require("react-router");
const ProjectsPage_1 = __importDefault(require("./pages/Projects/ProjectsPage"));
const App = () => {
    const navigate = (0, react_router_1.useNavigate)();
    function navClick(path) {
        navigate(path);
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_router_1.Routes, null,
            react_1.default.createElement(react_router_1.Route, { path: '/projects', element: react_1.default.createElement(ProjectsPage_1.default, null) })),
        react_1.default.createElement("button", { onClick: () => navClick('/projects') }, "Projects Page")));
};
exports.default = App;
//# sourceMappingURL=App.js.map