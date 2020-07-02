
// #region Ajax
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
//#endregion
