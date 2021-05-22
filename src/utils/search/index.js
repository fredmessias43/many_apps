import { filter, capitalize, trim, lowerCase } from 'lodash'

// receive array return 
export function simpleSearch(array,item){
    return array[item];
}

//search full term
export function fullTerm(array, index, term){
    if (term === '') {
        return array;
    }

    const filtered = filter(array,(user)=>{
        return user[index] === capitalize(term);
    });

    if (filtered.length === 0) {
        return [{[index]: 'Nenhum Correspondente'}];
    }

    return filtered;
}

//search full term
export function partTerm(array, index, term){
    if (term === '') {
        return array;
    }

    const filtered = filter(array,(user)=>{
        return lowerCase(user[index]).includes(trim(term));
    });

    if (filtered.length === 0) {
        return [{[index]: 'Nenhum Correspondente'}];
    }

    return filtered;
}