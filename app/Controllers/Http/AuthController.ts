import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {

    public async register({ request, response, auth }: HttpContextContract) {
        const { email, password } = request.body()

        const oldUser = await User.query().where({ email: email}).first()
        if(oldUser){
            return response.status(422).json({
                message: 'email sudah terdaftar'
            })
        }

        const hashedPassword = await Hash.make(password)

            const user = await User.create({
                email: email,
                password: hashedPassword
            })

            //generate API TOKENs
            const token = await auth.use('api').generate(user)

            return response.json({
                data: {
                    user: user,
                    token: token
                }
            })
      }

      public async login({ request, response, auth }: HttpContextContract) {
        const { email, password } = request.body()

        const user = await User.query().where({ email: email}).first()
        if(!user){
            return response.status(422).json({
                message: 'email tidak terdaftar'
            })
        }

        if(!(await Hash.verify(user.password, password))) {
            return response.status(422).json({
                message: 'password salah'
            })
        }

            //generate API TOKENs
            const token = await auth.use('api').generate(user)

            return response.json({
                data: {
                    user: user,
                    token: token
                }
            })
      }

}
