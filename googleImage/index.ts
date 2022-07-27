import cheerio from 'cheerio';
import { ColorResolvable, CommandInteraction, GuildTextBasedChannel, Message } from 'discord.js';
import flatten = require('lodash');
import * as queryString from 'querystring';
import request = require('request');

import { IPensador } from '../src/interfaces/PensadorMessage';
import { embedBuilder } from '../src/util/getEmbed';

var baseURL = 'http://images.google.com/search?';

var imageFileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
/**
 *
 * @param text
 * @param channel
 * @param mensage
 */
export function googleImage(
  text: string,
  channel: GuildTextBasedChannel,
  mensage: Message,
) {
  imageFunc(text, done);
  function done(error: any, results?: any | undefined) {
    if (error) {
      console.log(error);
    } else {
      /**
       * No Heroku results.__wrapped__[1][1].url
       */
      let c = 0;
      if (results.__wrapped__[0].length === 0) c++;
      const response = results.__wrapped__[c][0].url;
      if (channel && mensage) {
        mensage.edit(`Achei aqui resultado de ${text}`);
        return channel.send(response);
      } else {
        console.log('Erro channel or Message its null');
      }
    }
  }
}
/**
 *
 * @param embed
 * @param pensadorData
 * @param command
 * @param channel
 */
export async function googleImagePensador(
  embed: { embedTitle: string; embedColor?: ColorResolvable },
  pensadorData: IPensador,
  command?: CommandInteraction | Message,
  channel?: GuildTextBasedChannel,
) {
  await imageFunc(pensadorData.author, resultfu);
  function resultfu(error: any, results: any) {
    if (error) {
      console.log(error);
    } else {
      /**
       * No Heroku results.__wrapped__[1][1].url
       */

      let c = 0;
      if (results.__wrapped__[0].length === 0) c++;
      const image = results.__wrapped__[c][0].url;
      if (!embed.embedColor) embed.embedColor = 'Random';
      if (command) {
        command.reply({
          embeds: [
            embedBuilder(
              embed.embedTitle,
              pensadorData.message,
              image,
              pensadorData.author,
              image,
              image,
              embed.embedColor,
            ),
          ],
        });
      }
      if (channel) {
        channel.send({
          embeds: [
            embedBuilder(
              embed.embedTitle,
              pensadorData.message,
              image,
              pensadorData.author,
              image,
              image,
              embed.embedColor,
            ),
          ],
        });
      }
    }
  }
}
export const imageFunc = async function googleImage(opts: string, done: any) {
  var searchTerm;
  var filterOutDomains = ['gstatic.com'];

  if (typeof opts === 'string') {
    searchTerm = opts;
  }

  let url =
    baseURL +
    queryString.stringify({
      tbm: 'isch',
      q: searchTerm,
    });

  if (filterOutDomains) {
    url += encodeURIComponent(
      ' ' + filterOutDomains.map(addSiteExcludePrefix).join(' '),
    );
  }

  let reqOpts = {
    url: url,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
    },
  };

  // console.log(reqOpts.url);
  request(reqOpts, parseGISResponse);

  function parseGISResponse(error: any, response: any, body: any) {
    if (error) {
      done(error);
      return;
    }
    var $ = cheerio.load(body);
    var scripts: any = $('script');
    var scriptContents = [];
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].children.length > 0) {
        const content = scripts[i].children[0].data;
        if (containsAnyImageFileExtension(content)) {
          scriptContents.push(content);
        }
      }
    }

    done(error, flatten(scriptContents.map(collectImageRefs)));

    function collectImageRefs(content: any) {
      var refs = [];
      var re = /\["(http.+?)",(\d+),(\d+)\]/g;
      var result;
      while ((result = re.exec(content)) !== null) {
        if (result.length > 3) {
          let ref = {
            url: result[1],
            width: +result[3],
            height: +result[2],
          };
          if (domainIsOK(ref.url)) {
            refs.push(ref);
          }
        }
      }
      return refs;
    }

    function domainIsOK(url: any) {
      if (!filterOutDomains) {
        return true;
      } else {
        return filterOutDomains.every(skipDomainIsNotInURL);
      }

      function skipDomainIsNotInURL(skipDomain: any) {
        return url.indexOf(skipDomain) === -1;
      }
    }
  }
  return;
};

function addSiteExcludePrefix(s: any) {
  return '-site:' + s;
}

function containsAnyImageFileExtension(s: any) {
  var lowercase = s.toLowerCase();
  return imageFileExtensions.some(containsImageFileExtension);

  function containsImageFileExtension(ext: any) {
    return lowercase.includes(ext);
  }
}
