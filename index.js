const fs = require("fs");
const args = require("minimist")(process.argv.slice(2));
const { chunk } = require("lodash");

const readJsonFile = (file) => {
    const rawData = fs.readFileSync(file);
    const { trackedEntityInstances } = JSON.parse(rawData);
    for (const c of chunk(trackedEntityInstances, 50)) {
        console.log(c);
    }
};

readJsonFile(args.n);
