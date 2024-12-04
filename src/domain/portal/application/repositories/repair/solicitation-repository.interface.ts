import { BaseRepository } from "@/core/infra/base.repository"
import { Solicitation } from "@/domain/portal/enterprise/repair/solicitation"

export interface ISolicitationRepository extends BaseRepository<Solicitation> {
  getevery()
}
