import UpdateUserInterface from '../interfaces/UpdateUserInterface';
import UserInterface from '../interfaces/UserInterface';
import UserModel from '../model/User';

export default class UserService {
  private userModel: UserModel

  constructor() {
    this.userModel = new UserModel()
  }

  public async readOne(id: number): Promise<UserInterface> {
    return this.userModel.readOne(id)
  }

  public async read(): Promise<UserInterface[]> {
    return this.userModel.read()
  }

  public async create(object: UserInterface): Promise<UserInterface> {
    return this.userModel.create(object)
  }

  public async update(id: number, object: UpdateUserInterface): Promise<UserInterface> {
    return this.userModel.update(id, object)
  }

  public async delete(id: number): Promise<UserInterface[]> {
    return this.userModel.delete(id)
  }

  public async getIdNumber(): Promise<number> {
    return this.userModel.getIdNumber()
  }

  public async alreadyExist(object: UserInterface): Promise<number> {
    return this.userModel.alreadyExist(object)
  }
}