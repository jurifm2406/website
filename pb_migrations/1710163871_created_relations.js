/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "m5w230ajoiocdz0",
    "created": "2024-03-11 13:31:11.759Z",
    "updated": "2024-03-11 13:31:11.759Z",
    "name": "relations",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "f09w5ucr",
        "name": "person1",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "61iqdx5mv7fcujb",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "w9lqybti",
        "name": "person2",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "61iqdx5mv7fcujb",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("m5w230ajoiocdz0");

  return dao.deleteCollection(collection);
})
