import _, { init } from 'ziey-i18n';
const _ = require( 'ziey-i18n' );

_.init({
    '你好' : 'hello',
    '你好%s' : 'hello %s',
});


console.log( _('你好%s', ['世界']) );
console.log( _('你好  %s', [{}]) );
