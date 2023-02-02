import TemplateBot from "../TemplateBot"

export default class {
    client: TemplateBot

    constructor(client: TemplateBot) {
        this.client = client
    }

    run() {
        console.info(`Successfully logged in! \nSession Details: id=${this.client.user?.id} tag=${this.client.user?.tag}`)
    }
}
