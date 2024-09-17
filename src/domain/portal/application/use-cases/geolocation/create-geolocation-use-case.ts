export class CreateGeolocationUseCase {
  constructor(private mapRadiusRepository) {}

  async execute(mapRadiusPayload) {
    const response = await this.mapRadiusRepository.create(mapRadiusPayload)
    return response
  }
}
