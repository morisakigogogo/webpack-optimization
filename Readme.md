

## start
npm install

## dev
npm run dev

## build
npm run build

## build development
npm run dev:build

## module
npm i webpack webpack-cli webpack-dev-server html-webpack-plugin css-loader style-loader mini-css-extract-plugin babel-loader @babel/core @babel/preset-env @babel/preset-react file-loader --save-dev
npm i react react-dom --save-dev

## Extract unused css classes, use with mini-css-extract-plugin
npm i purgecss-webpack-plugin glob -D

## Picture optimization, resolution
npm i image-webpack-loader -D

## Add CDN
npm i --save-dev add-asset-html-cdn-webpack-plugin