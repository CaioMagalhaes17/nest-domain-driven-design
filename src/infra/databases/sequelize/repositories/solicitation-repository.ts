import { Solicitation as SequelizeSolicitation} from "../model/solicitation.model";
import { SolicitationMapper } from "../mappers/solicitation-mapper";
import { Solicitation } from "src/domain/portal/enterprise/solicitation";
import { SolicitationRepository as DomainSolicitationRepository} from "src/domain/portal/application/repositories/solicitation-repository";

export class SequelizeSolicitationRepository implements DomainSolicitationRepository{
  constructor(private solicitation: SequelizeSolicitation) {}
  async fetchSolicitations(): Promise<Solicitation> {
    const [ result ] = await SequelizeSolicitation.findAll()
    return SolicitationMapper.toDomain(result)
  }
}
