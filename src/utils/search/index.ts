import { filter, capitalize, trim, lowerCase } from 'lodash'

type SearchObject = {
  [key: string]: string;
}

// receive array return 
export function simpleSearch(array: SearchObject[],item: number){
    return array[item];
}

//search full term
export function fullTerm(array: SearchObject[], index: string, term: string){
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
export function partTerm(array: SearchObject[], index: string, term: string){
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