import BaseCommand from "../base.command"
import TemplateBot from "../../TemplateBot"
import { ApplicationCommandType, ApplicationCommandOptionType } from "discord-api-types/v10"
import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js"

export default class HelpCommand extends BaseCommand {
    constructor(client: TemplateBot) {
        super(client, {
            name: "help",
            description: "Get more information about the bot and its commands.",
            type: ApplicationCommandType.ChatInput,
            options: [
                {
                    name: "command",
                    description: "The command you want to get more information about.",
                    type: ApplicationCommandOptionType.String,
                    autocomplete: true
                }
            ]
        })
    }

    async execute(interaction: ChatInputCommandInteraction) {
        const command = interaction.options.getString("command")

        if (command) {
            const cmd = this.client.commands.get(command)
            if (!cmd) {
                return interaction.reply({
                    embeds: [
                        {
                            title: "Command not found",
                            description: `The command \`${command}\` was not found.`,
                            color: 0xff0000
                        }
                    ]
                })
            }

            return interaction.reply({
                embeds: [
                    {
                        author: {
                            name: `Help - /${cmd.name}`,
                            icon_url: this.client.user?.displayAvatarURL()
                        },
                        description: `**Description**: ${cmd.description}\n**Usage**: /${cmd.name} ${
                            cmd.options
                                ?.map(o => {
                                    if (o.required) return `<${o.name}>`
                                    return `[${o.name}]`
                                })
                                .join(" ") || ""
                        }${cmd.options ? "\n<> - required, [] - optional" : ""}`,
                        fields: cmd.options
                            ? [
                                  {
                                      name: "**Options**",
                                      value: cmd.options?.map(o => `\`${o.name}\` - ${o.description}`).join("\n")
                                  }
                              ]
                            : [],
                        color: 0x006994
                    }
                ]
            })
        }

        return interaction.reply({
            embeds: [
                {
                    author: {
                        name: `Help Menu - ${this.client.user?.username}`,
                        icon_url: this.client.user?.displayAvatarURL()
                    },
                    description: "For more information about a specific command, type `/help [command]`.",
                    fields: [
                        {
                            name: "**Commands**",
                            value: this.client.commands.map(c => `\`${c.name}\` - ${c.description}`).join("\n")
                        },
                        {
                            name: "**Notes**",
                            value: "This bot was created from https://github.com/lelboatz/discord-bot-template. Feel free to use it as a base for your own bot!"
                        }
                    ],
                    color: 0x006994
                }
            ]
        })
    }

    autocomplete(interaction: AutocompleteInteraction) {
        if (interaction.options.getFocused(true)?.name === "command") {
            return interaction.respond(
                this.client.commands.map(command => {
                    return {
                        name: `/${command.name}`,
                        value: command.name
                    }
                })
            )
        }

        return interaction.respond([])
    }
}
