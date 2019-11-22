//Import do router para controlar as rotas da aplicacao
import { Router } from 'express';

//Importes dos Controllers da aplicacao
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import EnrollController from './app/controllers/EnrollController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import StudentHelpController from './app/controllers/StudentHelpController';
import PlanController from './app/controllers/PlanController';

//Import do Middleware de autenticacao da aplicacao
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

//Rotas sem autenticacao
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.post('/sessions', SessionController.store);
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

//Rotas para ordem de ajuda dos estudantes
routes.get('/students/:id/help-orders', StudentHelpController.index);
routes.post('/students/:id/help-orders', StudentHelpController.store);

//Middleware para autenticacao no sistema: usa JWT - Bearer Token
routes.use(authMiddleware);

//Rotas para estudantes
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);

routes.post('/students', StudentController.store);

routes.put('/students/:id', StudentController.update);

routes.delete('/students/:id', StudentController.delete);

//Rotas para os Planos das academias
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

//Rotas para matriculas em academia
routes.get('/enrolls', EnrollController.index);
routes.post('/enrolls', EnrollController.store);
routes.put('/enrolls/:id', EnrollController.update);
routes.delete('/enrolls/:id', EnrollController.delete);
routes.get('/help-orders', HelpOrderController.index);
routes.post('/help-orders/:id/answer', HelpOrderController.store);

export default routes;
