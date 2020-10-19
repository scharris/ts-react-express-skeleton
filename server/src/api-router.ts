import express from "express";
import {router as foosRouter} from "./foos/foos-router";

export default express.Router()
   .use('/foos', foosRouter)
   // .use(...)
   // ...
;
