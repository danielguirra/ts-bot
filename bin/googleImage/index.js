"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFunc = exports.googleImagePensador = exports.googleImage = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const flatten = require("lodash");
const queryString = __importStar(require("querystring"));
const request = require("request");
const getEmbed_1 = require("../src/util/getEmbed");
var baseURL = 'http://images.google.com/search?';
var imageFileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
/**
 *
 * @param text
 * @param channel
 * @param mensage
 */
function googleImage(text, channel, mensage) {
    (0, exports.imageFunc)(text, done);
    function done(error, results) {
        if (error) {
            console.log(error);
        }
        else {
            /**
             * No Heroku results.__wrapped__[1][1].url
             */
            let c = 0;
            if (results.__wrapped__[0].length === 0)
                c++;
            const response = results.__wrapped__[c][0].url;
            if (channel && mensage) {
                mensage.edit(`Achei aqui resultado de ${text}`);
                return channel.send(response);
            }
            else {
                console.log('Erro channel or Message its null');
            }
        }
    }
}
exports.googleImage = googleImage;
/**
 *
 * @param embed
 * @param pensadorData
 * @param command
 * @param channel
 */
async function googleImagePensador(embed, pensadorData, command, channel) {
    await (0, exports.imageFunc)(pensadorData.author, resultfu);
    function resultfu(error, results) {
        if (error) {
            console.log(error);
        }
        else {
            /**
             * No Heroku results.__wrapped__[1][1].url
             */
            let c = 0;
            if (results.__wrapped__[0].length === 0)
                c++;
            const image = results.__wrapped__[c][0].url;
            if (!embed.embedColor)
                embed.embedColor = 'Random';
            if (command) {
                command.reply({
                    embeds: [
                        (0, getEmbed_1.embedBuilder)(embed.embedTitle, pensadorData.message, image, pensadorData.author, image, image, embed.embedColor),
                    ],
                });
            }
            if (channel) {
                channel.send({
                    embeds: [
                        (0, getEmbed_1.embedBuilder)(embed.embedTitle, pensadorData.message, image, pensadorData.author, image, image, embed.embedColor),
                    ],
                });
            }
        }
    }
}
exports.googleImagePensador = googleImagePensador;
const imageFunc = async function googleImage(opts, done) {
    var searchTerm;
    var filterOutDomains = ['gstatic.com'];
    if (typeof opts === 'string') {
        searchTerm = opts;
    }
    let url = baseURL +
        queryString.stringify({
            tbm: 'isch',
            q: searchTerm,
        });
    if (filterOutDomains) {
        url += encodeURIComponent(' ' + filterOutDomains.map(addSiteExcludePrefix).join(' '));
    }
    let reqOpts = {
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        },
    };
    // console.log(reqOpts.url);
    request(reqOpts, parseGISResponse);
    function parseGISResponse(error, response, body) {
        if (error) {
            done(error);
            return;
        }
        var $ = cheerio_1.default.load(body);
        var scripts = $('script');
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
        function collectImageRefs(content) {
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
        function domainIsOK(url) {
            if (!filterOutDomains) {
                return true;
            }
            else {
                return filterOutDomains.every(skipDomainIsNotInURL);
            }
            function skipDomainIsNotInURL(skipDomain) {
                return url.indexOf(skipDomain) === -1;
            }
        }
    }
    return;
};
exports.imageFunc = imageFunc;
function addSiteExcludePrefix(s) {
    return '-site:' + s;
}
function containsAnyImageFileExtension(s) {
    var lowercase = s.toLowerCase();
    return imageFileExtensions.some(containsImageFileExtension);
    function containsImageFileExtension(ext) {
        return lowercase.includes(ext);
    }
}
