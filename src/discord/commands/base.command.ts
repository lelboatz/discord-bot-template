import { APIApplicationCommand } from "discord-api-types/v10"
import { AutocompleteInteraction, CommandInteraction, PermissionFlagsBits } from "discord.js"
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
        this.command = {
            ...command,
            // Change this if you want commands to work in DMs by default, or change this on a per-command basis
            dm_permission: command.dm_permission ?? false,
            // Change this if you want commands to use a different permission set by default, or change this on a per-command basis
            default_member_permissions: command.default_member_permissions ?? PermissionFlagsBits.Administrator.toString()
        }
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
