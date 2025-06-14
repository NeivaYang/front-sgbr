# front-test-sgbr (front-end-test-sgbr)

This is a Quasar Framework project for a front-end test

## Install the dependencies

### Instale as dependências

```bash
yarn
# or
## ou
npm install
```

## Create a .env file

### Crie um arquivo .env

```bash
cp .env.example .env

# And then edit the .env file to set your environment variables
## E então edite o arquivo .env para definir suas variáveis de ambiente
```

## Start the app in development mode (hot-code reloading, error reporting, etc.)

### Inicie o app em modo de desenvolvimento (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

## Environment Variables

### Variáveis de Ambiente

Para que o app funcione corretamente, é necessário definir as seguintes variáveis de ambiente no arquivo `.env`:

```bash
VITE_GIPHY_API_KEY=your_giphy_api_key
VITE_GIPHY_API_URL=https://api.giphy.com/v1/gifs
```

---

Seguindo os passos acima e configurando corretamente as variáveis `VITE_GIPHY_API_KEY` e `VITE_GIPHY_API_URL` no arquivo `.env`, já é possível rodar o app em modo de desenvolvimento.
