import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction, Client, ClientOptions, Collection } from "discord.js";

export class ClientC extends Client {
    constructor(options: ClientOptions){
        super(options);
        this.commands = new Collection();
    }
    commands: Collection<string, (interaction: BaseCommandInteraction) => Promise<void>>; // TODO: add types
}

type CommandData = string;