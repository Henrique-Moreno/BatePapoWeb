# Bate Papo Web - Backend

## Descrição do Projeto

Este é o backend para o aplicativo de bate-papo web "Bate Papo Web", desenvolvido em JavaScript utilizando Node.js. O projeto utiliza diversas dependências para garantir funcionalidades essenciais e segurança. Além disso, o armazenamento de dados foi simulado utilizando JSON.

## Dependências

- **bcrypt:** Utilizado para a criptografia de senhas, garantindo armazenamento seguro e não reversível. Isso é crucial para proteger as informações sensíveis dos usuários.
  
- **cors:** Configurado para permitir comunicação entre o frontend e o backend, protegendo contra ataques de origens cruzadas (CORS). Facilita a integração com diferentes origens.

- **express:** Framework web para Node.js, facilitando a criação de rotas e o tratamento de solicitações HTTP. Essencial para construir uma aplicação web robusta.

- **express-async-error:** Adiciona suporte a tratamento de erros assíncronos no Express, melhorando a legibilidade do código e facilitando a detecção de problemas.

- **express-session:** Gerencia sessões de usuário de forma segura, armazenando informações relevantes. Necessário para manter o estado da sessão durante interações do usuário.

- **jsonwebtoken:** Implementa autenticação baseada em tokens JWT para autenticar usuários de maneira eficiente e segura. Essencial para proteger rotas e dados sensíveis.

- **uuid:** Gera identificadores únicos universalmente, úteis para atribuir IDs exclusivos a usuários ou mensagens. Ajuda a manter a integridade dos dados.

## Armazenamento de Dados

O armazenamento de dados foi simulado utilizando arquivos JSON. Embora não seja adequado para produção em grande escala, é uma solução simples e eficaz para simulações e projetos menores, proporcionando uma fácil manipulação de dados.

## Configuração e Instalação

1. **Instalação de Dependências:**
    ```bash
    npm install
    ```

2. **Configuração do Banco de Dados:**
   - Configure o banco de dados conforme necessário.

3. **Configuração das Variáveis de Ambiente:**
   - Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias.

4. **Executando o Servidor:**
    ```bash
    npm start
    ```
