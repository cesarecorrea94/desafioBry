import { Router } from 'express';

import { checkBodyRequiredParameters, checkParamIdName } from '../middlewares/genericMiddlewares'
import FuncionarioParamChecker from '../middlewares/FuncionarioParameterChecker';
import EmpresaParamChecker from '../middlewares/EmpresaParameterChecker';

import FuncionarioController from '../controllers/FuncionarioController'
import FEmpresasAssociadasController from '../controllers/FuncionarioEmpresasAssociadasController'
import Funcionario from '../models/Funcionario';

const router = Router();

router.get('/funcionarios',
    FuncionarioParamChecker.checkQueryStringParamTypes,
    FuncionarioController.get);

router.get('/funcionarios/:funcionarioId',
    checkParamIdName('funcionarioId'),
    FuncionarioController.getId);

router.delete('/funcionarios/:funcionarioId',
    checkParamIdName('funcionarioId'),
    FuncionarioController.deleteId);

router.put('/funcionarios/:funcionarioId',
    checkParamIdName('funcionarioId'),
    FuncionarioParamChecker.checkBodyParamTypes,
    FuncionarioController.putId);

router.post('/funcionarios',
    checkBodyRequiredParameters(Funcionario.requiredProps),
    FuncionarioParamChecker.checkBodyParamTypes,
    FuncionarioController.post);


router.get('/funcionarios/:funcionarioId/empresas',
    checkParamIdName('funcionarioId'),
    FEmpresasAssociadasController.get);

router.get('/funcionarios/:funcionarioId/empresas/:empresaId',
    checkParamIdName('funcionarioId'),
    checkParamIdName('empresaId'),
    FEmpresasAssociadasController.getId);

router.delete('/funcionarios/:funcionarioId/empresas/:empresaId',
    checkParamIdName('funcionarioId'),
    checkParamIdName('empresaId'),
    FEmpresasAssociadasController.deleteId);

router.post('/funcionarios/:funcionarioId/empresas',
    checkParamIdName('funcionarioId'),
    checkBodyRequiredParameters(['cnpj']),
    EmpresaParamChecker.checkBodyParamTypes,
    FEmpresasAssociadasController.post);

export default router;
