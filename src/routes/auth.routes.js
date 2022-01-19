import { Router } from "express";
const router = Router();

import * as authCtrl from './../controllers/auth.controller';
import { verifySignup, authJwt } from './../middlewares'

router.post('/signin', authCtrl.signIn)

router.post('/signup', [verifySignup.verifyDuplicateEmail] ,authCtrl.signUp)

router.post('/user', [authJwt.verifyToken], authCtrl.getUser)


export default router;