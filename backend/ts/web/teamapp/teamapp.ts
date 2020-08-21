import { Client } from 'discord.js';

const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const url = "https://pinkrobotics.teamapp.com/events";

var events = {
    meetings: {

    }
}

const TeamappObjects = {
    eventClass: ".media"
}

/**
 * Posts TeamApp Events to Discord.
 *
 * @access public
 *
 */
export function postEvents(bot: Client) {
    GetTeamAppEvents();
}

/**
 * Gets Events From TeamApp
 *
 * @type Promise
 * @access private
 * @returns {Promise<any>} - Json Object With all the Events.
 * @deprecated Use GetTeamAppEvents() Instead
 *
 */
async function getEvents() {
    axios(url).then((response: any) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const events = $(TeamappObjects.eventClass)
        console.log(events.length);

        events.each(() => {
            // @ts-ignore
            const title = $(this)
            console.log(title);
        });
    }).catch((err: any) => {
        console.error(err);
    })
}

/**
 * Gets Events From TeamApp
 *
 * @type Promise
 * @access private
 * @returns {Promise<any>} - Json Object With all the Events.
 *
 */
async function GetTeamAppEvents() {
    
}