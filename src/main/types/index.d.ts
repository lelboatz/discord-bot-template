import type { AnySelectMenuInteraction, ButtonInteraction, ModalSubmitInteraction } from 'discord.js'

export type ButtonListener = (button: ButtonInteraction, ...args: unknown[]) => unknown
export type SelectMenuListener = (selectMenu: AnySelectMenuInteraction, ...args: unknown[]) => unknown
export type ModalListener = (button: ModalSubmitInteraction, ...args: unknown[]) => unknown