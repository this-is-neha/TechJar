const joi= require("joi")
const listDTo=joi.object({
title:joi.string().min(3).required(),
description: joi.string().required(),
status:joi.string().valid("pending","completed").required(),
duedate:joi.date().required()

})
module.exports={
    listDTo
}
