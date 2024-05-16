/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "61iqdx5mv7fcujb",
    "created": "2024-03-11 13:30:08.680Z",
    "updated": "2024-03-11 13:30:08.680Z",
    "name": "persons",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lf7wqzvd",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("61iqdx5mv7fcujb");

  return dao.deleteCollection(collection);
})
