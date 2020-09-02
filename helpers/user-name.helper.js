
const createUserName = (name, surname) => {

    let part1 = name.slice(0, 1);
    let splitted = surname.split(' ');
    let part2 = splitted[0];
    let splitted2 = splitted[1];
    let part3;
    let userName;

    if(splitted2){
        part3 = splitted2.slice(0,1);
        userName = (part1+part2+part3+"01").toLowerCase();
    }else{
        userName = (part1+part2+"01").toLowerCase();
    }

    return userName;

}

module.exports = { createUserName }