
// #region Version
function Version(str) {
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
}
//#endregion
