import TemplateBot from "../TemplateBot"

// Handle errors thrown by discord.js
export default class {
    client: TemplateBot

    constructor(client: TemplateBot) {
        this.client = client
    }
    async run(e: Error) {
        console.error(e)
    }
}