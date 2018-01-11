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
var database_1 = require("./database");
var request = require("request-promise");
var fs = require("fs-extra");
var path = require("path");
var glob = require("glob");
var lodash_1 = require("lodash");
var shell = require("shelljs");
var WordpressBaker = /** @class */ (function () {
    function WordpressBaker(props) {
        this.stagedFiles = [];
        this.props = props;
        this.db = database_1.createConnection({ database: props.database });
    }
    WordpressBaker.prototype.bakeRedirects = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, db, props, redirects, rows, outPath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, db = _a.db, props = _a.props;
                        redirects = [
                            "/chart-builder/* /grapher/:splat 301",
                            "/grapher/public/* /grapher/:splat 301",
                            "/grapher/view/* /grapher/:splat 301",
                            "/roser/* https://www.maxroser.com/roser/:splat 302",
                            "/wp-content/uploads/nvd3/* https://www.maxroser.com/owidUploads/nvd3/:splat 302",
                            "/wp-content/uploads/datamaps/* https://www.maxroser.com/owidUploads/datamaps/:splat 302",
                            "/grapher/* https://owid-grapher.netlify.com/grapher/:splat 200",
                            "/mispy/sdgs/* https://owid-sdgs.netlify.com/:splat 302",
                            "/slides/Max_PPT_presentations/* https://www.maxroser.com/slides/Max_PPT_presentations/:splat 302",
                            "/slides/Max_Interactive_Presentations/* https://www.maxroser.com/slides/Max_Interactive_Presentations/:splat 302"
                        ];
                        return [4 /*yield*/, db.query("SELECT url, action_data, action_code FROM wp_redirection_items")];
                    case 1:
                        rows = _b.sent();
                        redirects.push.apply(redirects, rows.map(function (row) { return row.url + " " + row.action_data + " " + row.action_code; }));
                        outPath = path.join(props.outDir, "_redirects");
                        return [4 /*yield*/, fs.writeFile(path.join(props.outDir, "_redirects"), redirects.join("\n"))];
                    case 2:
                        _b.sent();
                        this.stage(outPath);
                        return [2 /*return*/];
                }
            });
        });
    };
    WordpressBaker.prototype.bakePost = function (slug) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, wordpressUrl, outDir, html, outPath, err_1, outPath;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, wordpressUrl = _a.wordpressUrl, outDir = _a.outDir;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, request(wordpressUrl + "/" + slug)];
                    case 2:
                        html = _b.sent();
                        if (slug === "/")
                            slug = "index";
                        outPath = path.join(outDir, slug + ".html");
                        return [4 /*yield*/, fs.mkdirp(path.dirname(outPath))];
                    case 3:
                        _b.sent();
                        html = html.replace(new RegExp(wordpressUrl, 'g'), "")
                            .replace(new RegExp("http://", 'g'), "https://")
                            .replace(new RegExp("https://ourworldindata.org", 'g'), "https://static.ourworldindata.org")
                            .replace(new RegExp("/grapher/embedCharts.js", 'g'), "https://static.ourworldindata.org/grapher/embedCharts.js")
                            .replace(new RegExp("/wp-content/uploads/nvd3", 'g'), "https://www.maxroser.com/owidUploads/nvd3")
                            .replace(new RegExp("/wp-content/uploads/datamaps", 'g'), "https://www.maxroser.com/owidUploads/datamaps");
                        return [4 /*yield*/, fs.writeFile(outPath, html)];
                    case 4:
                        _b.sent();
                        this.stage(outPath);
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _b.sent();
                        if (slug === "404") {
                            outPath = path.join(outDir, "404.html");
                            fs.writeFile(outPath, err_1.response.body);
                            this.stage(outPath);
                        }
                        else {
                            console.error(err_1);
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    WordpressBaker.prototype.getPermalinks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows, permalinks, _i, rows_1, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.query("SELECT post_id, meta_value FROM wp_postmeta WHERE meta_key='custom_permalink'")];
                    case 1:
                        rows = _a.sent();
                        permalinks = {};
                        for (_i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                            row = rows_1[_i];
                            permalinks[row.post_id] = row.meta_value;
                        }
                        return [2 /*return*/, permalinks];
                }
            });
        });
    };
    WordpressBaker.prototype.bakePosts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, outDir, forceUpdate, postsQuery, permalinks, rows, requestSlugs, postSlugs, _i, rows_2, row, slug, outPath, stat, existingSlugs, toRemove, _b, toRemove_1, slug, outPath;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, outDir = _a.outDir, forceUpdate = _a.forceUpdate;
                        postsQuery = this.db.query("SELECT ID, post_name, post_modified FROM wp_posts WHERE (post_type='page' OR post_type='post') AND post_status='publish'");
                        return [4 /*yield*/, this.getPermalinks()];
                    case 1:
                        permalinks = _c.sent();
                        return [4 /*yield*/, postsQuery];
                    case 2:
                        rows = _c.sent();
                        return [4 /*yield*/, this.bakePost("404")];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, this.bakePost("/")];
                    case 4:
                        _c.sent();
                        requestSlugs = [];
                        postSlugs = [];
                        _i = 0, rows_2 = rows;
                        _c.label = 5;
                    case 5:
                        if (!(_i < rows_2.length)) return [3 /*break*/, 8];
                        row = rows_2[_i];
                        slug = (permalinks[row.ID] || row.post_name).replace(/\/$/, "");
                        postSlugs.push(slug);
                        if (!forceUpdate) {
                            try {
                                outPath = path.join(outDir, slug + ".html");
                                stat = fs.statSync(outPath);
                                //                    console.log(`${stat.mtime} ${row.post_modified} ${slug}`)
                                if (stat.mtime >= row.post_modified) {
                                    // No newer version of this post, don't bother to bake
                                    return [3 /*break*/, 7];
                                }
                            }
                            catch (err) {
                                // File likely doesn't exist, proceed
                            }
                        }
                        requestSlugs.push(slug);
                        if (!(requestSlugs.length >= 10)) return [3 /*break*/, 7];
                        // Scrape in little batches to avoid overwhelming the server
                        return [4 /*yield*/, Promise.all(requestSlugs.map(function (slug) { return _this.bakePost(slug); }))];
                    case 6:
                        // Scrape in little batches to avoid overwhelming the server
                        _c.sent();
                        requestSlugs = [];
                        _c.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8: return [4 /*yield*/, Promise.all(requestSlugs.map(function (slug) { return _this.bakePost(slug); }))
                        // Delete any previously rendered posts that aren't in the database
                    ];
                    case 9:
                        _c.sent();
                        existingSlugs = glob.sync(outDir + "/**/*.html").map(function (path) { return path.replace(outDir + "/", '').replace(".html", ""); })
                            .filter(function (path) { return !path.startsWith('wp-') && !path.startsWith('slides') && !path.startsWith('blog') && path !== "index" && path !== "404"; });
                        toRemove = lodash_1.without.apply(void 0, [existingSlugs].concat(postSlugs));
                        _b = 0, toRemove_1 = toRemove;
                        _c.label = 10;
                    case 10:
                        if (!(_b < toRemove_1.length)) return [3 /*break*/, 13];
                        slug = toRemove_1[_b];
                        outPath = outDir + "/" + slug + ".html";
                        return [4 /*yield*/, fs.unlink(outPath)];
                    case 11:
                        _c.sent();
                        this.stage(outPath, "DELETING " + outPath);
                        _c.label = 12;
                    case 12:
                        _b++;
                        return [3 /*break*/, 10];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    WordpressBaker.prototype.bakeBlog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var posts, numPages, requests, i, _a, outDir, wordpressUrl, feed, outPath, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.db.query("SELECT ID FROM wp_posts WHERE (post_type='post') AND post_status='publish'")];
                    case 1:
                        posts = _b.sent();
                        numPages = Math.ceil(posts.length / 20);
                        requests = [];
                        for (i = 2; i <= numPages; i++) {
                            requests.push(this.bakePost("blog/page/" + i));
                        }
                        return [4 /*yield*/, Promise.all(requests)
                            // RSS feed
                        ];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 7, , 8]);
                        _a = this.props, outDir = _a.outDir, wordpressUrl = _a.wordpressUrl;
                        return [4 /*yield*/, request(wordpressUrl + "/feed/")];
                    case 4:
                        feed = _b.sent();
                        return [4 /*yield*/, fs.mkdirp(path.join(outDir, 'feed'))];
                    case 5:
                        _b.sent();
                        outPath = path.join(outDir, 'feed/index.xml');
                        return [4 /*yield*/, fs.writeFile(outPath, feed)];
                    case 6:
                        _b.sent();
                        this.stage(outPath);
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _b.sent();
                        console.error(err_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    WordpressBaker.prototype.bakeAssets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, wordpressDir, outDir;
            return __generator(this, function (_b) {
                _a = this.props, wordpressDir = _a.wordpressDir, outDir = _a.outDir;
                shell.exec("rsync -havz --delete " + wordpressDir + "/wp-content " + outDir + "/");
                shell.exec("rsync -havz --delete " + wordpressDir + "/wp-includes " + outDir + "/");
                shell.exec("rsync -havz --delete " + wordpressDir + "/favicon* " + outDir + "/");
                shell.exec("rsync -havz --delete " + wordpressDir + "/slides/ " + outDir + "/slides");
                return [2 /*return*/];
            });
        });
    };
    WordpressBaker.prototype.bakeAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bakeRedirects()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.bakeAssets()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.bakeBlog()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.bakePosts()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WordpressBaker.prototype.stage = function (outPath, msg) {
        console.log(msg || outPath);
        this.stagedFiles.push(outPath);
    };
    WordpressBaker.prototype.exec = function (cmd) {
        console.log(cmd);
        shell.exec(cmd);
    };
    WordpressBaker.prototype.deploy = function (commitMsg, authorEmail, authorName) {
        return __awaiter(this, void 0, void 0, function () {
            var outDir, _i, _a, files;
            return __generator(this, function (_b) {
                outDir = this.props.outDir;
                for (_i = 0, _a = lodash_1.chunk(this.stagedFiles, 100); _i < _a.length; _i++) {
                    files = _a[_i];
                    this.exec("cd " + outDir + " && git add -A " + files.join(" "));
                }
                if (authorEmail && authorName && commitMsg) {
                    this.exec("cd " + outDir + " && git add -A . && git commit --author='" + authorName + " <" + authorEmail + ">' -a -m '" + commitMsg + "' && git push origin master");
                }
                else {
                    this.exec("cd " + outDir + " && git add -A . && git commit -a -m '" + commitMsg + "' && git push origin master");
                }
                return [2 /*return*/];
            });
        });
    };
    WordpressBaker.prototype.end = function () {
        this.db.end();
    };
    return WordpressBaker;
}());
exports.WordpressBaker = WordpressBaker;
//# sourceMappingURL=WordpressBaker.js.map