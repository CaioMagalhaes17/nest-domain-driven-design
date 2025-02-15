import { BaseMapper } from "@/core/infra/base.mapper"
import { Feedback as MongoFeedback } from "../../schemas/feedback/feedback-schema"
import { StoreProfile } from "@/domain/portal/enterprise/profile/store/store-profile"
import { Injectable } from "@nestjs/common"
import { ClientProfile } from "@/domain/portal/enterprise/profile/client/client-profile"
import { Feedback } from "@/domain/portal/enterprise/feedback/feedback"

@Injectable()
export class FeedbackMapper implements BaseMapper<MongoFeedback, Feedback> {
  toDomainArray(rows: MongoFeedback[]): Feedback[] {
    if (!rows || rows.length === 0) return []
    return rows.map((row) => this.toDomain(row)).filter((item) => item !== null)
  }

  toDomain(row: MongoFeedback): Feedback {
    const { _id, clientProfileId, storeProfileId, ...rest } = row.toObject()

    const tentativa = Feedback.create(
      {
        clientProfile: ClientProfile.create(
          clientProfileId,
          clientProfileId._id,
        ),
        storeProfile: StoreProfile.create(storeProfileId, storeProfileId._id),
        ...rest,
      },
      _id,
    )
    return tentativa
  }
}
