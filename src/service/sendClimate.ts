import axios from 'axios';
import { GuildTextBasedChannel, TextBasedChannel } from 'discord.js';
import dotenv from 'dotenv';

import weatherCode from '../../data/json/weatherCode.json';
import emojis from '../../data/json/weatherEmoji.json';
import { embedBuilder } from '../util/getEmbed';

dotenv.config();
let climate;

export const sendClimate = async (
  channel: GuildTextBasedChannel,
  city: string,
) => {
  let url = `https://pt.wttr.in/${city}+brazil?format=j1`;
  if (city === 'ribeirao') {
    url = 'https://pt.wttr.in/ribeir%C3%A3o%20preto%20brasil?format=j1';
  }
  if (!city) return 'Erro sendClimateCurrentTime ' + ' Cidade? 🤔' + city;
  if (city === '*climadodia')
    return 'Erro sendClimateCurrentTime ' + ' Cidade? 🤔';
  return axios.get(url).then(clim => {
    try {
      let climatePorHora = [];
      let weather = clim.data.weather[0].hourly;
      for (const iterator of weather) {
        let horario;
        function arrumahora(time: string) {
          if (time.length > 2) {
            horario = time.slice(0, 1);
            horario = horario + ':00';
          }
          if (time.length > 3) {
            horario = time.slice(0, 2);
            horario = horario + ':00';
          }
          if (time.length === 1) {
            horario = '00:00';
          }
        }
        arrumahora(iterator.time);
        let heatIndex = iterator.FeelsLikeC;
        let heatString = `${heatIndex}°`;
        let emoji = getEmojiForWeatherCode(iterator.weatherCode);
        let porHora = {
          hora: horario,
          humidade: iterator.humidity,
          text: iterator.lang_pt[0].value,
          temp: iterator.tempC,
          preciptacaoMM: iterator.precipMM,
          raiosUV: iterator.uvIndex,
          heatIndex: heatString.slice(0, 4),
          emoji,
        };
        climatePorHora.push(porHora);
      }

      climate = {
        temperaturaMediaC: clim.data.weather[0].avgtempC,
        porHora: climatePorHora,
      };
      return (
        {
          embeds: [
            embedBuilder(
              `Clima de ${city} Hoje`,
              `
        Temperatura média : ${climate.temperaturaMediaC}C°

        Hora:**${climate.porHora[0].hora}**
        Humidade:**${climate.porHora[0].humidade}%**
        Vai estar **${climate.porHora[0].text}**${climate.porHora[0].emoji}
        Temperatura no momento:**${climate.porHora[0].temp}C°**
        Precipação em milimetros:**${climate.porHora[0].preciptacaoMM}**
        Raios Ultra Violeta:**${climate.porHora[0].raiosUV}**
        Sensação Térmica:**${climate.porHora[0].heatIndex}C**
        ----------------------------------------------------
        Hora:**${climate.porHora[1].hora}**
        Humidade:**${climate.porHora[1].humidade}%**
        Vai estar **${climate.porHora[1].text}**${climate.porHora[1].emoji}
        Temperatura no momento:**${climate.porHora[1].temp}C°**
        Precipação em milimetros:**${climate.porHora[1].preciptacaoMM}**
        Raios Ultra Violeta:**${climate.porHora[1].raiosUV}**
        Sensação Térmica:**${climate.porHora[1].heatIndex}C**
        ----------------------------------------------------
        Hora:**${climate.porHora[2].hora}**
        Humidade:**${climate.porHora[2].humidade}%**
        Vai estar **${climate.porHora[2].text}**${climate.porHora[2].emoji}
        Temperatura no momento:**${climate.porHora[2].temp}C°**
        Precipação em milimetros:**${climate.porHora[2].preciptacaoMM}**
        Raios Ultra Violeta:**${climate.porHora[2].raiosUV}**
        Sensação Térmica:**${climate.porHora[2].heatIndex}C**
        ----------------------------------------------------
        Hora:**${climate.porHora[3].hora}**
        Humidade:**${climate.porHora[3].humidade}%**
        Vai estar **${climate.porHora[3].text}**${climate.porHora[3].emoji}
        Temperatura no momento:**${climate.porHora[3].temp}C°**
        Precipação em milimetros:**${climate.porHora[3].preciptacaoMM}**
        Raios Ultra Violeta:**${climate.porHora[3].raiosUV}**
        Sensação Térmica:**${climate.porHora[3].heatIndex}C**
        ----------------------------------------------------
        Hora:**${climate.porHora[4].hora}**
        Humidade:**${climate.porHora[4].humidade}%**
        Vai estar **${climate.porHora[4].text}**${climate.porHora[4].emoji}
        Temperatura no momento:**${climate.porHora[4].temp}C°**
        Precipação em milimetros:**${climate.porHora[4].preciptacaoMM}**
        Raios Ultra Violeta:**${climate.porHora[4].raiosUV}**
        Sensação Térmica:**${climate.porHora[4].heatIndex}**
        ----------------------------------------------------
        Hora:**${climate.porHora[5].hora}**
        Humidade:**${climate.porHora[5].humidade}%**
        Vai estar **${climate.porHora[5].text}**${climate.porHora[5].emoji}
        Temperatura no momento:**${climate.porHora[5].temp}C°**
        Precipação em milimetros:**${climate.porHora[5].preciptacaoMM}**
        Raios Ultra Violeta:**${climate.porHora[5].raiosUV}**
        Sensação Térmica:**${climate.porHora[5].heatIndex}C**
        ----------------------------------------------------
        Hora:**${climate.porHora[6].hora}**
        Humidade:**${climate.porHora[6].humidade}%**
        Vai estar **${climate.porHora[6].text}**${climate.porHora[6].emoji}
        Temperatura no momento:**${climate.porHora[6].temp}C°**
        Precipação em milimetros:**${climate.porHora[6].preciptacaoMM}**
        Raios Ultra Violeta:**${climate.porHora[6].raiosUV}**
        Sensação Térmica:**${climate.porHora[6].heatIndex}C**
        ----------------------------------------------------
        Hora:**${climate.porHora[7].hora}**
        Humidade:**${climate.porHora[7].humidade}%**
        Vai estar **${climate.porHora[7].text}**${climate.porHora[7].emoji}
        Temperatura no momento:**${climate.porHora[7].temp}C°**
        Precipação em milimetros:**${climate.porHora[7].preciptacaoMM}**
        Raios Ultra Violeta:**${climate.porHora[7].raiosUV}**
        Sensação Térmica:**${climate.porHora[7].heatIndex}C**
        ----------------------------------------------------
        
        `,
              '',
              '',
              'https://static.escolakids.uol.com.br/conteudo_legenda/4e3d738c244f4c5f3b56f46260402cc4.jpg',
              '',
            ),
          ],
        } || ''
      );
    } catch (err) {
      return 'Erro';
    }
  });
};
export const sendClimateCurrentTime = async (
  channel?: GuildTextBasedChannel,
  city?: string,
  channelSlash?: TextBasedChannel,
) => {
  let url = `https://pt.wttr.in/${city}+brazil?format=j1`;
  if (city === 'ribeirao') {
    url = 'https://pt.wttr.in/ribeir%C3%A3o%20preto%20brasil?format=j1';
  }
  if (!city) return 'Erro sendClimateCurrentTime ' + ' Cidade? 🤔' + city;
  if (city === '*clima') return 'Erro sendClimateCurrentTime ' + ' Cidade? 🤔';
  const climateAxios = await axios.get(url);
  try {
    let weather = climateAxios.data.current_condition[0];

    let heatIndex = weather.FeelsLikeC;
    let emoji = getEmojiForWeatherCode(weather.weatherCode);
    let heatString = `${heatIndex}`;
    let { str_hora } = hourNow();
    let climate = {
      temp_C: weather.temp_C,
      humidity: weather.humidity,
      text: weather.lang_pt[0].value,
      heatIndex: heatString.slice(0, 4),
      str_hora,
      emoji,
    };
    if (channelSlash) {
      return {
        embeds: [
          embedBuilder(
            `Clima de ${city} agora ${str_hora}`,
            ` A temperatura está em :**${climate.temp_C}Cº**
          Humidade em **${climate.humidity}%**
          **${climate.text}** ${climate.emoji}
          Sensação térmica de **${climate.heatIndex}Cº**
        `,
          ),
        ],
      };
    }
    if (channel)
      return channel.send({
        embeds: [
          embedBuilder(
            `Clima de ${city} agora ${str_hora}`,
            ` A temperatura está em :**${climate.temp_C}Cº**
          Humidade em **${climate.humidity}%**
          **${climate.text}** ${climate.emoji}
          Sensação térmica de **${climate.heatIndex}Cº**
        `,
          ),
        ],
      });
  } catch (err) {
    return 'erro';
  }
};

