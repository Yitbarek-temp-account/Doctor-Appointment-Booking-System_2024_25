// snowpack.config.js
module.exports = {
    mount: {
      public: '/',
      src: '/dist',
    },
    plugins: [
      '@snowpack/plugin-typescript',
      '@snowpack/plugin-webpack',
    ],
    alias: {
      // Add any necessary aliases here
    },
    devOptions: {
      polyfillNode: true,
    },
  };