import TemplateBot from "./TemplateBot"
import path from "path"
import klaw from "klaw"
import Main from "../main/Main"
import axios from "axios"
import { GatewayIntentBits } from "discord-api-types/v10"

export const init = async (main: Main) => {
    const client = new TemplateBot(main, {
        // You can change the intents here if needed, some events may not fire if you don't have the correct intents
        intents: [GatewayIntentBits.Guilds],
        allowedMentions: {
            parse: ["users"]
        },
        shards: "auto"
    })

    // Load all commands and events, if one fails it will log the error instead of crashing
    klaw(`${__dirname}/commands`).on("data", file => {
        const command = path.parse(file.path)
        if (command.ext !== ".js" || command.name === "BaseCommand") return
        const err = client.loadCommand(command.dir, command.base)
        if (err) console.info(err)
    })

    klaw(`${__dirname}/events`).on("data", file => {
        const event = path.parse(file.path)
        if (event.ext !== ".js") return
        const err = client.loadEvent(event.dir, event.name)
        if (err) console.info(err)
    })

    await client.login(process.env.BOT_TOKEN)

    // Registers application commands
    await axios.put(
        `https://discord.com/api/v10/applications/${client.user?.id}/commands`,
        client.commands.map(command => command.toApplicationCommand()),
        {
            headers: {
                Authorization: "Bot " + process.env.BOT_TOKEN,
                "Content-Type": "application/json"
            }
        }
    )
    return client
}
