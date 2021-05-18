import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";

import { CreateAppointmentService } from "../services/CreateAppointmentService";
import { AppointmentRepository } from "../repositories/AppointmentRepository";

import { ensureauthenticate } from "../middlewares/Ensureauthenticate";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureauthenticate);

appointmentsRouter.get("/", async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export { appointmentsRouter };
