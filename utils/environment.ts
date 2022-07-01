require('dotenv').config();

/* eslint no-process-env:0 */
module.exports.default = {

    env: process.env.NODE_ENV,
    api_token: process.env.api_token,
    weather_api_token: process.env.weather_api,
    colin_location: process.env.colin_location,
    ev_location: process.env.ev_location,
    mat_location: process.env.mat_location,
    colin_user: process.env.colin_user,
    ev_user: process.env.ev_user,
    ollie_user: process.env.ollie_user,
    mat_user: process.env.mat_user,
    app_id: process.env.app_id,
    channel_id: process.env.channel_id
}