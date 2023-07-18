import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Note from 'App/Models/Note'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'


export default class extends BaseSeeder {
  public async run () {

    await Note.query().delete()

    //insert user
    for (let indexUser = 0; indexUser < 3 ; indexUser++) {
      const user = await User.create({
        email: `user${indexUser + 1}@email.com`,
        password: (await Hash.make('password'))
      })
      
    for (let index = 0; index < 4; index++) {
      await Note.create({
        user_id: user.id,
        title: `Title ${user.email} ${index+1}`,
        content: `Content ${user.email} ${index+1}`
      })
    }
  }


  }
}
