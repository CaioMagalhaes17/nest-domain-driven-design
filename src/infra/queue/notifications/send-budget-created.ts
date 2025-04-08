import { WebsocketGateway } from "@/domain/portal/application/gateways/websocket/websocket.gateway"
import { SaveNotificationUseCase } from "@/domain/portal/application/use-cases/notifications/save-notification"
import { Process, Processor } from "@nestjs/bull"
import { Job } from "bull"

@Processor("sendBudgetCreatedToStore")
export class SendBudgetCreatedToStore {
  constructor(
    private saveNotificationUseCase: SaveNotificationUseCase,
    private websocketGateway: WebsocketGateway,
  ) {}
  @Process()
  async handleNotification(job: Job) {
    const {
      clientProfileId,
      topic,
      storeName,
      price,
      budgetId,
      storeProfileImg,
      solicitationId,
    } = job.data
    const message = `
    <div className="flex flex-col">
      <span>Defeito em ${topic}</span>
      <span className="text-green flex flex-row">${price}</span>
    </div>
    `
    const response = await this.saveNotificationUseCase.execute({
      message: message,
      profileId: clientProfileId,
      senderName: storeName,
      type: "newBudget",
      opts: { budgetId, storeProfileImg, solicitationId },
    })
    await this.websocketGateway.sendNotification({
      profileId: clientProfileId,
      notificationBody: response,
    })
    console.log("caiu aqui?", clientProfileId)
  }
}
