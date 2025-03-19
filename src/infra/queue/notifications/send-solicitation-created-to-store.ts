import { WebsocketGateway } from "@/domain/portal/application/gateways/websocket/websocket.gateway"
import { SaveNotificationUseCase } from "@/domain/portal/application/use-cases/notifications/save-notification"
import { Process, Processor } from "@nestjs/bull"
import { Job } from "bull"

@Processor("sendSolicitationCreatedToStore")
export class SendSolicitationCreatedToStore {
  constructor(
    private saveNotificationUseCase: SaveNotificationUseCase,
    private websocketGateway: WebsocketGateway,
  ) {}
  @Process()
  async handleNotification(job: Job) {
    const { id, topic, name, solicitationId } = job.data
    const response = await this.saveNotificationUseCase.execute({
      message: "Defeito em " + topic,
      profileId: id,
      senderName: name,
      type: "newSolicitation",
      opts: { solicitationId },
    })
    await this.websocketGateway.sendNotification({
      profileId: id,
      notificationBody: response,
    })
    console.log("moshpit", id)
  }
}
