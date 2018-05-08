const withCss = require('@zeit/next-css');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

module.exports = withCss({
  webpack(config, {dev, isServer}) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          publicPath: './',
          outputPath: 'static/',
          name: '[name].[ext]',
        },
      },
    });

    // We are using eslint-loader in webpack to lint only imported modules.
    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        // Emit errors as warnings for dev to not break webpack build.
        // Eslint errors are shown in console for dev, yay :-)
        emitWarning: dev,
        formatter: eslintFormatter,
        eslintPath: require.resolve('eslint'),
        useEslintrc: true,
      },
    });

    return config;
  },
});
