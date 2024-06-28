import { Solicitation as SequelizeSolicitation } from '../../model/repair/solicitation.model';
import { SolicitationMapper } from '../../mappers/repair/solicitation-mapper';
import { Solicitation } from 'src/domain/portal/enterprise/solicitation';
import { SolicitationRepository as DomainSolicitationRepository } from 'src/domain/portal/application/repositories/solicitation-repository';
import { Form } from '../../model/repair/form.model';

export class SequelizeSolicitationRepository
  implements DomainSolicitationRepository
{
  constructor(private solicitation: SequelizeSolicitation) {}
  async fetchSolicitations(userId: string): Promise<Solicitation[]> {
    const result = await SequelizeSolicitation.findAll({
      include: [{ model: Form, as: 'solicitation_form' }],
      where: {'fk_id_user' : userId}
    });
    return result.map((item) => SolicitationMapper.toDomain(item))
  }
}
