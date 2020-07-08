(function() {
    if (!window || !document) {
        throw("A window and document is needed to use");
    }
})();

const JSExtended = (function () {
    let self = this;
    self.options = {
        Ajax: true,
        Version: true,
        Prototypes: 'all',
        lib: "./lib"
    };
    return self;
})();
JSExtended.setOption = function (key, value) {
    JSExtended.options[key] = value;
};
JSExtended.load = function (callback = Function, options = {}) {
    options = Object.assign(JSExtended.options, options);
    function addStrings() {
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
        String.prototype.toHex = function (f, s = " ") {
            if (this.length > 1) {
                let r = "";
                for (let i = 0; i < this.length; i++) {
                    if (i == (this.length - 1)) {
                        s = "";
                    }
                    let c = this[i].charCodeAt(0);let d = "00"+c.toString(16);let e = d.substr(d.length-2);
                    r += (f ? "0x" : "") + e + s;
                }
                return r.trim();
            } else {
                let c = this.charCodeAt(0);let d = "00"+c.toString(16);let e = d.substr(d.length-2);
                return (f ? "0x" : "") + e;
            }
        };
        String.prototype.toInt = function () {
            return parseInt(this);
        };
        String.prototype.toFloat = function () {
            return parseFloat(this);
        };
    }
    function addObjects() {
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
        Object.prototype.toCSS = function () {
            return Object.entries(this).map(([k, v]) => `${k.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}:${v}`).join(';');
        };
    }
    function addArray() {
        Array.prototype.each = function (callback) {
            for (let i = 0; i < this.length; i++) {
                callback(this[i], i, this);
            }
        };
        NodeList.prototype.each = Array.prototype.each;
    }
    function addElements() {
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
        Element.prototype.addCSS = function (obj) {
            this.style = obj.toCSS();
        };
        Element.prototype.addCSSInclude = function (obj) {
            this.addCSS(obj.self);
        };
    }
    if (options.Prototypes == 'all') {
        addStrings();
        addObjects();
        addArray();
        addElements();
    } else {
        if (options.Prototypes.includes("|")) {
            options.Prototypes = options.Prototypes.split("|");
            for (let i = 0; i < options.Prototypes.length; i++) {
                let type = options.Prototypes.length;
                switch (type.toLowerCase()) {
                    case "strings":
                        addStrings();
                        break;
                    case "objects":
                        addObjects();
                        break;
                    case "arrays":
                        addArray();
                        break;
                    case "elements":
                        addElements();
                }
            }
        } else {
            switch (options.Prototypes.toLowerCase()) {
                case "strings":
                    addStrings();
                    break;
                case "objects":
                    addObjects();
                    break;
                case "arrays":
                    addArray();
                    break;
                case "elements":
                    addElements();
            }
        }
    }
    function addAjax() {
        if (!options.Ajax) {
            return;
        }
        try {
            if (Ajax == undefined) {
                throw("Ajax not found");
            } else {
                return;
            }
        } catch (e) {
            let script = document.createElement("script");
            script.src = options.lib + (options.lib.endsWith("/") ? "datatypes/JSExtendedAjax.js" : "/datatypes/JSExtendedAjax.js");
            script.type = "text/javascript";
            script.onload = function () {
                if (Ajax == undefined) {
                    console.error("Error loading Ajax");
                }
                return;
            };
            document.head.append(script);
        }
    }
    function addVersion() {
        if (!options.Version) {
            return true;
        }
        try {
            if (Version == undefined) {
                throw("Version not found");
            } else {
                return;
            }
        } catch (e) {
            let script = document.createElement("script");
            script.src = options.lib + (options.lib.endsWith("/") ? "datatypes/JSExtendedVersion.js" : "/datatypes/JSExtendedVersion.js");
            script.type = "text/javascript";
            script.onload = function () {
                if (Version == undefined) {
                    console.error("Error loading Version");
                }
                return;
            };
            document.head.append(script);
        }
    }
    function done(callback){
        if(typeof Ajax !== "undefined" && typeof Version !== 'undefined'){
            callback();
        }
        else{
            setTimeout(done.bind(null, callback), 10);
        }
    }
    addAjax();
    addVersion();
    setTimeout(done.bind(null, callback), 10);
};


