import { Solicitation } from "../../enterprise/solicitation";

export abstract class TesteRepository {
  abstract getTeste(): Promise<Solicitation>
}