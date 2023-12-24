export const getSpread = (market_id) => {
  const url = `https://www.buda.com/api/v2/markets/${market_id}/ticker`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Error al calcular el spread para ${market_id}: Mercado no encontrado`);
        } else {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
      }
      return response.json();
    })
    .then(data => {
      if (data.ticker && data.ticker.max_bid && data.ticker.min_ask) {
        const maxBid = parseFloat(data.ticker.max_bid[0]);
        const minAsk = parseFloat(data.ticker.min_ask[0]);

        if (!isNaN(maxBid) && !isNaN(minAsk)) {
          return minAsk - maxBid;
        }
      }
      throw new Error(`Datos incorrectos para ${market_id}`);
    })
    .catch(error => {
      console.error(`Error al obtener spread para ${market_id}: ${error.message}`);
      throw error;
    });
};
  
export const getMarkets = () => {
  const url = 'https://www.buda.com/api/v2/markets';

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
      throw error;
    });
};
  