import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Client, ClientOptions, Collection } from "discord.js";

export class ClientC extends Client {
    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
    }
    commands: Collection<string, (interaction: CommandInteraction) => Promise<void>>; // TODO: add types
}

type CommandData = string;