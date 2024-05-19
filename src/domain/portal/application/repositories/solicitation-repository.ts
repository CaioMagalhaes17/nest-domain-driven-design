import { Solicitation } from "../../enterprise/solicitation";

export abstract class SolicitationRepository {
  abstract fetchSolicitations(): Promise<Solicitation>
}