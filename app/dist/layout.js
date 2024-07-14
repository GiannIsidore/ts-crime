"use strict";
exports.__esModule = true;
exports.metadata = void 0;
require("./globals.css");
exports.metadata = {
    title: "CCDB - Login",
    description: "A database of crimes in Kauswagan, Cagayan de Oro City.",
    icons: {
        icon: "/cdb.svg"
    }
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", null, children)));
}
exports["default"] = RootLayout;
