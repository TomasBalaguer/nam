import { Router } from "express";
const router = Router();

import * as teamCtrl from '../controllers/team.controller';

import { authJwt } from './../middlewares'

router.get('/', authJwt.verifyToken, teamCtrl.getTeams)

router.post('/', [authJwt.verifyToken, authJwt.isAdmin || authJwt.isTrainer], teamCtrl.createTeam)

// router.get('/:messageId', messageCtrl.getMessageById)

// router.put('/:messageId', messageCtrl.updateMessageById)

// router.delete('/:messageId', [authJwt.verifyToken, authJwt.isAdmin], messageCtrl.deleteMessageById)


export default router;