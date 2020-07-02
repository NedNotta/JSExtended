
import * as Version from './datatypes/JSExtendedVersions.js';
import * as Ajax from './datatypes/JSExtendedAjax.js';

const isNode = (typeof module !== 'undefined' && module.exports);

const JSExtended = {

    Version: Version("0.1.0")

};

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
