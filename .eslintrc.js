module.exports = {
  root: true,
  env: {
    "node": true
  },
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    "no-unused-vars": "off"
  },
  parser: "vue-eslint-parser",
  // parserOptions: {
  //   "parser": "babel-eslint"
  // },
}