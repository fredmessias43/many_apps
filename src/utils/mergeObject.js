export default function mergeObejct(keys,values){
    const l = keys.length;
    let obj = {};
    for (let i = 0; i < l; i++) {
        obj[keys[i]] = values[i];
    }
    return obj;
}