# minimal Webpack-2 configuration

## Usage

```
npm install

Development mode:
    npm run dev
    open http://localhost:8080/

Production mode:
    npm run build
    cd dist
    http-server -p 3000
    open http://127.0.0.1:3000/
```

## Description
```
    webpack-dev-server
    babel with presets

    css-loader
    style-loader
    extract-text-webpack-plugin
    url-loader
    file-loader
    html-webpack-plugin
```
## Uses
* externals - for side loading modules (for third party modules)
* System.import - lazy loading modules
* dead code elimination
* loading images
* loading styles
* ES6 + Babel
* hot module replacement (HMR)
