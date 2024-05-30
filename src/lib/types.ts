export type Person = {
    id: number;
    name: string;
};

export type Relation = {
    id: number;
    person1: Person;
    person2: Person;
};
