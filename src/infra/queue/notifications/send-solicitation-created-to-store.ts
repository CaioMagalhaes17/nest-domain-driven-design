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
    const { topic, solicitationId, timePreference, name, storeId } = job.data

    const message = `
    <div className="flex flex-col">
      <span>Defeito em ${topic}</span>
      <span className="text-green flex flex-row">${timePreference}</span>
    </div>
    `
    const response = await this.saveNotificationUseCase.execute({
      message: message,
      profileId: storeId,
      senderName: name,
      type: "newBudget",
      opts: { solicitationId },
    })
    await this.websocketGateway.sendNotification({
      profileId: storeId,
      notificationBody: response,
    })
    console.log("mandou notf new solicitation", storeId)
  }
}
