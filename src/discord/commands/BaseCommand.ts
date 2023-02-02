import { APIApplicationCommand } from "discord-api-types/v10"
import { AutocompleteInteraction, CommandInteraction } from "discord.js"
import TemplateBot from "../TemplateBot"

export type ApplicationCommand = Omit<APIApplicationCommand, "id" | "application_id" | "version" | "default_member_permissions"> & Partial<Pick<APIApplicationCommand, "default_member_permissions">>
export interface CommandOptions {
    enabled: boolean
}
export default abstract class BaseCommand {
    protected readonly command: ApplicationCommand
    client: TemplateBot
    opts: CommandOptions

    protected constructor(
        client: TemplateBot,
        // Customize your command to your liking here, i.e. add permissions, set guild_id, etc.
        command: ApplicationCommand,
        opts: CommandOptions = {
            enabled: true
        }
    ) {
        this.client = client
        this.command = command
        this.opts = opts
    }

    // Handle all interactions here (chat input or context menu)
    abstract execute(interaction: CommandInteraction): unknown

    // Handle autocomplete interactions if you have autocomplete enabled
    autocomplete(interaction: AutocompleteInteraction) {
        return interaction.respond([])
    }

    get name() {
        return this.command.name
    }

    get description() {
        return this.command.description
    }

    get options() {
        return this.command.options
    }

    toApplicationCommand() {
        return this.command
    }
}
