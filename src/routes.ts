import { Router, Response, Request } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/', (req: Request, res: Response) => res.status(201).json({ message: "Api Working!!" }));
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
// routes.delete('/orphanages/:id', OrphanagesController.remove);

export default routes;