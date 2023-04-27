const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const manifest = require("../src/manifest.json");

// Change build time in manifest version number
if (manifest) {
    const mutable = _.cloneDeep(manifest);
    const version = mutable.version.split(".");
    version[version.length - 1] = Date.now().toString().slice(0, 9);
    mutable.version = version.join(".");
    fs.writeFileSync(
        path.join(__dirname, "../src/manifest.json"),
        JSON.stringify(mutable, null, "\t")
    );
}
