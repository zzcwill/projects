# Introduction

[![vue](https://img.shields.io/badge/vue-2.6.10-brightgreen.svg)](https://github.com/vuejs/vue)


::: tip
This project integrates a lot of features

- Integrated Solution
- Basic Template
:::

<br/>

## Features

```
- Login / Logout

- Permission Authentication
  - Page permission
  - Directive permission
```

<br/>

## Preparation

Understanding and learning this knowledge in advance will greatly help the use of this project.

- [项目地址](https://github.com/zzcwill/docDemo)

## Project Structure

This project has built the following templates

```bash
├── build                      # build config files
├── mock                       # mock data
├── plop-templates             # basic template
├── public                     # pure static assets (directly copied)
│   │── favicon.ico            # favicon
│   └── index.html             # index.html template
├── src                        # main source code
│   ├── api                    # api service
│   ├── assets                 # module assets like fonts,images (processed by webpack)
│   ├── components             # global components
│   ├── directive              # global directive
│   ├── filters                # global filter
│   ├── icons                  # svg icons
│   ├── lang                   # i18n language
│   ├── layout                 # global layout
│   ├── router                 # router
│   ├── store                  # store
│   ├── styles                 # global css
│   ├── utils                  # global utils
│   ├── vendor                 # vendor
│   ├── views                  # views
│   ├── App.vue                # main app component
│   ├── main.js                # app entry file
│   └── permission.js          # permission authentication
├── tests                      # tests
├── .env.xxx                   # env variable configuration
├── .eslintrc.js               # eslint config
├── .babelrc                   # babel config
├── .travis.yml                # automated CI configuration
├── vue.config.js              # vue-cli config
├── postcss.config.js          # postcss config
└── package.json               # package.json
```

## Getting Started

```bash
# clone the project
git clone https://github.com/zzcwill/docDemo

# enter the project directory
cd docDemo

# install dependency
npm install -g vuepress

# develop
npm run dev
```

<br/>

## Browsers Support

Modern browsers and Internet Explorer 10+.

<!-- prettier-ignore -->
| [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img class="no-margin" src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

<br>

| development | production |
| :---------: | ---------- |
|    cors     | cors       |
|    proxy    | nginx      |

## Vue Ecosystem

**First understanding the things in these vue ecosystems will help you get started with this project.**

1. [Vue Router](https://router.vuejs.org/) Vue Router is the official router for Vue.js.

