"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings = require("../settings");
var React = require("react");
var SiteHeader_1 = require("./SiteHeader");
var SiteFooter_1 = require("./SiteFooter");
var formatting_1 = require("../formatting");
exports.PostPage = function (props) {
    var entries = props.entries, page = props.page;
    var _a = formatting_1.formatContent(page.content), footnotes = _a.footnotes, html = _a.html;
    var authorsText = formatting_1.formatAuthors(page.authors);
    return React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("link", { rel: "stylesheet", href: settings.STATIC_ROOT + "/css/owid.css" })),
        React.createElement("body", null,
            React.createElement(SiteHeader_1.SiteHeader, { entries: entries }),
            React.createElement("main", { id: "main", className: "site-main" },
                React.createElement("div", { className: "page-with-sidebar clearfix" },
                    React.createElement("div", { className: "entry-sidebar" },
                        React.createElement("nav", { className: "entry-toc" })),
                    React.createElement("article", { className: "page" },
                        React.createElement("header", { className: "article-header" },
                            React.createElement("h1", { className: "entry-title" }, page.title),
                            React.createElement("div", { className: "authors-byline" },
                                React.createElement("a", { href: "/about/#the-team" },
                                    "by ",
                                    authorsText))),
                        React.createElement("div", { className: "article-content", dangerouslySetInnerHTML: { __html: html } }),
                        React.createElement("footer", { className: "article-footer" },
                            React.createElement("h2", { id: "footnotes" }, "Footnotes"),
                            React.createElement("ol", { className: "side-matter side-matter-list", style: { 'list-style-type': 'decimal', opacity: 1 } }, footnotes.map(function (footnote, i) {
                                return React.createElement("li", { id: "note-" + (i + 1), className: "side-matter side-matter-note", style: { 'margin-top': '0px' } },
                                    React.createElement("div", { className: "side-matter side-matter-text" },
                                        React.createElement("p", { dangerouslySetInnerHTML: { __html: footnote } })));
                            })))))),
            React.createElement(SiteFooter_1.SiteFooter, null)));
};
//# sourceMappingURL=PostPage.js.map