/**
 *
 * @param {*} codeEmojiWeather:number
 * @returns promise:Emoji
 */
function getEmojiForWeatherCode(codeEmojiWeather: number) {
  const emoji: any = emojis;
  const weather: any = weatherCode;
  return emoji[0][weather[0][codeEmojiWeather]];
}
/**
 *
 * @param {*} tempC
 * @param {*} velWindKm
 * @returns
 */
function heatIndexCalculator(tempC: any, velWindKm: any) {
  return (
    33 + ((10 * Math.sqrt(velWindKm) + 10.45 - velWindKm) * (tempC - 33)) / 22
  );
}

const getNameWeekFunc = (x: any) => {
  return [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
  ][x];
};
function hourNow() {
  const horaenv: any = process.env.HORA || 3;
  var data = new Date();
  var dia = data.getDate(); // 1-31
  var dia_sem = data.getDay(); // 0-6 (zero=domingo)
  var mes = data.getMonth(); // 0-11 (zero=janeiro)
  var ano4 = data.getFullYear(); // 4 dígitos
  var hora: any = data.getHours(); // 0-23
  hora = hora - horaenv;
  var min = data.getMinutes(); // 0-59
  var seg = data.getSeconds(); // 0-59
  const getNameWeek = getNameWeekFunc;
  // Formata a data e a hora (note o mês + 1)
  var str_data = dia + '/' + (mes + 1) + '/' + ano4;
  var str_hora = hora + ':' + min + ':' + seg;
  return { getNameWeek, dia_sem, str_data, str_hora };
}
