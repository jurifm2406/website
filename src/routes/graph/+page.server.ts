import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        graph: fetchData(),
    };
};

async function fetchData() {
    const persons = await prisma.person.findMany();
    const relations = await prisma.relation.findMany({
        include: {
            person1: true,
            person2: true,
        },
    });

    const nodes = persons.map((person) => {
        return {
            id: person.name,
            group: 1,
        };
    });

    const links = relations.map((relation) => {
        return {
            source: relation.person1.name,
            target: relation.person2.name,
            value: 1,
        };
    });

    return {
        links,
        nodes,
    };
}
