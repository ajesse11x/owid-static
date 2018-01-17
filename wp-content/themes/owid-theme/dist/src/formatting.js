"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require("cheerio");
var urlSlug = require('url-slug');
var wpautop = require('wpautop');
var lodash_1 = require("lodash");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var settings_1 = require("./settings");
var wpdb_1 = require("./wpdb");
var Tablepress_1 = require("./views/Tablepress");
function romanize(num) {
    if (!+num)
        return "";
    var digits = String(+num).split(""), key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
        "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], roman = "", i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}
function formatPost(post, grapherExports) {
    return __awaiter(this, void 0, void 0, function () {
        var html, footnotes, tables, $, grapherIframes, _i, grapherIframes_1, el, src, chart, output, _a, _b, el, hasToc, openHeadingIndex, openSubheadingIndex, tocHeadings;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    html = post.content;
                    footnotes = [];
                    html = html.replace(/\[ref\]([\s\S]*?)\[\/ref\]/gm, function (_, footnote) {
                        footnotes.push(footnote);
                        var i = footnotes.length;
                        return "<a id=\"ref-" + i + "\" class=\"side-matter side-matter-ref\" href=\"#note-" + i + "\"><sup class=\"side-matter side-matter-sup\">" + i + "</sup></a>";
                    });
                    // Replicate wordpress formatting (thank gods there's an npm package)
                    if (!html.match(/<!--raw-->/))
                        html = wpautop(html);
                    // Standardize protocols used in links
                    if (settings_1.HTTPS_ONLY)
                        html = html.replace(new RegExp("http://", 'g'), "https://");
                    else
                        html = html.replace(new RegExp("https://", 'g'), "http://");
                    // Use relative urls wherever possible
                    html = html.replace(new RegExp(settings_1.WORDPRESS_URL, 'g'), "")
                        .replace(new RegExp("https?://ourworldindata.org", 'g'), "");
                    return [4 /*yield*/, wpdb_1.getTables()];
                case 1:
                    tables = _c.sent();
                    html = html.replace(/\[table\s+id=(\d+)\s*\/\]/g, function (match, tableId) {
                        var table = tables.get(tableId);
                        if (table)
                            return ReactDOMServer.renderToStaticMarkup(React.createElement(Tablepress_1.default, { data: table.data }));
                        else
                            return "UNKNOWN TABLE";
                    });
                    // These old things don't work with static generation, link them through to maxroser.com
                    html = html.replace(new RegExp("/wp-content/uploads/nvd3", 'g'), "https://www.maxroser.com/owidUploads/nvd3")
                        .replace(new RegExp("/wp-content/uploads/datamaps", 'g'), "https://www.maxroser.com/owidUploads/datamaps");
                    $ = cheerio.load(html);
                    if (grapherExports) {
                        grapherIframes = $("iframe").toArray().filter(function (el) { return (el.attribs['src'] || '').match(/\/grapher\//); });
                        // Replace grapher iframes with iframeless embedding figure elements
                        for (_i = 0, grapherIframes_1 = grapherIframes; _i < grapherIframes_1.length; _i++) {
                            el = grapherIframes_1[_i];
                            src = el.attribs['src'];
                            chart = grapherExports.get(src);
                            if (chart) {
                                output = "<div class=\"interactivePreview\"><a href=\"" + src + "\" target=\"_blank\"><div><img src=\"" + chart.svgUrl + "\" data-grapher-src=\"" + src + "\"/></div></a></div>";
                                $(el).replaceWith(output);
                            }
                        }
                    }
                    // Make all image links open in new tab
                    for (_a = 0, _b = $("img").toArray(); _a < _b.length; _a++) {
                        el = _b[_a];
                        if (el.parent.tagName === "a") {
                            el.parent.attribs['target'] = '_blank';
                        }
                    }
                    hasToc = post.type === 'page' && post.slug !== 'about';
                    openHeadingIndex = 0;
                    openSubheadingIndex = 0;
                    tocHeadings = [];
                    $("h1, h2, h3, h4").each(function (_, el) {
                        var $heading = $(el);
                        var headingText = $heading.text();
                        // We need both the text and the html because may contain footnote
                        var headingHtml = $heading.html();
                        var slug = urlSlug(headingText);
                        // Table of contents
                        if (hasToc) {
                            if ($heading.is("#footnotes") && footnotes.length > 0) {
                                tocHeadings.push({ text: headingText, slug: "footnotes", isSubheading: false });
                            }
                            else if (!$heading.is('h1') && !$heading.is('h4')) {
                                // Inject numbering into the text as well
                                if ($heading.is('h2')) {
                                    openHeadingIndex += 1;
                                    openSubheadingIndex = 0;
                                }
                                else if ($heading.is('h3')) {
                                    openSubheadingIndex += 1;
                                }
                                if (openHeadingIndex > 0) {
                                    if ($heading.is('h2')) {
                                        headingHtml = romanize(openHeadingIndex) + '. ' + headingHtml;
                                        $heading.html(headingHtml);
                                        tocHeadings.push({ text: $heading.text(), slug: slug, isSubheading: false });
                                    }
                                    else {
                                        headingHtml = romanize(openHeadingIndex) + '.' + openSubheadingIndex + ' ' + headingHtml;
                                        $heading.html(headingHtml);
                                        tocHeadings.push({ text: $heading.text(), slug: slug, isSubheading: true });
                                    }
                                }
                            }
                        }
                        // Deep link
                        $heading.attr('id', slug).prepend("<a class=\"deep-link\" href=\"#" + slug + "\"></a>");
                    });
                    return [2 /*return*/, {
                            id: post.id,
                            type: post.type,
                            slug: post.slug,
                            title: post.title,
                            date: post.date,
                            modifiedDate: post.modifiedDate,
                            authors: post.authors,
                            html: $.html(),
                            footnotes: footnotes,
                            excerpt: post.excerpt || $($("p")[0]).text(),
                            imageUrl: post.imageUrl,
                            tocHeadings: tocHeadings
                        }];
            }
        });
    });
}
exports.formatPost = formatPost;
function formatAuthors(authors) {
    if (authors.indexOf("Max Roser") === -1)
        authors.push("Max Roser");
    var authorsText = authors.slice(0, -1).join(", ");
    if (authorsText.length == 0)
        authorsText = authors[0];
    else
        authorsText += " and " + lodash_1.last(authors);
    return authorsText;
}
exports.formatAuthors = formatAuthors;
function formatDate(date) {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
}
exports.formatDate = formatDate;
//# sourceMappingURL=formatting.js.map