Projeto em NodeJS que funciona como um editor de texto online.
- Cada url é gerada e armazenada no banco de dados
  - Cada url possui seu próprio conteúdo
  - O conteúdo salva automaticamente 3 segundos após a inserção do ultimo caractere
  - Qualquer pessoa pode entrar e alterar o conteúdo da url
  - Alterações possíveis de perceber em tempo real (socket.io)
  - No banco de dados é salvo a quantidade de vezes que determinada url foi acessada

- Principais Dependências usadas:
  * Framework p/ criar o servidor: express
  * Tranferência de dados em tempo real: socket.io
  * Template engine: ejs
  * Variáveis de ambiente: dotenv
  
- Todas as outras dependências estão listadas em package.json
