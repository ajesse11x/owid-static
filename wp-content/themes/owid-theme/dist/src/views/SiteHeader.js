"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.SiteHeader = function (props) {
    var entries = props.entries;
    return React.createElement("header", { className: "SiteHeader" },
        React.createElement("nav", { id: "owid-topbar" },
            React.createElement("ul", { className: "desktop right" },
                React.createElement("li", null,
                    React.createElement("form", { id: "search-nav", action: "https://google.com/search", method: "GET" },
                        React.createElement("input", { type: "hidden", name: "sitesearch", value: "ourworldindata.org" }),
                        React.createElement("input", { type: "search", name: "q", placeholder: "Search..." }),
                        React.createElement("button", { type: "submit" },
                            React.createElement("i", { className: "fa fa-search" })))),
                React.createElement("li", null,
                    React.createElement("a", { href: "/blog" }, "Blog")),
                React.createElement("li", null,
                    React.createElement("a", { href: "/about" }, "About")),
                React.createElement("li", null,
                    React.createElement("a", { href: "/support" }, "Donate"))),
            React.createElement("h1", { id: "owid-title" },
                React.createElement("a", { href: "/" },
                    React.createElement("span", null, "Our World in Data"))),
            React.createElement("ul", { className: "mobile right" },
                React.createElement("li", { className: "nav-button" },
                    React.createElement("a", { href: "/search", "data-expand": "#search-dropdown" },
                        React.createElement("i", { className: 'fa fa-search' }))),
                React.createElement("li", { className: "nav-button" },
                    React.createElement("a", { href: "/data", "data-expand": "#topics-dropdown", className: 'mobile' },
                        React.createElement("i", { className: 'fa fa-bars' }))))),
        React.createElement("div", { id: "topics-dropdown", className: "mobile" },
            React.createElement("ul", null,
                React.createElement("li", { className: "header" },
                    React.createElement("h2", null, "Entries")),
                entries.map(function (category) {
                    return React.createElement("li", { className: "category" },
                        React.createElement("a", { href: "/#" + category.slug },
                            React.createElement("span", null, category.name)),
                        React.createElement("div", { className: "subcategory-menu" },
                            React.createElement("div", { className: "submenu-title" }, category.name),
                            React.createElement("ul", null, category.entries.map(function (entry) {
                                return React.createElement("li", null,
                                    React.createElement("a", { className: entry.starred ? "starred" : undefined, href: "/" + entry.slug }, entry.title));
                            }))));
                }),
                React.createElement("li", { className: 'end-link' },
                    React.createElement("a", { href: '/about' }, "About")),
                React.createElement("li", { className: 'end-link' },
                    React.createElement("a", { href: '/support' }, "Donate")),
                React.createElement("li", { className: 'end-link' },
                    React.createElement("a", { href: '/data' }, "Browse All")))),
        React.createElement("div", { id: "search-dropdown", className: "mobile" },
            React.createElement("form", { id: "search-nav", action: "https://google.com/search", method: "GET" },
                React.createElement("input", { type: "hidden", name: "sitesearch", value: "ourworldindata.org" }),
                React.createElement("input", { type: "search", name: "q", placeholder: "Search..." }),
                React.createElement("button", { type: "submit" },
                    React.createElement("i", { className: "fa fa-search" })))),
        React.createElement("div", { id: "category-nav", className: "desktop" },
            React.createElement("ul", null, entries.map(function (category) {
                return React.createElement("li", { className: "category", title: category.name },
                    React.createElement("a", { href: "/#" + category.slug },
                        React.createElement("span", null, category.name)),
                    React.createElement("ul", { className: "entries" },
                        React.createElement("li", null,
                            React.createElement("hr", null)),
                        category.entries.map(function (entry) {
                            return React.createElement("li", null,
                                React.createElement("a", { className: entry.starred ? "starred" : undefined, href: "/" + entry.slug }, entry.title));
                        })));
            }))),
        React.createElement("div", { id: "entries-nav", className: "desktop" }));
};
//# sourceMappingURL=SiteHeader.js.map