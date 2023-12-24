# Prueba Software Engineer.

## Instalacion de dependencias

``` npm install ```

## Ejecutar la API
Para iniciar la API, ejecuta el siguiente comando en tu terminal

``` node main.js ```

## Ejecutar Test

``` npm test ```


## Endpoints de la API

| Método | URL                               | Descripción                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | `/api/calculateSpread/:market_id` | Obtener el spread de un mercado por Id|
| GET    | `/api/spreads`                    | Obtener spreads de todos los mercados  |
| GET    | `/api/alertSpread`                | Obtener el spread de alerta           |
