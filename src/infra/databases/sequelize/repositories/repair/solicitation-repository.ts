import { Solicitation as SequelizeSolicitation } from "../../model/repair/solicitation.model"
import { SolicitationMapper } from "../../mappers/repair/solicitation-mapper"
import { Solicitation } from "src/domain/portal/enterprise/solicitation"
import { SolicitationRepository as DomainSolicitationRepository } from "src/domain/portal/application/repositories/repair/solicitation-repository"
import { SolicitationForm } from "../../model/repair/form.model"
import { SolicitationDTO } from "src/domain/portal/application/dto/solicitation.dto"

export class SequelizeSolicitationRepository
  implements DomainSolicitationRepository
{
  constructor(private solicitation: SequelizeSolicitation) {}
  async fetchSolicitations(userId: string): Promise<Solicitation[]> {
    const result = await SequelizeSolicitation.findAll({
      include: [{ model: SolicitationForm, as: "solicitation_form" }],
      where: { fk_id_user: userId },
    })
    return result.map((item) => SolicitationMapper.toDomain(item))
  }

  async createSolicitation(solicitationPayload: SolicitationDTO) {
    const result = await SequelizeSolicitation.create({
      fk_id_user: solicitationPayload.userId,
      status: solicitationPayload.status,
      fk_id_form: solicitationPayload.formId,
    })
    return result
  }
}
