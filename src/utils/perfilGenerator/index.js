export default function generator(full_name){
    const [ first_name, last_name ] = full_name.split(' ');

    const first_letter = first_name[0];
    const last_letter = last_name[0];

    return first_letter+ " " +last_letter;
}