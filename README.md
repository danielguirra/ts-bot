<!DOCTYPE html>
<html lang="pt-BR">

<body>

  <h1 class="center">TS-BOT</h1>

  <div class="center">
    <a href="https://discord.gg/QujfHqdUDg" target="_blank" rel="noopener noreferrer">
      <img src="https://cdn.discordapp.com/avatars/811255307673010246/8f145d7279847a9a6e46efd5ee3df6bf.webp?format=webp" alt="TS-Bot Logo" width="200" />
    </a>
  </div>

  <h2>Resumo</h2>
  <p>Bot para administração de servidores Discord com funcionalidades como banimento, criação de tags importantes com embeds, mensagens de boas-vindas, e muito mais.</p>

  <hr />

  <h2>Requisitos</h2>
  <p>Para desenvolvimento, você precisa apenas do Node.js e do gerenciador de pacotes (npm ou yarn). Use o arquivo <code>.envexample</code> como modelo para suas variáveis de ambiente.</p>

  <h3>Tokens necessários</h3>
  <ul>
    <li><strong>Token Discord</strong>: Obtenha no <a href="https://discord.com/developers" target="_blank" rel="noopener noreferrer">Discord Developer Portal oficial</a></li>
    <li><strong>Token TenorGif</strong>: Obtenha no <a href="https://tenor.com/gifapi" target="_blank" rel="noopener noreferrer">Tenor API oficial</a></li>
  </ul>

  <hr />

  <h2>Instalação do Node.js</h2>

  <h3>Windows</h3>
  <p>Baixe o instalador no <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">site oficial do Node.js</a>.</p>

  <h3>Ubuntu</h3>
  <pre><code>sudo apt install nodejs
sudo apt install npm
</code></pre>

  <h3>Outros sistemas</h3>
  <p>Consulte os sites oficiais do <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a> e do <a href="https://npmjs.org/" target="_blank" rel="noopener noreferrer">npm</a>.</p>

  <hr />

  <h2>Versões utilizadas</h2>
  <pre><code>node --version
v20.11.1

npm --version
v10.2.4
</code></pre>

  <p>Recomendo usar essas versões para evitar incompatibilidades.</p>

  <hr />

  <h2>Deploy</h2>
  <p>Você pode fazer deploy em plataformas como Heroku, Replit ou executar localmente.</p>

<a href="https://heroku.com/deploy?template=https://github.com/danielguirra/ts-bot/" target="_blank" rel="noopener noreferrer" class="button">Deploy no Heroku</a>
<a href="https://replit.com/github.com/danielguirra/ts-bot/" target="_blank" rel="noopener noreferrer" class="button">Deploy no Replit</a>

  <hr />

  <h2>Instalação do projeto</h2>
  <pre><code>git clone https://github.com/danielguirra/ts-bot.git
cd ts-bot
npm install
# ou
yarn install
</code></pre>

  <hr />

  <h2>Build</h2>
  <pre><code>npm run build
# ou
yarn build
</code></pre>

  <hr />

  <h2>Execução</h2>
  <pre><code>npm run start
# ou
yarn start
</code></pre>

  <hr />

  <h2>Desenvolvimento</h2>
  <pre><code>npm run dev
# ou
yarn dev
</code></pre>

  <hr />

  <h2>Docker</h2>

  <h3>Build da imagem</h3>
  <pre><code>docker build . -f ./Dockerfile -t ts-bot-image
</code></pre>

  <h3>Executar container</h3>
  <pre><code>docker run -p 4040:4040 --name ts-bot ts-bot-image
</code></pre>

  <hr />

  <h2>Docker Compose</h2>
  <pre><code>docker-compose up -d
</code></pre>

  <hr />

  <h2>Licença</h2>
  <p><a href="https://choosealicense.com/licenses/mit/" target="_blank" rel="noopener noreferrer">MIT</a></p>

</body>
</html>
