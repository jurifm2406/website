import { pb } from "$lib/server/auth";
import type { fullRelation, Person } from "$lib/types";

export async function load() {
    const persons = await pb.collection("persons").getFullList<Person>();
    const relations = await pb.collection("relations").getFullList<fullRelation>({
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