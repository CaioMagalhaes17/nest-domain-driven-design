import { Solicitation } from "../../../enterprise/repair/solicitation"
import { SolicitationDTO } from "../../dto/solicitation.dto"

export abstract class SolicitationRepository {
  abstract fetchSolicitations(userId: string): Promise<Solicitation[]>
  abstract createSolicitation(
    solicitationPayload: SolicitationDTO,
  ): Promise<Solicitation>
  abstract fetchById(solicitationId: string): Promise<Solicitation | void>
  abstract deleteById(solicitationId: string): Promise<void>
}
