export default function getDeepKeys(obj){
    let keys = [];
    for (const key in obj) {
        if ( typeof obj[key] === 'object' ){
            var subkeys = getDeepKeys(obj[key]);
            keys = keys.concat(subkeys.map(function(subkey) {
                return key + "." + subkey;
            }));
        }
        else {
            keys.push(key);
        }
    }
    return keys;
}