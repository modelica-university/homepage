const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");

module.exports = withTypescript(
    withCSS({
        exportPathMap: async defaultPathMap => {
            return {
                "/": { page: "/index", query: {} },
            };
        },
    }),
);
