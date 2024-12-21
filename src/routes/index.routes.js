import { Router } from 'express';

const router = Router();

import { makeExample } from "../controllers/examples.js";

//!ROUTES

router.get('/', makeExample)

export default router;
