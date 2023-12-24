# Software Engineer.

instalacion de dependencias
```bash
npm install
```
## Ejecutar la API
Para iniciar la API, ejecuta el siguiente comando en tu terminal:
```bash
node main.js
```
## Ejecutar Test
```bash
npm test
```


## Endpoints de la API

| Método | URL                               | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | `/api/calculateSpread/:market_id` | Obtener el spread de un mercado por Id|
| GET    | `/api/spreads`                    | Obtener spreads de todos los mercados  |
| GET    | `/api/alertSpread`                | Obtener el spread de alerta           |
