import { SolicitationFormProps } from "@/domain/portal/enterprise/repair/solicitation.form"
import { ISolicitationRepository } from "../../repositories/repair/solicitation-repository.interface"
import { ISolicitationFormRepository } from "../../repositories/repair/solicitation-form.repository.interface"
import { OnSolicitationCreatedUseCase } from "./on-solicitation-created-use-case"
import { Either, right } from "@/core/Either"
import { ProfileNotFound } from "../../errors/profile/ProfileNotFound"
import { WebsocketGateway } from "../../gateways/websocket/websocket.gateway"
import { SaveNotificationUseCase } from "../notifications/save-notification"

type CreateSolicitationUseCaseResponse = Either<ProfileNotFound, string>
export class CreateSolicitationUseCase {
  constructor(
    private readonly solicitationRepository: ISolicitationRepository,
    private readonly solicitationFormRepository: ISolicitationFormRepository,
    private readonly onSolicitationCreatedUseCase: OnSolicitationCreatedUseCase,
    private readonly websocketGateway: WebsocketGateway,
    private readonly saveNotificationUseCase: SaveNotificationUseCase,
  ) {}

  async execute(data: {
    status: string
    profileId: string
    solicitationForm: SolicitationFormProps
  }): Promise<CreateSolicitationUseCaseResponse> {
    const resultForm = await this.solicitationFormRepository.create(
      data.solicitationForm,
    )

    const result = await this.solicitationRepository.create({
      status: data.status,
      clientProfileId: data.profileId,
      solicitationFormId: resultForm.id,
    })

    const notification = await this.saveNotificationUseCase.execute({
      message: "Defeito em " + data.solicitationForm.problemTopic,
      sendedDate: "17/04/2025",
      senderName: "Caio Magabunda",
      type: "newSolicitation",
    })
    console.log(notification)

    //await this.onSolicitationCreatedUseCase.execute(data.userId)
    return right(result.id)
  }
}
