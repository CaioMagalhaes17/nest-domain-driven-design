import { TesteRepository } from "src/domain/portal/application/repositories/teste-repository";
import { Solicitation as SequelizeSolicitation} from "../model/solicitation.model";
import { SolicitationMapper } from "../mappers/solicitation-mapper";
import { Solicitation } from "src/domain/portal/enterprise/solicitation";

export class SolicitationRepository implements TesteRepository{
  constructor(private solicitation: SequelizeSolicitation) {}
  async getTeste(): Promise<Solicitation> {
    const [ result ] = await SequelizeSolicitation.findAll()
    return SolicitationMapper.toDomain(result)
  }
}
