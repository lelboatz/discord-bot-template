package io.github.lelboatz.commands

import dev.kord.rest.builder.message.create.embed
import io.github.lelboatz.utils.commands.AbstractCommand
import io.github.lelboatz.utils.commands.ApplicationCommandContext

class HelpCommand : AbstractCommand() {
    override suspend fun execute(ctx: ApplicationCommandContext) {
        ctx.sendWebhookMessage {
            embed {

            }
        }
    }

}