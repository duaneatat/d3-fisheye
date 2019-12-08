import babel from 'rollup-plugin-babel';

export default {
  input: 'index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
