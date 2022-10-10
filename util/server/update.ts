import { exec } from 'child_process';
import { CronJob } from 'cron';

console.log('Iniciando att');

export const att = (x: string) => {
  const a = new CronJob(
    `* * ${x} * * *`,
    () => {
      exec(
        'cd .. && cd .. && cd .. && cd .. && cd sbond && cd receitas-gostosas-api && bash git.sh',
        (err, out, er) => {
          if (err) console.log(err);
          if (out) {
            console.log(out);
          }
          if (err) console.log(err);
        },
      );
    },
    () => {
      let a: any = this;
      a.stop();
    },
    true,
    undefined,
  );

  return 'OK';
};
