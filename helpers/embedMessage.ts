import { ColorResolvable, EmbedField, EmbedFieldData, MessageEmbed } from "discord.js";


// Unsure if the ColorResolvable type is going to work here. I had it as a string before updating for dynamic color values.
export default function createEmbedMessage(color: string, title: string, description?: string, thumbnail?: string, ...args: EmbedFieldData[] ): MessageEmbed {
    console.log('args: ' + JSON.stringify(args))
    const embed = new MessageEmbed()
    .setColor(color as ColorResolvable) // Not sure if this works...
    .setTitle(title)
    .setDescription(description)
    .addFields(
            ...args
    )
    
    return embed;
}


// export default function createEmbedMessage(title: string, description: string, name: string, value: string ): MessageEmbed {
//     const embed = new MessageEmbed()
//     .setColor('#00099ff')
//     .setTitle(title)
//     .setDescription(description)
//     .addFields(
//             {
//                 name: name, value: value
//             }
//     )
//     return embed;
// }