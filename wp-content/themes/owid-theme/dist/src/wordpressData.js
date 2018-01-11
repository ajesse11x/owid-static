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
var wpdb_1 = require("./wpdb");
var entities_1 = require("entities");
// Retrieve a map of post ids to authors
function getAuthorship() {
    return __awaiter(this, void 0, void 0, function () {
        var authorRows, authorship, _i, authorRows_1, row, authors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wpdb_1.wpdb.query("\n        SELECT object_id, terms.description FROM wp_term_relationships AS rels\n        LEFT JOIN wp_term_taxonomy AS terms ON terms.term_taxonomy_id=rels.term_taxonomy_id \n        WHERE terms.taxonomy='author'\n    ")];
                case 1:
                    authorRows = _a.sent();
                    authorship = new Map();
                    for (_i = 0, authorRows_1 = authorRows; _i < authorRows_1.length; _i++) {
                        row = authorRows_1[_i];
                        authors = authorship.get(row.object_id);
                        if (!authors) {
                            authors = [];
                            authorship.set(row.object_id, authors);
                        }
                        authors.push(row.description.split(" ").slice(0, 2).join(" "));
                    }
                    return [2 /*return*/, authorship];
            }
        });
    });
}
exports.getAuthorship = getAuthorship;
// Retrieve a list of categories and their associated entries
function getEntriesByCategory() {
    return __awaiter(this, void 0, void 0, function () {
        var categoryOrder, categoriesByPageId, rows, _i, rows_1, row, cats, pageRows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryOrder = [
                        "Population",
                        "Health",
                        "Food",
                        "Energy",
                        "Environment",
                        "Technology",
                        "Growth &amp; Inequality",
                        "Work &amp; Life",
                        "Public Sector",
                        "Global Connections",
                        "War &amp; Peace",
                        "Politics",
                        "Violence &amp; Rights",
                        "Education",
                        "Media",
                        "Culture"
                    ];
                    categoriesByPageId = new Map();
                    return [4 /*yield*/, wpdb_1.wpdb.query("\n        SELECT object_id, terms.name FROM wp_term_relationships AS rels\n        LEFT JOIN wp_terms AS terms ON terms.term_id=rels.term_taxonomy_id\n    ")];
                case 1:
                    rows = _a.sent();
                    for (_i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                        row = rows_1[_i];
                        cats = categoriesByPageId.get(row.object_id);
                        if (!cats) {
                            cats = [];
                            categoriesByPageId.set(row.object_id, cats);
                        }
                        cats.push(row.name);
                    }
                    return [4 /*yield*/, wpdb_1.wpdb.query("\n        SELECT posts.ID, post_title, post_date, post_name, perma.meta_value AS custom_permalink, star.meta_value AS starred FROM wp_posts AS posts\n        LEFT JOIN wp_postmeta AS perma ON perma.post_id=ID AND perma.meta_key='custom_permalink'\n        LEFT JOIN wp_postmeta AS star ON star.post_id=ID AND star.meta_key='_ino_star'\n        WHERE posts.post_type='page' AND posts.post_status='publish' ORDER BY posts.menu_order ASC\n    ")];
                case 2:
                    pageRows = _a.sent();
                    return [2 /*return*/, categoryOrder.map(function (cat) {
                            var rows = pageRows.filter(function (row) {
                                var cats = categoriesByPageId.get(row.ID);
                                return cats && cats.indexOf(cat) !== -1;
                            });
                            var entries = rows.map(function (row) {
                                return {
                                    slug: row.custom_permalink || row.post_name,
                                    title: row.post_title,
                                    starred: row.starred == "1"
                                };
                            });
                            return {
                                name: entities_1.decodeHTML(cat),
                                entries: entries
                            };
                        })];
            }
        });
    });
}
exports.getEntriesByCategory = getEntriesByCategory;
function getCustomPermalinks() {
    return __awaiter(this, void 0, void 0, function () {
        var rows, permalinks, _i, rows_2, row;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wpdb_1.wpdb.query("SELECT post_id, meta_value FROM wp_postmeta WHERE meta_key='custom_permalink'")];
                case 1:
                    rows = _a.sent();
                    permalinks = new Map();
                    for (_i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
                        row = rows_2[_i];
                        permalinks.set(row.post_id, row.meta_value);
                    }
                    return [2 /*return*/, permalinks];
            }
        });
    });
}
exports.getCustomPermalinks = getCustomPermalinks;
//# sourceMappingURL=wordpressData.js.map