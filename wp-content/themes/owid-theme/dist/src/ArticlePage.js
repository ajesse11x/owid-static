"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings = require("./settings");
var React = require("react");
var SiteHeader_1 = require("./SiteHeader");
var SiteFooter_1 = require("./SiteFooter");
var cheerio = require("cheerio");
function rewriteHtml(html) {
    var $ = cheerio.load(html);
    // Replace grapher iframes with iframeless embedding figure elements
    $("iframe").each(function (_, el) {
        var src = el.attribs['src'] || "";
        if (src.match(/\/grapher\//)) {
            $(el).replaceWith("<figure data-grapher-src=\"" + src.replace(/.*(?=\/grapher\/)/, '') + "\"/>");
        }
    });
    return $.html();
}
exports.ArticlePage = function (props) {
    var page = props.page;
    var contentHtml = rewriteHtml(page.content);
    return React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("link", { rel: "stylesheet", href: settings.STATIC_ROOT + "/css/owid.css" })),
        React.createElement("body", null,
            React.createElement(SiteHeader_1.SiteHeader, null),
            React.createElement("main", { id: "main", className: "site-main" },
                React.createElement("div", { className: "page-with-sidebar clearfix" },
                    React.createElement("div", { className: "entry-sidebar" },
                        React.createElement("nav", { className: "entry-toc" })),
                    React.createElement("article", { className: "page" },
                        React.createElement("header", { className: "article-header" },
                            React.createElement("h1", { className: "entry-title" }, page.title)),
                        React.createElement("div", { className: "article-content", dangerouslySetInnerHTML: { __html: contentHtml } })))),
            React.createElement(SiteFooter_1.SiteFooter, null)));
};
//# sourceMappingURL=ArticlePage.js.map