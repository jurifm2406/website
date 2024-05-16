import { pb } from "$lib/server/auth";
import type { Person, RawRelation, Relation } from "$lib/types";
import { fail } from "@sveltejs/kit";
import { type } from "node:os";

export async function load() {
    const p = await pb
        .collection("persons")
        .getFullList<Person>();

    const r = await pb
        .collection("relations")
        .getFullList<RawRelation>({
            expand: "person1,person2"
        });

    const persons: Person[] = p.map(person => ({
        id: person.id,
        name: person.name
    }));

    const relations: Relation[] = r.map(relation => ({
        id: relation.id,
        person1: {
            id: relation.expand.person1.id,
            name: relation.expand.person1.name
        },
        person2: {
            id: relation.expand.person2.id,
            name: relation.expand.person2.name
        }
    }));

    return {
        persons: persons,
        relations: relations
    };
}

export const actions = {
    addRelation: async (event) => {
        const data = await event.request.formData();
        const person1 = data.get("person1");
        const person2 = data.get("person2");

        if (!person1 || !person2) {
            return fail(422, { addRelationIncomplete: true });
        }
        if (typeof person1 !== "string" || typeof person2 !== "string") {
            return;
        }
        if (person1 === person2) {
            return fail(422, { addRelationOverlap: true });
        }

        let success = false;

        pb.collection("relations")
            .getFirstListItem(
                `(person1="${person1}" && person2="${person2}") || (person1="${person2}" && person2="${person1})"`
            )
            .catch(() => {
                success = true;
            })
            .then(() => {
                if (success) {
                    const relation = {
                        person1: person1,
                        person2: person2
                    };

                    pb.collection("relations").create(relation);
                } else {
                    return fail(422, { addRelationDuplicate: true });
                }
            });
    },
    removePerson: async (event) => {
        const data = await event.request.formData();
        const person = data.get("person");

        if (!person) {
            return fail(422, { removePersonIncomplete: true });
        }
        if (typeof person !== "string") {
            return;
        }

        await pb.collection("persons").delete(person);
    },
    addPerson: async (event) => {
        const data = await event.request.formData();
        const name = data.get("person");

        if (!name) {
            return fail(422, { addPersonIncomplete: true });
        }
        if (typeof name !== "string") {
            return;
        }

        let success = false;
        pb.collection("persons")
            .getFirstListItem(`name="${name}"`)
            .catch(() => {
                success = true;
            })
            .then(() => {
                if (success) {
                    pb.collection("persons").create({ name: name });
                } else {
                    return fail(422, { addPersonDuplicate: true });
                }
            });
    },
    removeRelation: async (event) => {
        const data = await event.request.formData();
        const relation = data.get("relation");

        if (!relation) {
            return fail(422, { removeRelationIncomplete: true });
        }
        if (typeof relation !== "string") {
            return;
        }

        await pb.collection("relations").delete(relation);
    },
    editPerson: async (event) => {
        const data = await event.request.formData();
        const person = data.get("person");
        const name = data.get("name");

        if (!person || !name) {
            return fail(422, { editPersonIncomplete: true });
        }
        if (typeof person !== "string" || typeof name !== "string") {
            return;
        }

        const d = {
            "name": name
        }

        await pb.collection("persons").update(person, d);
    }
};
