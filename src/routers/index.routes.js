import { Router } from "express";
import { getPassengers } from "../controllers/index.controllers.js";

const indexRouter = Router();

indexRouter.get("/passengers/travels", getPassengers);


export default indexRouter;