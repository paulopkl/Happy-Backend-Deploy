import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanages';

export default {
    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return res.json(orphanageView.renderMany(orphanages));
    },
    
    async show(req: Request, res: Response) {
        const id = req.params;
        const orphanagesRepository = getRepository(Orphanage);
        
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });
            
        return res.json(orphanageView.render(orphanage));
    },

    // async remove(req: Request, res: Response) {
    //     const id = req.params;
        
    //     const orphanagesRepository = getRepository(Orphanage);
    //     const orphanage = await orphanagesRepository.createQueryBuilder().softDelete();

    //     return res.json({ message: 'Sucesso' });
    // },

    async create(req: Request, res: Response) {

        const { 
            name, 
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours,
            open_on_weekends 
        } = req.body;
        
        const orphanageRepository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[];
        
        const images = requestImages.map(image => ({ path: image.filename }));

        const data = { 
            name, 
            latitude,
            longitude, 
            about, 
            instructions, 
            opening_hours, 
            open_on_weekends: open_on_weekends === 'true',
            images,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome é Obrigatório!'),
            latitude: Yup.number().required('Latitude é Obrigatório!'),
            longitude: Yup.number().required('Longitude é Obrigatório!'),
            about: Yup.string().required('Descrição é Obrigatório!').max(300),
            instructions: Yup.string().required('Instruções são Obrigatórias!'),
            opening_hours: Yup.string().required('Nome é Obrigatório!'),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required(),
            }))
        });

        await schema.validate(data, {
            abortEarly: false // Evita que ao encontrar um unico erro ele pare o processamento
        })
    
        const orphanage = orphanageRepository.create(data);

        console.log(images);
        console.log(orphanage);
    
        await orphanageRepository.save({ ...orphanage })
            // .catch(err => res.json(err))
            
        return res.status(201).json(orphanage);
    
    }
}