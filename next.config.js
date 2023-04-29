/** @type {import('next').NextConfig} */
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const nextConfig = {
  reactStrictMode: true,
  compiler: (() => {
    let compilerConfig = {
      // styledComponentsの有効化
      styledComponents: true,
    };

    if (process.env.NODE_ENV === "production") {
      compilerConfig = {
        ...compilerConfig,
        // 本番環境ではReact Testing Libraryで使用するdata-testid属性を削除
        reactRemoveProperties: { properties: ["^data-testid$"] },
      };
    }

    return compilerConfig;
  })(),

  async rewrite() {
    return [
      {
        source: `${process.env.NEXT_PUBLIC_BASE_PATH}/:match*`,
        destination: `${process.env.API_BASE_URL}/:match*`,
      },
    ];
  },
};

module.exports = nextConfig;
