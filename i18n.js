function handleArray( args, func ){
    if( Array.isArray( args[0] ) ){
        return arts[0]
            .map( str => func.apply( null, args ) )
            .reduce( ( sum, current ) => {
                return sum.concat( current );
            }, [] );
    }
    return func.apply( null, args );
}

function handleList(){
    return handleArray(
        arguments,
        (str, list = [], split = '%s') => {
            let sourceList = str.split(split);
            let insertList = list.concat();
            result = [ sourceList.shift() ];
            while( sourceList.length ){
                result.push(
                    insertList.shift(),
                    sourceList.shift()
                );
            }
            return result;
        }
    );
}

function handleMap(){
    return handleArray(
        arguments,
        (str, map = {}) => {
            let result = str;
            Object.keys(map).forEach( key => {
                result = handleList(result, [map[key]], `%{${key}}` )
            });
            return result;
        }
    );
}

function merge(list){
    list = list.filter( x => x !== '' );
    let ii = list.length;
    while(ii--){
        if( 'string' !== typeof list[ii] ){
            return list;
        }
    }
    return list.join('');
}

module.exports = function(){
    let dict = {};
    function i18n(str, others){
        str = str.trim();
        str = dict[str] || str;
        return merge(
            Array.isArray( others )
                ? handleList(str, others)
                : handleMap(str, others)
        );
    }
    i18n.init = function(input) {
        dict = input || {};
    }

    return i18n;
}
