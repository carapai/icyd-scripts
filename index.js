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
        // params: {
        //     async: true,
        // },
    });
    const rawData = fs.readFileSync(args.f);
    const { trackedEntityInstances } = JSON.parse(rawData);
    const allChunks = chunk(trackedEntityInstances, +args.c);
    let index = 0;
    for (const c of allChunks) {
        console.log(`Working on ${++index} of ${allChunks.length}`);
        const {
            data: { response },
        } = await api.post("trackedEntityInstances", {
            trackedEntityInstances: c,
        });

        console.l(response);
    }
};

readJsonFile();
