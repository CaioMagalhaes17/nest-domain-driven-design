export class Create {
  async execute(fileName: string) {
    const urlBase = "http://localhost:3001/uploads/imgs/"
    const cleanFile = fileName.replace(".png", "")
    return { url: urlBase + cleanFile, status: "ok" }
  }
}
