import { getCustomRepository } from "typeorm";
import { startOfHour } from "date-fns";
import { Appointment } from "../model/Appointment";
import { AppointmentRepository } from "../repositories/AppointmentRepository";
import { AppError } from "../errors/AppError";

interface IRequest {
  provider_id: string;
  date: Date;
}

/**
 * Dependency inversion -> Sempre que o service tiver uma dependência externa
 * Ao invés de a gente instanciar, a gente rece como parâmetro na classe.
 */

class CreateAppointmentService {
  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = await appointmentRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentsInSameDate) {
      throw new AppError("this appointmnet is already booking");
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export { CreateAppointmentService };
