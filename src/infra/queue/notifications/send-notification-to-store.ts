import { Process, Processor } from "@nestjs/bull"
import { Job } from "bull"

@Processor("sendNotificationToStore")
export class SendNotificationToStore {
  @Process()
  async handleNotification(job: Job) {
    const { storeProfileId } = job.data

    console.log("queuezinha do league", storeProfileId)
  }
}
