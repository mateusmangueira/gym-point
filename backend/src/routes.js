import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import authMiddleware from './app/middlewares/auth';
import studentMiddleware from './app/middlewares/studentMiddleware';
import planMiddleware from './app/middlewares/planMiddleware';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.get('/students/:id/checkins', studentMiddleware, CheckinController.index);
routes.post('/students/:id/checkins', studentMiddleware, CheckinController.store);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.get('/students/:id', studentMiddleware, StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', studentMiddleware, StudentController.update);
routes.delete('/students/:id', studentMiddleware, StudentController.delete);
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', planMiddleware, PlanController.update);
routes.delete('/plans/:id', planMiddleware, PlanController.delete);

export default routes;
