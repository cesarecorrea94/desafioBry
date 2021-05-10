import { Router } from 'express';

import { checkBodyRequiredParameters, checkParamIdName } from '../middlewares/genericMiddlewares'
import EmpresaParamChecker from '../middlewares/EmpresaParameterChecker';
import FuncionarioParamChecker from '../middlewares/FuncionarioParameterChecker';

import EmpresaController from '../controllers/EmpresaController'
import EFuncionariosVinculadosController from '../controllers/EmpresaFuncionariosVinculadosController'
import Empresa from '../models/Empresa';

const router = Router();

router.get('/empresas',
    EmpresaParamChecker.checkQueryStringParamTypes,
    EmpresaController.get);

router.get('/empresas/:empresaId',
    checkParamIdName('empresaId'),
    EmpresaController.getId);

router.delete('/empresas/:empresaId',
    checkParamIdName('empresaId'),
    EmpresaController.deleteId);

router.put('/empresas/:empresaId',
    checkParamIdName('empresaId'),
    EmpresaParamChecker.checkBodyParamTypes,
    EmpresaController.putId);

router.post('/empresas',
    checkBodyRequiredParameters(Empresa.requiredProps),
    EmpresaParamChecker.checkBodyParamTypes,
    EmpresaController.post);


router.get('/empresas/:empresaId/funcionarios',
    checkParamIdName('empresaId'),
    EFuncionariosVinculadosController.get);

router.get('/empresas/:empresaId/funcionarios/:funcionarioId',
    checkParamIdName('empresaId'),
    checkParamIdName('funcionarioId'),
    EFuncionariosVinculadosController.getId);

router.delete('/empresas/:empresaId/funcionarios/:funcionarioId',
    checkParamIdName('empresaId'),
    checkParamIdName('funcionarioId'),
    EFuncionariosVinculadosController.deleteId);

router.post('/empresas/:empresaId/funcionarios',
    checkParamIdName('empresaId'),
    checkBodyRequiredParameters(['cpf']),
    FuncionarioParamChecker.checkBodyParamTypes,
    EFuncionariosVinculadosController.post);

export default router;
