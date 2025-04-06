/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotificationBody } from "@/domain/portal/enterprise/notification/notification.entity"
import { NotificationPresenter } from "@/infra/presenters/notification/notification.presenter"
import {
  WebSocketGateway as NestWebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from "@nestjs/websockets"
import { Server, Socket } from "socket.io"

@NestWebSocketGateway({ cors: { origin: "*" } })
export class WebsocketGateway {
  @WebSocketServer() server: Server

  private users = new Map<string, string>() // userId -> socketId

  handleConnection(client: Socket) {
    const profileId = client.handshake.query.profileId as string
    if (profileId) {
      this.users.set(profileId, client.id)
      console.log(`User ${profileId} connected with socket ID: ${client.id}`)
    }
  }

  handleDisconnect(client: Socket) {
    const profileId = [...this.users.entries()].find(
      ([_, id]) => id === client.id,
    )?.[0]
    if (profileId) {
      this.users.delete(profileId)
      console.log(`User ${profileId} disconnected`)
    }
  }

  @SubscribeMessage("sendNotification")
  sendNotification(
    @MessageBody()
    {
      profileId,
      notificationBody,
    }: {
      profileId: string
      notificationBody: NotificationBody
    },
  ) {
    const socketId = this.users.get(profileId)
    console.log("asndoisandaindasoind")
    if (socketId) {
      console.log("bbbbb")
      this.server.to(socketId).emit("notification", {
        message: NotificationPresenter.toHttp(notificationBody),
      })
    }
  }
}
