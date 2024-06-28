import { Solicitation } from "../../enterprise/solicitation";

export abstract class SolicitationRepository {
  abstract fetchSolicitations(userId: string): Promise<Solicitation[]>
}