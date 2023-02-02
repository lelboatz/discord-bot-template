import TemplateBot from "../TemplateBot"
import { Interaction } from "discord.js"

module.exports = class {
    client: TemplateBot
    constructor(client: TemplateBot) {
        this.client = client
    }

    async run(interaction: Interaction) {
        // This triggers on chat input commands and context menu commands
        if (interaction.isCommand()) {
            const command = this.client.commands.get(interaction.commandName)
            if (!command) return

            if (!command.opts.enabled) {
                return interaction.reply({
                    content: "This command is currently disabled.",
                    ephemeral: true
                })
            }

            // You can implement your custom permission system before executing if you want as well
            return command.execute(interaction)
        } else if (interaction.isAutocomplete()) {
            const command = this.client.commands.get(interaction.commandName)
            if (!command) return
            return command.autocomplete(interaction)
        }
    }
}
