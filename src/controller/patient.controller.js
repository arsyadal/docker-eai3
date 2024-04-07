import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERY from "../query/patient.query.js";

const HttpStatus = {
  OK: { code: 200, status: "OK" },
  CREATED: { code: 201, status: "Created" },
  NOT_FOUND: { code: 404, status: "Not Found" },
  INTERNAL_SERVER_ERROR: { code: 500, status: "Internal Server Error" },
  BAD_REQUEST: { code: 400, status: "Bad Request" },
  UNAUTHORIZED: { code: 401, status: "Unauthorized" },
};

export const getPatients = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}`, "fetching patients");
  database.query(QUERY.SELECT_PATIENT, (error, results) => {
    if (!results) {
      res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, "No patients found"));
    } else {
      res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Patients found", { patients: results })); // Assuming results is the array of patients
    }
  });
};

export const createPatient = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}`, "creating patient");
  database.query(QUERY.CREATE_PATIENT_PROCEDURE, Object.values(req.body), (error, results) => {
    if (!results) {
      logger.error(error.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occured`));
    } else {
      // const patient = { id: results, insertId, ...req.body, created_at: new Date() };
      const patient = resultsc[0][0];

      res.status(HttpStatus.CREATED.code).send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Patient created`, { patient })); // Assuming results is the array of patients
    }
  });
};

export const getPatient = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}`, `fetching patient`);
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
    if (!results[0]) {
      res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Patient by id ${req.params.id} was not found`));
    } else {
      res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Patient Retrieved`, results[0])); // Assuming results is the array of patients
    }
  });
};

export const updatePatient = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}`, `Fetching patient`);
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
    if (!results[0]) {
      res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Patient by id ${req.params.id} was not found`));
    } else {
      logger.info(`${req.method} ${req.originalUrl}`, `Updating patient`);
      database.query(QUERY.UPDATE_PATIENT, [...Object.values(req.body), req.params.id], (error, results) => {
        if (!error) {
          res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Patient Updated`, { id: req.params.id, ...req.body }));
        } else {
          logger.error(error.message);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occured`));
        }
      });
    }
  });
};

export const deletePatient = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}`, `deleting patient`);
  database.query(QUERY.DELETE_PATIENT, [req.params.id], (error, results) => {
    if (!results.affectedRows > 0) {
      res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Patient deleted`, results[0]));
    } else {
      res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Patient by id ${req.params.id} was not found`));
    }
  });
};

export default HttpStatus;
