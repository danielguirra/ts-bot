// @ts-nocheck
const gis = require('g-i-s');

gis(string, logResults);
async function logResults(error, results) {
  if (error) {
    console.log(error);
  } else {
    return await interaction.reply(results[0].url);
  }
}
