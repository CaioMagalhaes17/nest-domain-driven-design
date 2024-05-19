import { Solicitation } from "src/domain/portal/enterprise/solicitation";
import { Solicitation as SequelizeSolicitation} from "../model/solicitation.model";
//import { Solicitation }

export class SolicitationMapper {
  static toDomain(row: SequelizeSolicitation) : Solicitation{
    return Solicitation.create(
      {
        name: row.name
      }, 
      row.id
    )
  }
}