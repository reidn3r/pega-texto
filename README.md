<h1 align="center">PEGA-texto 📖</h1>

<p align="center">📝 Projeto em NodeJS que funciona como um editor de texto online, geralmente útil para estudantes que costumam compartilharem conteúdos (códigos? atividades? trabalhos? colas?) entre si (inspirado em dontpad.com) </p>

<hr>
  
### 💻 Tecnologias
Principais dependências utilizadas:
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/en/api.html)
- [Socket.io](https://socket.io/pt-br/docs/v4/)
- [Mongoose](https://mongoosejs.com/docs/populate.html)

### Rotas
- requisição GET em '/': 
    * renderiza a página inicial
- requisição POST em '/':
    * Após preenchimento do único campo da tela inicial acontece redireciomanento para a URL definida na barra de input
- requisição GET em '/qualquer_url':
    * URL dinâmica, acontece redirecionamento para a rota /qualquer_url independente de ser existente ou não
    * Cada URL possui seu próprio conteúdo
    * O conteúdo é salvo automaticamente após 3 segundos da inserção do último caractere
    * Qualquer pessoa pode alterar o conteúdo de qualquer rota
    * Alterações possíveis de perceber em tempo real (socket.io)
    * Para todas as rotas dinâmicas é contado a quantidade de vezes que foi acessada 
 - requisição GET em '/qualquer_url/zip':
    * Acontece o download do conteúdo da pagina em um arquivo .txt com o nome da url
    * Necessário atualizar a página para que o salvamento automático do conteúdo continue (será corrigido)
    * Em breve será possível baixar um arquivo .zip contendo o .txt

<hr>

<h1 align="center">
  <img alt="pega-texto" title="#PEGA-texto" src="./screenshots/img.png" />
</h1>

### Requisitos:
Necessário ter Git e Node instalado  


### ⌨️ Rodando o servidor:
```bash
# Clone este repositório
$ git clone https://github.com/reidn3r/pega-texto

# Acesse a pasta do projeto no terminal/cmd
$ cd pega-texto

# Instale as dependências
$ npm install

#Crie um arquivo com o nome '.env' na raíz do diretório do projeto. Nele, deve ser definido algumas variáveis de ambiente
   # variável PORT: deve ser associado um número inteiro, é a porta onde está rodando o servidor
   # variável DATABASE_URI: deve ser associado a URI de um banco de dados MongoDB

# Execute a aplicação em modo de desenvolvimento
$ npm run dev
