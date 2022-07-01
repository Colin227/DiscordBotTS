import { EmbedField, EmbedFieldData, MessageEmbed } from "discord.js";

interface fields {
    name
}

export default function createEmbedMessage(title: string, description: string, ...args: EmbedFieldData[] ): MessageEmbed {
    console.log('args: ' + JSON.stringify(args))
    const embed = new MessageEmbed()
    .setColor('#00099ff')
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