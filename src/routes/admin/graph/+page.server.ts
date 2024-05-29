import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../../.svelte-kit/types/src/routes";

import prisma from "../../../auth";

export const load: PageServerLoad = async () => {
    const persons = await prisma.person.findMany();

    const relations = await prisma.relation.findMany({
        include: {
            person1: true,
            person2: true
        }
    })

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

        event.locals.pb.collection("relations")
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

                    event.locals.pb.collection("relations").create(relation);
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

        await event.locals.pb.collection("persons").delete(person);
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
        event.locals.pb.collection("persons")
            .getFirstListItem(`name="${name}"`)
            .catch(() => {
                success = true;
            })
            .then(() => {
                if (success) {
                    event.locals.pb.collection("persons").create({ name: name });
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

        await event.locals.pb.collection("relations").delete(relation);
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
            name: name
        }

        await event.locals.pb.collection("persons").update(person, d);
    }
} satisfies Actions;