import { Appointment } from "../model/Appointment";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export { AppointmentRepository };
