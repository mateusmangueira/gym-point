module.exports = {
  "parser": "babel-eslint",
  "env": {
    "es6": true,
    "jest": true
  },
  "extends": ["airbnb"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "__DEV__": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["jsx-a11y", "import"],
  "rules": {
    "react/jsx-filename-extension": [
      "error",
      { "extensions": [".js", ".jsx"] }
    ],
    "import/prefer-default-export": "off"
  },
  "settings": {
    "import/resolver": {
      "babel-plugin-root-import": {
        "rootPathSuffix": "src"
      }
    }
  }
}