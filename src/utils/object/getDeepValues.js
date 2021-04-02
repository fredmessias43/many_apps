export default function getDeepValues(obj){
    let values = [];
    for (const key in obj) {
        console.log('values =>',values)
        if ( typeof obj[key] === 'object' ){
            
            let subvalues = getDeepValues(obj[key]);
            console.log('subvalues =>',subvalues)

            values.push(subvalues);
        }
        else {
            values.push(obj[key]);
        }
    }
    return values.flat(Infinity);
}