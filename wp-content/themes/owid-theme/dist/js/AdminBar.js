"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var AdminBar = function () {
    return React.createElement("div", { id: "wpadminbar" },
        React.createElement("div", { className: "quicklinks", id: "wp-toolbar", role: "navigation", "aria-label": "Toolbar" },
            React.createElement("ul", { id: "wp-admin-bar-root-default", className: "ab-top-menu" },
                React.createElement("li", { id: "wp-admin-bar-site-name", className: "menupop" },
                    React.createElement("a", { className: "ab-item", "aria-haspopup": "true", href: "/wp-admin/" }, "Our World In Data")),
                React.createElement("li", { id: "wp-admin-bar-edit" },
                    React.createElement("a", { className: "ab-item", href: "/wp-admin/post.php?post=<?php echo(the_ID()) ?>&action=edit" }, "Edit Page")))));
};
React.createElement("script", null,
    "if (document.cookie.indexOf('wordpress') != -1 || document.cookie.indexOf('wp-settings') != -1) ",
    $('#wpadminbar').show(),
    "}");
//# sourceMappingURL=AdminBar.js.map