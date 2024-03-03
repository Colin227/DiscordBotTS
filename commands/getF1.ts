// location and lap times of drivers and what current lap is good
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageAttachment, MessageEmbed } from "discord.js";
import dotenv from 'dotenv';
dotenv.config();

const toProperCase = (text: string): string => {
    return text.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('f1')
        .setDescription('F1 information.'),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();

        try {
            const sessions = await fetchSessions();
            const meeting = await fetchMeeting(sessions[0].meeting_key);
            const positions = await fetchFormulaOnePositions(sessions[0].session_key);
            const drivers = await fetchFormulaOneDrivers(sessions[0].session_key);

            console.log("positions: ", positions.sort((a, b) => {return a.position - b.position}))


            const top5 = positions.sort((a, b) => {return a.position - b.position}).slice(0, 5);
            // console.log("top 5: ", top5)


            const positionFields = top5.map((p) => {
                let driver = drivers.find((d) => d.driver_number === p.driver_number);
                // console.log("driver: ", driver)
                return {
                    name: `Position ${p.position}`,
                    value: `${toProperCase((driver.full_name))} \n ${driver.team_name}`,
                    inline: false
                } 
            })

            // console.log("positionFields: ", positionFields)
            

            const {meeting_name, meeting_official_name, location, country_name} = meeting[0];
            const f1Embed = new MessageEmbed()
                .setColor('#FF1801') // TODO: Get colour
                .setTitle(`${meeting_name}`)
                .setDescription(`${toProperCase(meeting_official_name)}`)
                .addFields(
                    [
                        {
                            name: `Location`,
                            value: `${location}, ${country_name}`,
                            inline: false,
                        },
                        ...positionFields
                        
                    ]
            )
            // .setImage(nasaPhoto.hd)

            await interaction.editReply({ embeds: [f1Embed] });
        } catch (e) {
            console.log(e);
            await interaction.editReply(`Error getting F1 data, try again later. ${e}`);
        }
    }
}

export default async function fetchSessions(): Promise<Session[]> {
    const apiUrl = `https://api.openf1.org/v1/sessions?session_key=latest`
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            // Logs message for easier monitoring and debugging.
            // TODO: Write to error log
            console.log("Failed to fetch Formula One meetings", response);
            throw new Error(response.statusText)
        }
        // Parse response JSON
        const data = await response.json();

        // Map the response data to the FormulaOneMeeting interface
        const sessions = data as Session[];

        return sessions;
        // return await response.json() as FormulaOneMeeting[];
    } catch (error) {
        console.error("An error occurred while fetching Formula One sessions: ", error);
        throw error;
    }
}


async function fetchMeeting(meeting_key: number): Promise<Meeting[]> {
    const apiUrl = `https://api.openf1.org/v1/meetings?meeting_key=${meeting_key}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            // Logs message for easier monitoring and debugging.
            // TODO: Write to error log
            console.log("Failed to fetch Formula One meetings", response);
            throw new Error(response.statusText)
        }
        // Parse response JSON
        const data = await response.json();

        // Map the response data to the FormulaOneMeeting interface
        const meeting = data as Meeting[];

        return meeting;
        // return await response.json() as FormulaOneMeeting[];
    } catch (error) {
        console.error("An error occurred while fetching Formula One meetings: ", error);
        throw error;
    }
}

async function fetchFormulaOnePositions(session_key: number): Promise<FormulaOnePosition[]> {
    const apiUrl = `https://api.openf1.org/v1/position?session_key=${session_key}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            // Logs message for easier monitoring and debugging.
            // TODO: Write to error log
            console.log("Failed to fetch Formula One positions", response);
            throw new Error(response.statusText)
        }
        // Parse response JSON
        const data = await response.json();

        // Map the response data to the FormulaOneMeeting interface
        const positions: FormulaOnePosition[] = data.map((position: any) => ({
            session_key: position.session_key,
            meeting_key: position.meeting_key,
            driver_number: position.driver_number,
            date: position.date,
            position: position.position
        }))

        return positions;
        // return await response.json() as FormulaOneMeeting[];
    } catch (error) {
        console.error("An error occurred while fetching Formula One position data: ", error);
        throw error;
    }
}

async function fetchFormulaOneDrivers(session_key: number): Promise<Driver[]> {
    const apiUrl = `https://api.openf1.org/v1/drivers?session_key=${session_key}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            // Logs message for easier monitoring and debugging.
            // TODO: Write to error log
            console.log("Failed to fetch Formula One drivers", response);
            throw new Error(response.statusText)
        }
        // Parse response JSON
        const data = await response.json();
        console.log("data!!!: ", data[0]);

        // Map the response data to the FormulaOneMeeting interface
        const drivers: Driver[] = data as Driver[];

        return drivers;
        // return await response.json() as FormulaOneMeeting[];
    } catch (error) {
        console.error("An error occurred while fetching Formula One driver data: ", error);
        throw error;
    }
}


interface FormulaOne {
    meeting_name: string,
    meeting_official_name: string,
    location: string,
    country_key: number,
    country_code: string,
    country_name: string,
    circuit_key: number,
    circuit_short_name: string,
    date_start: string, // Date typing or just parse to Date object?
    gmt_offset: string,
    meeting_key: number,
    year: number
};

interface Meeting {
    meeting_name: string,
    meeting_official_name: string,
    location: string,
    country_key: number,
    country_code: string,
    country_name: string,
    circuit_key: number,
    circuit_short_name: string,
    date_start: string,
    gmt_offset: string,
    meeting_key: number,
    year: number
}

interface FormulaOnePosition {
    session_key:   number;
    meeting_key:   number;
    driver_number: number;
    date:          Date;
    position:      number;
}

interface Driver {
    session_key:    number;
    meeting_key:    number;
    broadcast_name: string;
    country_code:   null | string;
    first_name:     null | string;
    full_name:      string;
    headshot_url:   null | string;
    last_name:      null | string;
    driver_number:  number;
    team_colour:    number | null | string;
    team_name:      null | string;
    name_acronym:   string;
}

interface Session {
    location:           string;
    country_key:        number;
    country_code:       string;
    country_name:       string;
    circuit_key:        number;
    circuit_short_name: string;
    session_type:       string;
    session_name:       string;
    date_start:         Date;
    date_end:           Date;
    gmt_offset:         string;
    session_key:        number;
    meeting_key:        number;
    year:               number;
}
