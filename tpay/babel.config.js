module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Optional: add these if you need decorators or class properties
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      // Optional: for Reanimated v2 if you use animations
      'react-native-reanimated/plugin'
    ],
  };
};
