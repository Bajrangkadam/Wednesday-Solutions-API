import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as cabBooking from '../services/cabBooking';
import { findUser, userValidator } from '../validators/userValidator';

const router = Router();

/**
 * GET /cab/
 */
router.get('/', (req, res, next) => {
  cabBooking
    .getAllNearByCabs()
    .then(data =>{
      res.json({ data })})
    .catch(err => next(err));
});

/**
 * POST /cab/book
 */
router.post('/book', (req, res, next) => {
  cabBooking
    .bookCab(req.body,req.userId)
    .then(data => res.status(HttpStatus.OK).send(data))
    .catch(err => next(err));
});

/**
 * GET /cab/bookhistory
 */
router.get('/bookhistory', (req, res, next) => {
  cabBooking
    .getAllBookHistory(req.userId)
    .then(data =>{
      res.json({ data })})
    .catch(err => next(err));
});

export default router;
