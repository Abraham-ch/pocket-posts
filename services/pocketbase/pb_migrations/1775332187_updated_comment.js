/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_86453638")

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2106002237",
    "hidden": false,
    "id": "relation2845631839",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "post_comment",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_86453638")

  // update field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2106002237",
    "hidden": false,
    "id": "relation2845631839",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "post_comment",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
