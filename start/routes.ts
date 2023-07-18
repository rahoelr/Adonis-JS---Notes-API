import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('/note', 'NotesController')
}).middleware('auth')


Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')