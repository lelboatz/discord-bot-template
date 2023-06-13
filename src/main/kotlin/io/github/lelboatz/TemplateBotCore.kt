package io.github.lelboatz

import dev.kord.common.annotation.KordExperimental
import dev.kord.common.annotation.KordUnsafe
import dev.kord.core.Kord
import dev.kord.gateway.DefaultGateway
import dev.kord.gateway.Intent
import dev.kord.gateway.Intents
import dev.kord.gateway.start
import dev.kord.rest.ratelimit.ParallelRequestRateLimiter
import dev.kord.rest.request.KtorRequestHandler
import dev.kord.rest.request.StackTraceRecoveringKtorRequestHandler
import dev.kord.rest.service.RestClient
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking

class TemplateBotCore (
    val token: String
) {
    @OptIn(KordUnsafe::class)
    val rest = RestClient(
        KtorRequestHandler(
            token,
            ParallelRequestRateLimiter()
        )
    )

    @OptIn(KordExperimental::class)
    val kord = Kord.restOnly(token) {
        requestHandler {
            StackTraceRecoveringKtorRequestHandler(KtorRequestHandler(it.token))
        }
    }

    val gateway = DefaultGateway {
        dispatcher = Dispatchers.Default
    }

    suspend fun initialize() {
        runBlocking {
            gateway.start(token) {
                intents = Intents {
                    + Intent.Guilds
                }
            }
        }
    }
}