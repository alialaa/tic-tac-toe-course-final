module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    alias: {
                        "@screens": "./src/screens",
                        "@components": "./src/components",
                        "@utils": "./src/utils",
                        "@contexts": "./src/contexts",
                        "@config": "./src/config",
                        "@assets": "./assets",
                        "@api": "./src/API.ts"
                    }
                }
            ]
        ]
    };
};
