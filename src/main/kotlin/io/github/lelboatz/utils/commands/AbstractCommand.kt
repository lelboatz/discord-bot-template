package io.github.lelboatz.utils.commands

abstract class AbstractCommand {
    abstract suspend fun execute(ctx: ApplicationCommandContext)
}
