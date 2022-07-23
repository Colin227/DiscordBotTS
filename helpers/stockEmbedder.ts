import { MessageEmbed } from "discord.js";
import Stock from "../data/stock";


export default function embedStock(stock: Stock): MessageEmbed {
    const dailyChange = () => {
        return Math.sign(stock.regularMarketChange) > 0 ? `+${stock.regularMarketChange.toFixed(2)}` : `${stock.regularMarketChange.toFixed(2)}`;
    }
    const stockColor = () => {
        return Math.sign(stock.regularMarketChange) > 0 ? "#00AD2A" : "#ff0000";
    }

    const embed = new MessageEmbed()
    .setColor(stockColor())
    .setTitle(`${stock.longName}`)
    .setDescription(`${stock.symbol}`)
    // .setThumbnail(`https:${weather.current.condition.icon}`)
    .addFields(
            [
                {
                    name: `Current Price`,
                    value: `$${stock.regularMarketPrice} ${stock.currency}`,
                    inline: false,
                },
                {
                    name: `Previous Close Price`,
                    value: `$${stock.regularMarketPreviousClose} ${stock.currency}`,
                    inline: false
                },
                {
                    name: "Daily Change",
                    value: `\`\`\`diff\n${dailyChange()} (${stock.regularMarketChangePercent.toFixed(2)}%) today \`\`\``,
                    inline: true
                },
                // {
                //     name: "Daily Change (%)",
                //     value: `${stock.regularMarketChangePercent.toPrecision(4)}`,
                //     inline: true
                // }


            ]
    )
    return embed;
}

