const { save } = require("./index");
const pluginName = 'ZieyI18nLoaderPlugin';

module.exports = class ZieyI18nLoaderPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap(pluginName, compilation => {
            save();
        })
    }
}
