import { Solicitation } from "../../../enterprise/repair/solicitation"
import { SolicitationDTO } from "../../dto/solicitation.dto"

export abstract class SolicitationRepository {
  abstract fetchSolicitations(userId: number): Promise<Solicitation[] | void>
  abstract createSolicitation(
    solicitationPayload: SolicitationDTO,
  ): Promise<number>
  abstract fetchById(solicitationId: number): Promise<Solicitation | void>
  abstract deleteById(solicitationId: number): Promise<void>
}
