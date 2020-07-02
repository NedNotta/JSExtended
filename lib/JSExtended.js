(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
        factory();
}((function () {
    'use strict';

    // #region Version
    exports.Version = function (str) {
        let self = {};
        self.scheme =
            "Semantic Versioning 2.0.0" +
            " (https://semver.org/#semantic-versioning-200)";
        if (!str.includes(".")) {
            self.major = parseInt(str);
            self.minor = 0;
            self.patch = 0;
        } else {
            str = str.split(".");
            self.major = parseInt(str[0]) || 0;
            self.minor = parseInt(str[1]) || 0;
            self.patch = parseInt(str[2]) || 0;
        }
        self.beta = self.major === 0;

        self.valueOf = function () {
            return self.toString();
        };
        self.toString = function () {
            return `${self.major}.${self.minor}.${self.patch}`;
        };
        self.add = function (v) {
            if (typeof v == "object") {
                try {
                    self.major += v.major;
                    self.minor += v.minor;
                    self.patch += v.patch;
                } catch (e) {
                    return null;
                }
            } else if (typeof v == "string") {
                v = new Version(v);
                try {
                    self.major += v.major;
                    self.minor += v.minor;
                    self.patch += v.patch;
                } catch (e) {
                    return null;
                }
            } else if (typeof v == "number") {
                v = new Version(v.toString());
                try {
                    self.major += v.major;
                    self.minor += v.minor;
                    self.patch += v.patch;
                } catch (e) {
                    return null;
                }
            } else {
                return null;
            }
            return self;
        };

        return self;
    };
    //#endregion

    exports.Ajax = class {

        constructor(options = {}) {

            if ((typeof module != 'undefined' && module.exports)) {
                throw "Ajax cannot be used in node.js";
            }

            let self = this;

            self.options = Object.assign(exports.Ajax._DEFAULT_CONFIG, options);
            self.start_time = 0;
            self.xhttp = new XMLHttpRequest();
            self.xhttp.onprogress = function (e) {
                var bps = Math.floor(e.loaded / ((new Date()).getTime() - self.start_time));
                self.options.onprogress(e.loaded, e.total, bps);
            };
            self.xhttp.onabort = self.options.onabort;
            self.xhttp.onerror = self.options.onerror;
            self.xhttp.upload.onprogress = function (e) {
                var bps = Math.floor(e.loaded / ((new Date()).getTime() - self.start_time));
                self.options.onupload(e.loaded, e.total, tl, bps);
            };
            self.xhttp.upload.onabort = self.options.upload.onabort;
            self.xhttp.upload.onerror = self.options.upload.onerror;
            self.xhttp.upload.onload = self.options.upload.onload;

            return self;

        }

        start(params, callback, post = false) {

            let query = "",
                self = this;

            self.xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var data = this.responseText;
                    try {
                        callback(data.toObj(), this);
                    } catch (e) {
                        callback(data, this);
                    }
                } else if (this.status >= 400) {
                    throw this.status;
                }
            };
            if (params.size > 0) {
                params.keys().each(function (key, i) {
                    query += `${encodeURI(key)}=${encodeURI(params[key])}`;
                    if (i > params.size - 1) {
                        query += "&";
                    }
                });
            }
            self.start_time = new Date().getTime();
            if (post) {
                return query;
            } else {
                url += "?" + query;
            }
        }

        get(url, params, callback) {
            this.start(url, params, callback);
            this.xhttp.open("GET", url, true);
            this.xhttp.send();
        }

        post(url, params, callback) {
            this.xhttp.open("POST", url, true);
            this.xhttp.send(this.start(url, params, callback, true));
        }

    };
    exports.Ajax._DEFAULT_CONFIG = {
        onprogress: function () {
            return;
        },
        timeout: 0,
        onupload: function () {
            return;
        },
        withCredentials: false,
        returnType: undefined,
        upload: {
            onabort: function () { return; },
            onerror: function () { return; },
            onload: function () { return; }
        },
        onabort: function () { return; },
        onerror: function () { return; }
    };

    const isNode = (typeof module !== 'undefined' && module.exports);

    // #region String Prototypes
    String.prototype.toObj = function () {
        return JSON.parse(this);
    };
    String.prototype.insert = function (str, idx, rem = 0) {
        return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };
    String.prototype.htmlEscape = function () {
        return this.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
            return "&#" + i.charCodeAt(0) + ";";
        });
    };
    String.prototype.word = function (i) {
        return this.split(" ")[i];
    };
    //#endregion

    // #region Object Prototypes
    Object.prototype.keys = function () {
        return Object.keys(this);
    };
    Object.prototype._size = function () {
        return Object.keys(this).length;
    };
    Object.prototype.size = Object.prototype._size();
    Object.prototype.toString = function () {
        return JSON.stringify(this);
    };
    //#endregion

    // #region Array Prototypes
    Array.prototype.each = function (callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this[i], i, this);
        }
    };
    //#endregion

    // #region Browser Only Extentions
    if (!isNode) {

        // #region NodeList Prototypes
        NodeList.prototype.each = Array.prototype.each;
        //#endregion

        // #region Element Prototypes
        Element.prototype.hasClass = function (c) {
            return this.className.indexOf(c) > 1;
        };
        Element.prototype.addClass = function () {
            let args = Array.from(arguments),
                el = this;
            args.each(function (c) {
                if (!el.hasClass(c)) {
                    el.classList.add(c);
                }
            });
        };
        Element.prototype.removeClass = function (c) {
            let el = this;
            el.className = el.className.replace(c, "");
        };
        Element.prototype.stripHTML = function () {
            this.innerHTML = this.innerText;
            return this.innerHTML;
        };
        //#endregion

    }
    //#endregion

})));
