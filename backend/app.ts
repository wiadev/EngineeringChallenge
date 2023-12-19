import express, {Request, Response, NextFunction} from 'express';
import {getMachineHealth} from './machineHealth';
import { auth } from 'express-oauth2-jwt-bearer';
import {
  AssemblyLinePart,
  MachineType,
  PaintingStationPart,
  QualityControlStationPart,
  WeldingRobotPart,
} from '../native-app/data/types';
import { db } from './data-source';
import { DataPoint } from './entity/DataPoint';
import { Score } from './entity/Score';

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
    try {
      const {
        machines,
      }: {
        machines: Record<
          MachineType,
          Record<
            | WeldingRobotPart
            | AssemblyLinePart
            | PaintingStationPart
            | QualityControlStationPart,
            string
          >
        >;
      } = req.body;
      const dataSource = await db();
      const score = new Score()
      score.email = req.email ?? "";
      score.machines = machines;
      if (result.factory) {
        score.factory = result.factory;
      }
      if (result.machineScores?.assemblyLine) {
        score.assemblyLine = result.machineScores?.assemblyLine;
      }
      if (result.machineScores?.paintingStation) {
        score.paintingStation = result.machineScores?.paintingStation;
      }
      if (result.machineScores?.qualityControlStation) {
        score.qualityControlStation = result.machineScores?.qualityControlStation;
      }
      if (result.machineScores?.weldingRobot) {
        score.weldingRobot = result.machineScores?.weldingRobot;
      }
    
      const scoreRepository = dataSource.getRepository(Score);
    
      await scoreRepository.save(score);
      res.json(result);
    } catch(err) {

    }
  }
});

app.post('/data-point', checkJwt, decodeToken, async (req: AuthRequest, res: Response) => {
  const {
    machineName,
    partName,
    partValue,
  }: {
    machineName: string,
    partName: string,
    partValue: string,
  } = req.body;

  try {
    const dataSource = await db();
    const dataPoint = new DataPoint()
    dataPoint.email = req.email ?? "";
    dataPoint.machineName = machineName;
    dataPoint.partName = partName;
    dataPoint.partValue = partValue;
  
    const dataPointRepository = dataSource.getRepository(DataPoint);
  
    await dataPointRepository.save(dataPoint);
    res.json(dataPoint);
  } catch(err) {
    res.status(400).json(err);
  }
});

app.get('/data-point', checkJwt, decodeToken, async (req: AuthRequest, res: Response) => {
  try {
    const dataSource = await db();  
    const dataPointRepository = dataSource.getRepository(DataPoint);
    const dataPoints = await dataPointRepository.find({ where: { email: req.email }});
    res.json(dataPoints);
  } catch(err) {
    res.status(400).json(err);
  }
});

app.get('/score', checkJwt, decodeToken, async (req: AuthRequest, res: Response) => {
  try {
    const dataSource = await db();  
    const scoreRepository = dataSource.getRepository(Score);
    const scores = await scoreRepository.find({ where: { email: req.email }});
    res.json(scores);
  } catch(err) {
    res.status(400).json(err);
  }
});

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
