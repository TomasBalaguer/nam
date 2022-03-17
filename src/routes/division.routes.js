import { Router } from "express";
const router = Router();

import * as divisionCtrl from '../controllers/division.controller';

import { authJwt } from './../middlewares'

router.get('/', authJwt.verifyToken, divisionCtrl.getDivisions)

router.post('/', [authJwt.verifyToken, authJwt.isAdmin || authJwt.isTrainer], divisionCtrl.cerateDivision)

// router.get('/:messageId', messageCtrl.getMessageById)

// router.put('/:messageId', messageCtrl.updateMessageById)

// router.delete('/:messageId', [authJwt.verifyToken, authJwt.isAdmin], messageCtrl.deleteMessageById)


export default router;