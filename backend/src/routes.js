import { Router } from 'express';

import CheckinController from './app/controllers/CheckinController';
import EnrollController from './app/controllers/EnrollController';
import HelpOrderController from './app/controllers/HelpOrderController';
import PlanController from './app/controllers/PlanController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/students/sign', StudentController.signIn);
routes.get('/students/:id/help-orders', HelpOrderController.questionsStudent);
routes.post('/students/:id/help-orders', HelpOrderController.storeQuestion);
routes.get('/students/:id/checkins', StudentController.checkins);

routes.get('/help-orders(/:id)?', HelpOrderController.index);

routes.post('/checkins', CheckinController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/enrolls', EnrollController.index);
routes.post('/enrolls', EnrollController.store);
routes.put('/enrolls/:id', EnrollController.update);
routes.delete('/enrolls/:id', EnrollController.delete);

routes.get('/help-orders', HelpOrderController.index);
routes.get('/help-orders/:id', HelpOrderController.show);
routes.post('/help-orders/:id/answer', HelpOrderController.storeAnswer);

export default routes;
