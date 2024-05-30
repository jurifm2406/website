import { prisma } from "$lib/server/prisma";
import type { Person, Relation } from "$lib/types";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const persons: Person[] = await prisma.person.findMany();

    const relations: Relation[] = (
        await prisma.relation.findMany({
            include: {
                person1: true,
                person2: true,
            },
        })
    ).map((relation) => {
        return {
            id: relation.id,
            person1: relation.person1,
            person2: relation.person2,
        };
    });

    return {
        persons: persons,
        relations: relations,
    };
};

export const actions: Actions = {
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

        const person1Id = Number.parseInt(person1);
        const person2Id = Number.parseInt(person2);

        if (Number.isNaN(person1Id) || Number.isNaN(person2Id)) {
            return;
        }

        if (person1Id === person2Id) {
            return;
        }

        const exists = await prisma.relation.findFirst({
            where: {
                OR: [
                    {
                        person1Id,
                        person2Id,
                    },
                    {
                        person1Id: person2Id,
                        person2Id: person1Id,
                    },
                ],
            },
        });

        if (exists) {
            return fail(422, { addRelationDuplicate: true });
        }

        await prisma.relation.create({
            data: {
                person1Id,
                person2Id,
            },
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

        const id = Number.parseInt(person);

        if (Number.isNaN(id)) {
            return;
        }

        await prisma.person.delete({
            where: {
                id,
            },
        });
    },
    addPerson: async (event) => {
        const data = await event.request.formData();
        const name = data.get("name");

        if (!name) {
            return fail(422, { addPersonIncomplete: true });
        }

        if (typeof name !== "string") {
            return;
        }

        const exists = await prisma.person.findFirst({
            where: {
                name,
            },
        });

        if (exists) {
            return fail(422, { addPersonDuplicate: true });
        }

        prisma.person.create({
            data: {
                name,
            },
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

        const id = Number.parseInt(relation);

        if (Number.isNaN(id)) {
            return;
        }

        try {
            await prisma.relation.delete({
                where: {
                    id,
                },
            });
        } catch {
            return;
        }
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

        const id = Number.parseInt(person);

        if (Number.isNaN(id)) {
            return;
        }

        try {
            await prisma.person.update({
                where: {
                    id,
                },
                data: {
                    id,
                    name,
                },
            });
        } catch {
            return;
        }
    },
} satisfies Actions;
