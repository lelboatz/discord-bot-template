package io.github.lelboatz.utils.commands

import dev.kord.common.entity.ApplicationCommandType
import dev.kord.common.entity.DiscordInteraction

open class RegisterCommands(

) {
    fun registerCommands(data: DiscordInteraction) {
        val applicationCommandType = data.data.type.value

        when(applicationCommandType) {
            is ApplicationCommandType.ChatInput -> {

            }

            else -> {}
        }
    }
}