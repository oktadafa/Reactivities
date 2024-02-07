export interface Duck {
    name :string;
    nomor: number;
    makeSound : (sound:string) => void;
}

const duck1 : Duck = {
    name :"okta daffa ramadani",
    nomor : 12,
    makeSound: (sound:string) => console.log(sound)
}

const duck2 : Duck = {
    name : "ananda regita cahyaningrum",
    nomor : 14,
    makeSound : (sound:string) => console.log(sound)
}

duck1.makeSound("quick");
duck2.makeSound("hurry up");

export const ducks = [duck1, duck2];


