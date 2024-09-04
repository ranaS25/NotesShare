import { Router } from 'express'
import { addNote, shareNote } from '../controllers/notes.controller.js'
import { verifyUser } from '../middlewares/auth.middleware.js'

const router =  Router()
router.route('/create').post(verifyUser, addNote)
router.route("/share").post(verifyUser, shareNote);

export default router;