//Import do router para controlar as rotas da aplicacao
import { Router } from 'express';

//Importes dos Controllers da aplicacao
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import EnrollController from './app/controllers/EnrollController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import StudentHelpController from './app/controllers/StudentHelpController';
import PlanController from './app/controllers/PlanController';

//Import dos Middleware da aplicacao
import authMiddleware from './app/middlewares/auth';
import studentMiddleware from './app/middlewares/studentMiddleware';
import planMiddleware from './app/middlewares/planMiddleware';
import enrollMiddleware from './app/middlewares/enrollMiddleware';
import enrollPlanMiddleware from './app/middlewares/enrollPlanMiddleware';
import enrollStudentMiddleware from './app/middlewares/enrollStudentMiddleware';
import helpOrderMiddleware from './app/middlewares/helpOrderMiddleware';

const routes = new Router();

//Rotas sem autenticacao
routes.post('/sessions', SessionController.store);
routes.get('/students/:id/checkins', studentMiddleware, CheckinController.index);
routes.post('/students/:id/checkins', studentMiddleware, CheckinController.store);

//Rotas para ordem de ajuda dos estudantes
routes.get('/students/:id/help-orders', studentMiddleware, StudentHelpController.index);
routes.post('/students/:id/help-orders', studentMiddleware, StudentHelpController.store);

//Middleware para autenticacao no sistema: usa JWT - Bearer Token
routes.use(authMiddleware);

//Rotas para estudantes
routes.get('/students', StudentController.index);
routes.get('/students/:id', studentMiddleware, StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', studentMiddleware, StudentController.update);
routes.delete('/students/:id', studentMiddleware, StudentController.delete);

//Rotas para os Planos das academias
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', planMiddleware, PlanController.update);
routes.delete('/plans/:id', planMiddleware, PlanController.delete);

//Rotas para matriculas em academia
routes.get('/enrolls', EnrollController.index);
routes.post('/enrolls', enrollPlanMiddleware, enrollStudentMiddleware, EnrollController.store);
routes.put('/enrolls/:id', enrollMiddleware, enrollPlanMiddleware, enrollStudentMiddleware, EnrollController.update);
routes.delete('/enrolls/:id', enrollMiddleware, EnrollController.delete);
routes.get('/help-orders', HelpOrderController.index);
routes.post('/help-orders/:id/answer', helpOrderMiddleware, HelpOrderController.store);

export default routes;
