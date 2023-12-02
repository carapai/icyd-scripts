const fs = require("fs");
const axios = require("axios");
const args = require("minimist")(process.argv.slice(2));
const { chunk } = require("lodash");

const readJsonFile = async () => {
    const api = axios.create({
        baseURL: `${args.l}/api/`,
        auth: {
            username: args.u,
            password: args.p,
        },
    });
    const rawData = fs.readFileSync(args.f);
    const { trackedEntityInstances } = JSON.parse(rawData);
    const allChunks = chunk(trackedEntityInstances, 50);
    let index = 0;
    for (const c of allChunks) {
        console.log(`Working on ${++index} of ${allChunks.length}`);
        await api.post("trackedEntityInstances", { trackedEntityInstances: c });
    }
};

readJsonFile();
