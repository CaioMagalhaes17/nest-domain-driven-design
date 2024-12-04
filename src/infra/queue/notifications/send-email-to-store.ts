import { Process, Processor } from "@nestjs/bull"
import { Job } from "bull"

@Processor("sendEmailToStore")
export class SendEmailToStore {
  @Process()
  async handleEmail(job: Job) {
    const { email } = job.data

    console.log("queuezinha do league", email)
  }
}
