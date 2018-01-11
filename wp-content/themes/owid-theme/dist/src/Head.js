"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings = require("./settings");
var React = require("react");
var Head = function (props) {
    var pageTitle = props.pageTitle, pageDesc = props.pageDesc, canonicalUrl = props.canonicalUrl, imageUrl = props.imageUrl;
    return React.createElement("head", null,
        React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
        React.createElement("title", null,
            pageTitle,
            " - Our World in Data"),
        React.createElement("meta", { name: "description", content: pageDesc }),
        React.createElement("link", { rel: "canonical", href: canonicalUrl }),
        React.createElement("meta", { property: "fb:app_id", content: "1149943818390250" }),
        React.createElement("meta", { property: "og:url", content: canonicalUrl }),
        React.createElement("meta", { property: "og:title", content: pageTitle }),
        React.createElement("meta", { property: "og:description", content: pageDesc }),
        React.createElement("meta", { property: "og:image", content: imageUrl }),
        React.createElement("meta", { property: "og:image:width", content: "1200" }),
        React.createElement("meta", { property: "og:image:height", content: "630" }),
        React.createElement("meta", { property: "og:site_name", content: "Our World in Data" }),
        React.createElement("meta", { name: "twitter:card", content: "summary_large_image" }),
        React.createElement("meta", { name: "twitter:site", content: "@OurWorldInData" }),
        React.createElement("meta", { name: "twitter:creator", content: "@OurWorldInData" }),
        React.createElement("meta", { name: "twitter:title", content: pageTitle }),
        React.createElement("meta", { name: "twitter:description", content: pageDesc }),
        React.createElement("meta", { name: "twitter:image", content: imageUrl }),
        React.createElement("link", { rel: "stylesheet", href: settings.STATIC_ROOT + "/owid.css" }));
};
//# sourceMappingURL=Head.js.map