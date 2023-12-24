import express from 'express';
import { getMarkets, getSpread } from './fetch.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

let alertSpread = 363130;

function setAlertSpread(newSpread) {
  alertSpread = newSpread;
  console.log( `Spread de alerta actualizado: ${alertSpread}`);
}

// Obtener el spread de un mercado por Id
app.get('/api/calculateSpread/:market_id', async (req, res) => {
  const market_id = req.params.market_id;
  try {
    const spread = await getSpread(market_id);

    checkAlertSpread(market_id, spread);

    setAlertSpread(spread); // Actualizar el spread de alerta al calcular el spread
    res.json({ market_id, spread });
  } catch (error) {
    res.status(404).json({ error: `Error al calcular el spread para ${market_id}` });
  }
});

// Obtener spreads de todos los mercados
app.get('/api/spreads', async (req, res) => {
  try {
    const marketsData = await getMarkets();
    const markets = marketsData.markets;

    const spreads = await Promise.all(markets.map(async market => {
      try {
        const spread = await getSpread(market.id);

        return { market_id: market.id, spread };
      } catch (error) {
        return { market_id: market.id, spread: 'No disponible' };
      }
    }));

    res.json(spreads);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los spreads de los mercados' });
  }
});

// Requerimiento 3: Obtener el spread de alerta
app.get('/api/alertSpread', (req, res) => {
  res.json({ alertSpread });
});

// 
function checkAlertSpread(market, spread) {
  if (spread > alertSpread) {
    console.log(`Alerta: Spread en ${market} es mayor que el spread de alerta.`);
  } else if (spread < alertSpread) {
    console.log(`Alerta: Spread en ${market} es menor que el spread de alerta.`);
  }
}

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


export {app}