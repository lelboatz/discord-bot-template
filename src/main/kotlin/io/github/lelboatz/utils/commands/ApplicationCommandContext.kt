package io.github.lelboatz.utils.commands

import dev.kord.common.entity.DiscordInteraction
import dev.kord.common.entity.Snowflake
import dev.kord.core.cache.data.InteractionData
import dev.kord.core.entity.Guild
import dev.kord.core.entity.Member
import dev.kord.core.entity.User
import dev.kord.rest.builder.message.create.FollowupMessageCreateBuilder
import dev.kord.rest.builder.message.create.WebhookMessageCreateBuilder

open class ApplicationCommandContext(
    val sender: User,
    val channelId: Snowflake,
    val interactionData: InteractionData,
    val discordInteraction: DiscordInteraction,
    val guildId: Snowflake,
    val member: Member
) {
    val appPermissions = discordInteraction.appPermissions.value

    suspend fun sendMessage(
        builder: FollowupMessageCreateBuilder.() -> (Unit)
    ) = FollowupMessageCreateBuilder(false).apply(builder)

    suspend fun sendEphemeralMessage(
        builder: FollowupMessageCreateBuilder.() -> (Unit)
    ) = FollowupMessageCreateBuilder(true).apply(builder)

    suspend fun sendWebhookMessage(
        builder: WebhookMessageCreateBuilder.() -> (Unit)
    ) = WebhookMessageCreateBuilder().apply(builder)
}

