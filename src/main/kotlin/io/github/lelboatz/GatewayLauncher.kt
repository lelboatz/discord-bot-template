package io.github.lelboatz

import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.forEach
import kotlinx.coroutines.flow.onCompletion
import kotlinx.coroutines.flow.takeWhile

object GatewayLauncher {
    suspend fun gatewayLaunch(bot: TemplateBotCore) = coroutineScope {
        val totalShards = bot.kord.resources.shards.totalShards

    }
}