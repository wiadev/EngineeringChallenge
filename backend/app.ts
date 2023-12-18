import express, {Request, Response, NextFunction} from 'express';
import {getMachineHealth} from './machineHealth';
import { auth } from 'express-oauth2-jwt-bearer';

const app = express();
const port = 3001;

interface AuthRequest extends Request {
  email?: string;
}
// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'https://dev-508w33yg5pe4k7ak.us.auth0.com/api/v2/',
  issuerBaseURL: `https://dev-508w33yg5pe4k7ak.us.auth0.com/`,
});

const decodeToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userInfoRes = await fetch(`https://dev-508w33yg5pe4k7ak.us.auth0.com/userinfo`, {
    headers: {Authorization: req.header('authorization') ?? ""}
  });
  const { email } = await userInfoRes.json();
  req.email = email;
  next()
}

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to get machine health score
app.post('/machine-health', checkJwt, decodeToken, async (req: AuthRequest, res: Response) => {
  const result = getMachineHealth(req);
  if (result.error) {
    res.status(400).json(result);
  } else {
    res.json(result);
  }
});

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
