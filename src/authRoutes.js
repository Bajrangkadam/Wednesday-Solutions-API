import * as jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';

export function tokenGeneration(userdata) {
    let token = jwt.sign(userdata, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP_TIME });
    return token;
};

export function authenticate(req, res, next) {
  const headerApp = (req.headers && req.headers.appname) || (req.headers && req.headers.applicationname);
  const headerToken = (req.headers && req.headers.token) || (req.headers && req.headers['x-aceess-token']);
  if (headerToken && headerApp) {
    if (headerApp.toLocaleLowerCase() !== process.env.APP_NAME.toLocaleLowerCase()) res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Error 401 - Unauthorized' });
    jwt.verify(headerToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Error 401 - Unauthorized' });
      } else {
        req.userId=decoded.id ? decoded.id :0;
        next();
      }
    });
  } else {
    res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Error 401 - Unauthorized' });
  }
};