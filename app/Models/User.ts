import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'full_name' })
  public fullName: string;

  @column({ columnName: 'display_name' })
  public displayName: string;

  @column({ columnName: 'auth_type' })
  public authType: string;
  
  @column({ columnName: 'phone_number' })
  public phoneNumber: string;

  @column()
  public email: string;

  @column()
  public status: string;

  @column({ serializeAs: null })
  public password: string

  @column()
  public token?: string | null

  @column({ columnName: 'token_created_at' })
  public tokenCreatedAt?: Date | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}