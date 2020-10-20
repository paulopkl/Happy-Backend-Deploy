"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const orphanages_view_1 = __importDefault(require("../views/orphanages_view"));
const Yup = __importStar(require("yup"));
const Orphanages_1 = __importDefault(require("../models/Orphanages"));
exports.default = {
    async index(req, res) {
        const orphanagesRepository = typeorm_1.getRepository(Orphanages_1.default);
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });
        return res.json(orphanages_view_1.default.renderMany(orphanages));
    },
    async show(req, res) {
        const id = req.params;
        const orphanagesRepository = typeorm_1.getRepository(Orphanages_1.default);
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });
        return res.json(orphanages_view_1.default.render(orphanage));
    },
    async create(req, res) {
        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends } = req.body;
        const orphanageRepository = typeorm_1.getRepository(Orphanages_1.default);
        const requestImages = req.files;
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
        });
        const orphanage = orphanageRepository.create(data);
        console.log(images);
        console.log(orphanage);
        await orphanageRepository.save(Object.assign({}, orphanage));
        // .catch(err => res.json(err))
        return res.status(201).json(orphanage);
    }
};
