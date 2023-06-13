import { Request, Response } from 'express';
import UserService from '../services/User';


export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.userService.read()

      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  public getUserById = async (req: Request, res: Response): Promise<Response> => {
    const { params: { id } } = req
    try {
      const user = await this.userService.readOne(parseInt(id))

      return res.status(200).json(user)
    } catch (error) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }
  }

  public createUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, job } = req.body
    let newUser = {
      id: 0,
      name,
      job,
      read_count: 0
    }

    const alreadyExist = await this.userService.alreadyExist(newUser)

    if (alreadyExist === 401) {
      return res.status(401).json({ message: 'Usuário já existe' })
    }

    let newId = await this.userService.getIdNumber()

    newUser = {
      id: newId += 1,
      name,
      job,
      read_count: 0
    }

    try {
      const result = await this.userService.create(newUser)

      return res.status(201).json({ message: 'Usuário criado com sucesso!', data: result })
    } catch (error) {
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  public deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { params: { id } } = req

    try {
      await this.userService.delete(parseInt(id))

      return res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }

  public updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { params: { id } } = req
    const { name, job } = req.body

    try {
      const result = await this.userService.update(parseInt(id), { name, job })

      return res.status(200).json({ message: 'Usuário atualizado com sucesso!', result })
    } catch (error) {
      return res.status(500).json({ message: 'Algo deu errado' })
    }
  }
}