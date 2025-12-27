const listSvc = require('./todo.service')
const listModel = require("./todo.model")

class listController {

    listCreate = async (req, res, next) => {
        try {
            console.log("Request body:", req.body);
            const payload = listSvc.transformData(req)
            
            const list = await listSvc.create(payload)
          
            res.json({
                result: list,
                message: "list Creted sucessfully",
                meat: null
            })
        }
        catch (exception) {
            console.log("Error creating list");
            throw exception
        }
    }
    getAll = async (req, res, next) => {
        try {
            const data = await listSvc.listAll()
            console.log("list list:", data)
            res.json({
                result: data,
                message: "list LIst fetched Successsfully",
                meta: null
            })
        }

        catch (exception) {
            throw exception
        }

    }


    getById = async (req, res, next) => {
        try {
            const id = req.params.id
            const data = await listSvc.listOneById(id)
            console.log("list Detail fetched", data)
            res.json({
                result: data,
                message: "Brabd Detail fetched ",
                meta: null
            })
        }
        catch (exception) {
            throw exception
        }
    }
    getOne = async (req, res, next) => {
        try {
            const data = req.params.title;
            const list = await listSvc.listOne({ title: data })
            console.log("list is", list)
            res.json({
                result: list,
                message: "list Deatil",
                meta: null
            })
        }
        catch (exception) {
            throw exception

        }
    }
    updatelist = async (req, res, next) => {
        try {
            const id = req.params.id;
            console.log("list id is ", id);
            const data = await listSvc.update({ _id: id }, req.body)
            console.log("New data", req.body)
            res.json({
                result: data,
                message: "list updated",
                meta: null
            })
        }
        catch (exception) {
            throw exception
        }
    }
    deletelist = async (req, res, next) => {
        try {
            const id = req.params.id;
          
            const data = await listSvc.delete(id)
            console.log("dATA",data)
            res.json({
                result: data,
                message: "list deleted successfully",
                meta: null
            })
        }
        catch (exception) {
            throw exception
        }
    }
}
const listCtrl = new listController()
module.exports = listCtrl