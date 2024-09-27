export type Person = {
    id: number;
    name: string;
};

export type Relation = {
    id: number;
    person1: Person;
    person2: Person;
};

export type NotificationType = "social" | "technical" | "warning";

export const roles = ["user", "admin"] as const;

export type Role = (typeof roles)[number];
