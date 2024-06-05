# Troca de Produtos

Este projeto oferece uma API para gerenciar trocas de produtos.

## Configuração do Ambiente

### MongoDB

Certifique-se de ter o MongoDB instalado e em execução. Lemrbe de fefina a variável de ambiente `MONGODB_URI` com a URL de conexão com o seu banco de dados MongoDB. Por exemplo:

```bash
export MONGODB_URI=mongodb://localhost:27017/troca-produtos
```
## Instalação de Dependências
Para instalar todas as dependências do projeto, execute o seguinte comando na raiz do projeto:

```bash
npm install
```

### Executando o Projeto
Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm run start
```
Isso iniciará o servidor na porta padrão 3000.

### Documentação da API
A documentação da API está disponível via Swagger. Você pode acessá-la navegando até:

```bash
http://localhost:3000/api
```

### Testando a API
Você pode usar ferramentas como Postman ou cURL para testar a API. Certifique-se de seguir a documentação da API para entender os endpoints disponíveis e seus payloads.
