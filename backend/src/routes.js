import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import EnrollController from './app/controllers/EnrollController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import StudentHelpController from './app/controllers/StudentHelpController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.post('/sessions', SessionController.store);
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/help-orders', StudentHelpController.index);
routes.post('/students/:id/help-orders', StudentHelpController.store);

routes.use(authMiddleware);

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
routes.post('/help-orders/:id/answer', HelpOrderController.store);

export default routes;
