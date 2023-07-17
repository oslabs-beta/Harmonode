"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const HomeOutlined_1 = __importDefault(require("@mui/icons-material/HomeOutlined"));
const react_pro_sidebar_1 = require("react-pro-sidebar");
function NavBar() {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_pro_sidebar_1.Sidebar, null,
            react_1.default.createElement(react_pro_sidebar_1.Menu, null,
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(HomeOutlined_1.default, null) }, "Dashboard"),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, null, "Projects"),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, null, "List"),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, null, "Diagram"),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, null, "Settings")))));
}
exports.default = NavBar;
//# sourceMappingURL=Sidebar.js.map