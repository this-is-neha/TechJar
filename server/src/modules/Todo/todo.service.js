const listModel = require("./todo.model")
const slugify = require("slugify")

class ListService {

    transformData = (req) => {
        const payload = req.body;

        console.log("list  data is ", payload)
        payload.slug = slugify(payload.title, { lower: true })
        return {
            title: payload.title,
            slug: payload.slug,
            description: payload.description,
            duedate: payload.duedate,
            status: payload.status
        }
    }

    create = async (data) => {
        try {
            const listObj = new listModel(data)
            return await listObj.save()
        }
        catch (exception) {
            console.error("Error creating list:", exception);
            res.status(500).json({
                result: null,
                message: "Failed to create list",
                error: exception.message
            });
        }
    }
    listAll = async () => {
        try {
            const listObj = await listModel.find()
            return listObj
        }
        catch (exception) {
            console.log("All brands fetched ")
            throw exception;

        }
    }
    listOneById = async (id) => {
        try {
            console.log("Brand Id is ", id)
            const listObj = await listModel.findById(id)
            return listObj
        }

        catch (exception) {
            console.error("Error creating list:", exception);
            res.status(500).json({
                result: null,
                message: "Failed to create list",
                error: exception.message
            });
        }
    }

    listOne = async (filter) => {
        try {
            console.log("Title is ", filter)
            const listObj = await listModel.findOne(filter)
            return listObj
        }
        catch (exception) {
            console.error("Error creating list:", exception);
            res.status(500).json({
                result: null,
                message: "Failed to create list",
                error: exception.message
            });
        }
    }
    update = async (id, data) => {
        try {
            console.log("New list data", data);
            const listObj = await listModel.findByIdAndUpdate(id, data, { new: true })
            return listObj
        }
        catch (exception) {
            console.error("Error creating list:", exception);
            res.status(500).json({
                result: null,
                message: "Failed to create list",
                error: exception.message
            });
        }
    }
    delete = async (id) => {
        try {
            const listObj = await listModel.findByIdAndDelete(id)
            return listObj
        }
        catch (exception) {
            throw exception
        }
    }

}
const listSvc = new ListService()
module.exports = listSvc