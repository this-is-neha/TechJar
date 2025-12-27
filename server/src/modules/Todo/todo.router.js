
const listCtrl=require("./todo.controller")
const listRoute = require("express").Router()

listRoute.post('/create',listCtrl.listCreate)
listRoute.get("/all",listCtrl.getAll)
listRoute.get('/:id',listCtrl.getById)
listRoute.get('/title/:title',listCtrl.getOne)
listRoute.put('/:id',listCtrl.updatelist)
listRoute.delete('/:id',listCtrl.deletelist)

module.exports = listRoute