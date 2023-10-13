/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this with actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
};

module.exports = nextConfig;

// const path = require("path");
// const withPWAInit = require("next-pwa");

// /** @type {import('next-pwa').PWAConfig} */
// const withPWA = withPWAInit({
//   dest: "public",
//   buildExcludes: ["app-build-manifest.json"],
// });

// const generateAppDirEntry = (entry) => {
//   const packagePath = require.resolve('next-pwa');
//   const packageDirectory = path.dirname(packagePath);
//   const registerJs = path.join(packageDirectory, "register.js");

//   return entry().then((entries) => {
//     if (entries["main-app"] && !entries["main-app"].includes(registerJs)) {
//       if (Array.isArray(entries["main-app"])) {
//         entries["main-app"].unshift(registerJs);
//       } else if (typeof entries["main-app"] === "string") {
//         entries["main-app"] = [registerJs, entries["main-app"]];
//       }
//     }
//     return entries;
//   });
// };

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   webpack: (config) => {
//     const entry = generateAppDirEntry(config.entry);
//     config.entry = () => entry;

//     return config;
//   },
// };

// module.exports = withPWA(nextConfig);
