import { Request } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Note from 'App/Models/Note'
import authConfig from 'Config/auth'

export default class NotesController {
public async index({ response, auth }: HttpContextContract) {
const notes = await Database.from('notes').where({ user_id: (auth.user?.id)})
return response.json({
data: {
notes: notes
}
})
}

public async create({}: HttpContextContract) {}

public async store({ request, response, auth }: HttpContextContract) {
const { title, content } = request.body()
await Note.create({
title: title,
content: content,
user_id: auth.user?.id
})
return response.json({
message: 'success insert data'
})
}

public async show({ params, response, auth }: HttpContextContract) {
const { id } = params
const note = await Note.query()
.where({ id: id})
.where({ user_id: (auth.user?.id) })
.firstOrFail()

return response.json({
data: {
note: note
}
})
}

public async edit({}: HttpContextContract) {}

public async update({ params, request, response, auth }: HttpContextContract) {
// get parameter
const { id } = params

// get body request
const { title, content } = request.body()

// get exist data
const note = await Note.query()
.where({ id: id})
.where({ user_id: (auth.user?.id) })
.firstOrFail()

//update data
note.merge({
title: title,
content: content
}).save()

return response.json({
message: 'success insert data'
})

}

public async destroy({params, response, auth}: HttpContextContract) {
const { id } = params

const note = await Note.query()
.where({ id: id})
.where({ user_id: (auth.user?.id) })
.firstOrFail()

//delete query
await note.delete()

// return
return response.json({
message: 'success delete data'
})
}


}
