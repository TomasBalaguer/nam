import { Router } from "express";
const router = Router();

import * as messageCtrl from '../controllers/messages.controller';

import { authJwt } from './../middlewares'

router.get('/', messageCtrl.getMessages)

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, authJwt.isTrainer], messageCtrl.createMessage)

router.get('/:messageId', messageCtrl.getMessageById)

router.put('/:messageId', messageCtrl.updateMessageById)

router.delete('/:messageId', [authJwt.verifyToken, authJwt.isAdmin], messageCtrl.deleteMessageById)


export default router;