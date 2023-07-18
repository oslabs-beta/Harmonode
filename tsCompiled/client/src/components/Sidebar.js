"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
//import react pro sidebar
const react_pro_sidebar_1 = require("react-pro-sidebar");
//import mui icons for sidebar
const HomeOutlined_1 = __importDefault(require("@mui/icons-material/HomeOutlined"));
const FolderOutlined_1 = __importDefault(require("@mui/icons-material/FolderOutlined"));
const DashboardOutlined_1 = __importDefault(require("@mui/icons-material/DashboardOutlined"));
const ListAltOutlined_1 = __importDefault(require("@mui/icons-material/ListAltOutlined"));
const PolylineOutlined_1 = __importDefault(require("@mui/icons-material/PolylineOutlined"));
const SettingsOutlined_1 = __importDefault(require("@mui/icons-material/SettingsOutlined"));
const KeyboardDoubleArrowRightOutlined_1 = __importDefault(require("@mui/icons-material/KeyboardDoubleArrowRightOutlined"));
const KeyboardDoubleArrowLeftOutlined_1 = __importDefault(require("@mui/icons-material/KeyboardDoubleArrowLeftOutlined"));
function Sidebar() {
    //sidebarCollapse state using useState hook
    const [sidebarCollapse, setSidebarCollapse] = (0, react_1.useState)(false);
    //func that will change sidebarCollapse state from false to true and true to false
    const sidebarIconClick = () => {
        //condition checking to change state from true to false and vice versa
        sidebarCollapse ? setSidebarCollapse(false) : setSidebarCollapse(true);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_pro_sidebar_1.Sidebar, { collapsed: sidebarCollapse },
            react_1.default.createElement("div", { className: 'nametext' },
                react_1.default.createElement("p", null, sidebarCollapse ? 'Hn' : 'Harmonode')),
            react_1.default.createElement("div", { onClick: sidebarIconClick }, sidebarCollapse ? (react_1.default.createElement(KeyboardDoubleArrowRightOutlined_1.default, null)) : (react_1.default.createElement(KeyboardDoubleArrowLeftOutlined_1.default, null))),
            react_1.default.createElement(react_pro_sidebar_1.Menu, null,
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(HomeOutlined_1.default, null) }, "Homne"),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(FolderOutlined_1.default, null) }, " Projects"),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(DashboardOutlined_1.default, null) }, "Dashboard"),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(ListAltOutlined_1.default, null) }, "List"),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(PolylineOutlined_1.default, null) }, "Diagram"),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(SettingsOutlined_1.default, null) }, "Settings")))));
}
exports.default = Sidebar;
//# sourceMappingURL=Sidebar.js.map