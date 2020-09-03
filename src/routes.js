import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import swaggerSpec from './utils/swagger';
import usersController from './controllers/users';
import cabController from './controllers/cabBooking';
import * as userService from './services/userService';
import { authenticate } from './authRoutes';
import { userValidator } from './validators/userValidator';
import * as swaggerui from "swagger-ui-express";

/**
 * Contains all API routes for the application.
 */
let router = Router();

/**
 * GET /api/swagger.json
 */
/* router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
}); */

router.use('/swagger', swaggerui.serve, swaggerui.setup(swaggerSpec));

router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});


/**
 * POST /api/login
 */
router.post('/login', userValidator, (req, res, next) => {
  userService.login(req.body.username, req.body.password)
    .then(data => {
      res.status(HttpStatus.OK).send(data);
    })
    .catch(err => next(err));
});

router.use('/users', authenticate, usersController);
router.use('/cab', authenticate, cabController);

export default router;
