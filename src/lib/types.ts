export type Person = {
    id: number;
    name: string;
};

export type Relation = {
    id: number;
    person1: Person;
    person2: Person;
};

export const Role: {
    USER: "USER";
    ADMIN: "ADMIN";
} = {
    USER: "USER",
    ADMIN: "ADMIN",
};

export type Role = (typeof Role)[keyof typeof Role];
