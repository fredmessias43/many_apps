export default function getDeepValues(obj){
    let values = [];
    for (const key in obj) {
        if ( typeof obj[key] === 'object' ){
            
            let subvalues = getDeepValues(obj[key]);

            values.push(subvalues);
        }
        else {
            values.push(obj[key]);
        }
    }
    return values.flat(Infinity);
}