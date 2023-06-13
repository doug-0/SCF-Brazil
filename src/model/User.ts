import UserInterface from '../interfaces/UserInterface';
import fakeData from '../db';
import UpdateUserInterface from '../interfaces/UpdateUserInterface';

export default class UserModel {
  private users: UserInterface[]

  constructor() {
    this.users = fakeData
  }

  public async readOne(id: number): Promise<UserInterface> {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    user.read_count++

    return user
  }

  public async read(): Promise<UserInterface[]> {
    return this.users
  }

  public async create(object: UserInterface): Promise<UserInterface> {
    this.users.push(object)

    return object
  }

  public async update(id: number, object: UpdateUserInterface): Promise<UserInterface> {
    const updatedUser = await this.readOne(id);
    updatedUser.name = object.name
    updatedUser.job = object.job
  
    return updatedUser
  }

  public async delete(id: number): Promise<UserInterface[]> {
    const filterUser = this.users.filter((user) => user.id !== id)

    this.users = filterUser

    return this.users;
  }

  public getIdNumber(): number {
    return this.users.length
  }

  public alreadyExist(object: UserInterface) {
    const alreadyExist = this.users.find((user) => {
      return user.name === object.name
    })

    return alreadyExist ? 401 : 100
  }
}