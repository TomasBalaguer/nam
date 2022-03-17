import { Router } from "express";
const router = Router();

import * as scheduleCtrl from '../controllers/schedule.controller';

import { authJwt } from './../middlewares'

router.get('/', authJwt.verifyToken, scheduleCtrl.getEvents)

router.post('/', [authJwt.verifyToken, authJwt.isAdmin || authJwt.isTrainer], scheduleCtrl.createEvent)

// router.get('/:messageId', messageCtrl.getMessageById)

// router.put('/:messageId', messageCtrl.updateMessageById)

// router.delete('/:messageId', [authJwt.verifyToken, authJwt.isAdmin], messageCtrl.deleteMessageById)


export default router;