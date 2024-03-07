import TemplateBot from "../TemplateBot"
import { Interaction } from "discord.js"

export default class {
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
        } else if (interaction.isButton()) {
            for (const [trigger, onPress] of this.client.buttonListeners) {
                const [prefix, ...args] = interaction.customId.split("-")

                if (prefix === trigger) {
                    return onPress(interaction, ...args)
                }
            }
        } else if (interaction.isAnySelectMenu()) {
            for (const [trigger, onSelect] of this.client.selectMenuListeners) {
                const [prefix, ...args] = interaction.customId.split("-")

                if (prefix === trigger) {
                    return onSelect(interaction, ...args)
                }
            }
        } else if (interaction.isModalSubmit()) {
            for (const [trigger, onSubmit] of this.client.modalListeners) {
                const [prefix, ...args] = interaction.customId.split("-")

                if (prefix === trigger) {
                    return onSubmit(interaction, ...args)
                }
            }
        }
    }
}
