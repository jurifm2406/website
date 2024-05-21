// @ts-nocheck
import type { Person, RawRelation, Relation } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load = async (event: Parameters<PageServerLoad>[0]) => {
    const persons = await event.locals.pb.collection("persons").getFullList<Person>();
    const relations = await event.locals.pb.collection("relations").getFullList<RawRelation>({
        expand: "person1, person2",
    });

    const nodes = persons.map((person) => {
        return {
            id: person.name,
            group: 1
        }
    })

    const links = relations.map((relation) => {

        return {
            source: relation.expand.person1.name,
            target: relation.expand.person2.name,
            value: 1
        }
    })

    return {
        nodes: nodes,
        links: links
    }
}