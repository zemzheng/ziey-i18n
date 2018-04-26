const exprima = require('esprima');
const path = require('path');
const fs = require('fs');

function getLastIdentifier(tokens,index){
    const result = [];
    let ignore = false;
    do{
        let { type, value } = tokens[--index] || {};
        if( 'Keyword' === type ){
            break;
        }
        if( 'Punctuator' === type ){
            if( '}' === value ){
                ignore = true;
            }
            if( '{' === value ){
                ignore = false;
            }
        } else if( !ignore && 'Identifier' === type ){
            result.push( value );
        }
    } while( index >= 0 );
    return result;
}

function filterReduce(list){
    return list
        .filter( x => x )
        .reduce( ( sum, current ) => sum.concat( current ), [] )
        .reduce( ( sum, current ) => sum.indexOf( current ) === -1 ? sum.concat( current ) : sum , [] )
}

function getZieyI18n(tokens){
    return filterReduce(
        tokens.map( ({ type, value }, index ) => {
            if( 'String' === type && 'ziey-i18n' === value.replace( /^['"`]|['"`]$/g, '' )  ){
                const index1 = index -1;
                const index2 = index -2;
                const back1 = tokens[index1];
                const back2 = tokens[index2];
                switch(true){
                    case 'Identifier' === back1.type && 'from' === back1.value:
                        return getLastIdentifier( tokens, index1 );
                    case 'Identifier' === back2.type && 'require' === back2.value:
                        return getLastIdentifier( tokens, index2 );
                }
            }
        })
    );
}

function getI18nStr(tokens){
    const methods = getZieyI18n(tokens);
    return filterReduce(
        tokens.map(({ type, value }, index) => {
            const next1 = tokens[index+1];
            const next2 = tokens[index+2];
            if( 'Identifier' === type && methods.indexOf( value ) > -1 ){ 
                if( 'Punctuator' === next1.type && '(' === next1.value ){
                    if( 'String' === next2.type ){
                        return next2.value;
                    }
                }
            }
        })
    );
}

module.exports = function(){
    const content = fs.readFileSync( path.join( __dirname, 'index.js' ), 'utf8' );
    const tokens = exprima.tokenize(content);
    console.log(getI18nStr(tokens));
}
