/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2106002237")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file749574446",
    "maxSelect": 99,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "File",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2106002237")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file749574446",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "File",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
