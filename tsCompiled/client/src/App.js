"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_1 = require("react-router");
const ProjectsPage_1 = __importDefault(require("./pages/Projects/ProjectsPage"));
const Sidebar_1 = __importDefault(require("./components/Sidebar"));
require("./styles.css");
const DashboardPage_1 = __importDefault(require("./pages/Dashboard/DashboardPage"));
const ListPage_1 = __importDefault(require("./pages/List/ListPage"));
const DiagramPage_1 = __importDefault(require("./pages/Diagram/DiagramPage"));
const SettingsPage_1 = __importDefault(require("./pages/Settings/SettingsPage"));
const App = () => {
    const navigate = (0, react_router_1.useNavigate)();
    function navClick(path) {
        navigate(path);
    }
    return (react_1.default.createElement("div", { className: 'app' },
        react_1.default.createElement(Sidebar_1.default, null),
        react_1.default.createElement("div", { className: 'content' },
            react_1.default.createElement(react_router_1.Routes, null,
                react_1.default.createElement(react_router_1.Route, { path: '/', element: react_1.default.createElement(react_1.default.Fragment, null, "Home Page") }),
                react_1.default.createElement(react_router_1.Route, { path: '/projects', element: react_1.default.createElement(ProjectsPage_1.default, null) }),
                react_1.default.createElement(react_router_1.Route, { path: '/dash', element: react_1.default.createElement(DashboardPage_1.default, null) }),
                react_1.default.createElement(react_router_1.Route, { path: '/list', element: react_1.default.createElement(ListPage_1.default, null) }),
                react_1.default.createElement(react_router_1.Route, { path: '/diagram', element: react_1.default.createElement(DiagramPage_1.default, null) }),
                react_1.default.createElement(react_router_1.Route, { path: '/settings', element: react_1.default.createElement(SettingsPage_1.default, null) })))));
};
exports.default = App;
//# sourceMappingURL=App.js.map