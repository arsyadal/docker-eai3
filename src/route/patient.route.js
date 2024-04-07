import express from "express";
import { getPatients, createPatient, getPatient, deletePatient, updatePatient } from "../controller/patient.controller.js";

const patientRoute = express.Router();

patientRoute.route("/").get(getPatient).post(createPatient);

patientRoute.route("/:id").get(getPatient).put(updatePatient).delete(deletePatient);

export default patientRoute;
