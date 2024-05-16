export interface RawRelation {
    id: string;
    expand: {
        person1: Person;
        person2: Person;
    }
}

export interface Person {
    id: string;
    name: string;
}

export interface Relation {
    id: string;
    person1: Person;
    person2: Person;
}

export interface Errors {
    persons: {
        remove: string;
        add: string;
    };
    relations: {
        remove: string;
        add: string;
    };
}
