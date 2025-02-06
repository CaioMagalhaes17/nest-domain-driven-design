import { Solicitation } from "src/domain/portal/enterprise/repair/solicitation"

export class SolicitationPresenter {
  static toHttp(solicitation: Solicitation) {
    return {
      id: solicitation.id,
      createdAt: solicitation.createdAt,
      status: solicitation.status,
      profileId: solicitation.clientProfileId,
      clientProfile: {
        id: solicitation.clientProfile.id,
        name: solicitation.clientProfile.name,
        email: solicitation.clientProfile.email,
        profileImg: solicitation.clientProfile.profileImg,
        telNumber: solicitation.clientProfile.telNumber,
        userId: solicitation.clientProfile.userId,
        rating: solicitation.clientProfile.rating,
      },
      form: {
        problemTopic: solicitation.form.problemTopic,
        problemForm: solicitation.form.problemForm,
        phoneForm: solicitation.form.phoneForm,
        deliveryPreference: solicitation.form.deliveryPreference,
        timePreference: solicitation.form.timePreference,
        details: solicitation.form.details,
      },
    }
  }
}
