import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import VerifyUser from '../middleware/VerifyUser';

const routes = Router()

const userController = new UserController()

routes.get('/', function(_req: Request, res: Response) {
  res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  `)
})

routes.get('/users', userController.getAllUsers)
routes.get('/user/:id', userController.getUserById)
routes.post('/users', userController.createUser)
routes.delete('/user/:id', VerifyUser.check, userController.deleteUser)
routes.put('/user/:id', VerifyUser.check, userController.updateUser)

export default routes;