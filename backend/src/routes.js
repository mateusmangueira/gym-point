import { Router } from 'express';

import CheckinController from './app/controllers/CheckinController';
import EnrollController from './app/controllers/EnrollController';
import HelpOrderController from './app/controllers/HelpOrderController';
import PlanController from './app/controllers/PlanController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import StudentHelpController from './app/controllers/StudentHelpController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.index); // Teste ok
routes.post('users', UserController.store); // Teste ok

routes.post('/sessions', SessionController.store); // Teste ok

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/help-orders', StudentHelpController.index);
routes.post('/students/:id/help-orders', StudentHelpController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update); // Teste ok

routes.get('/students', StudentController.index); // Teste ok
routes.get('/students/:id', StudentController.show); // Teste ok
routes.post('/students', StudentController.store); // Teste ok
routes.put('/students/:id', StudentController.update); // Teste ok
routes.delete('/students/:id', StudentController.delete); // Teste ok

routes.get('/plans', PlanController.index); // Teste ok
routes.post('/plans', PlanController.store); // Teste ok
routes.put('/plans/:id', PlanController.update); // Teste ok
routes.delete('/plans/:id', PlanController.delete); // Teste ok

routes.get('/enrolls', EnrollController.index); // Teste ok
routes.post('/enrolls', EnrollController.store); // Teste ok
routes.put('/enrolls/:id', EnrollController.update); // Teste ok
routes.delete('/enrolls/:id', EnrollController.delete); // Teste ok

routes.get('/help-orders', HelpOrderController.index); // Teste Failed
routes.post('/help-orders/:id/answer', HelpOrderController.store);

export default routes;
