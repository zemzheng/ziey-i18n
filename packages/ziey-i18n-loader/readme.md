# ziey-i18n-loader

[![NPM version](https://img.shields.io/npm/v/ziey-i18n-loader.svg)](https://nodei.co/npm/ziey-i18n-loader)

[![NPM](https://nodei.co/npm/ziey-i18n-loader.png)](https://nodei.co/npm/ziey-i18n-loader/)

webpack i18n loader

## Install

    npm install ziey-i18n-loader

## Usage

```
const ZieyI18nLoaderPlugin = require('ziey-i18n-loader/plugin');
module.exports = {
    plugins: [
        new ZieyI18nLoaderPlugin() # 加上这个插件
    ],
    module: {
        rules: [
            { # 配置要翻译的文本和参数
                test   : /\.(js|html)$/i,
                loader : "ziey-i18n?lang=<lang>&path=<path_to_po>&clean=0&openTag=<<&closeTag=}}",
            }
        ]
    }
}
```

## params

param    | desc
---      | ---
lang     | language
path     | path to po file
clean    | need to clean useless msgid & result ? default = 1
openTag  | default = '{#'
closeTag | default = '#}'

## JSON encode

```
    '{# "hello" #}' ==> "hello"
    '{# JSON# "hello" #}' ==> \"hello\"
    '{# json# "hello" #}' ==> \"hello\"
```
