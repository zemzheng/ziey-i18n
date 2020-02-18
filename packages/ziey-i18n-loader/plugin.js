import { save } from "./index";
const pluginName = 'ZieyI18nLoaderPlugin';

export default class ZieyI18nLoaderPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap(pluginName, compilation => {
            save();
        })
    }
}
