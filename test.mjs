import supertest from 'supertest';
import chai from 'chai';
import { app } from './main.js';

const expect = chai.expect;
const request = supertest(app);

describe('API Tests', () => {
  // Prueba para obtener el spread de alerta
  it('retornar el spread de alerta', async () => {
    const response = await request.get('/api/alertSpread');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('alertSpread');
  });

  // Prueba para obtener el spread de un mercado por Id
  const markerId = 'BTC-CLP'
  it('calcular spread para un mercado en especifico', async () => {
    const response = await request.get(`/api/calculateSpread/${markerId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('market_id');
    expect(response.body).to.have.property('spread');
  });
   
  // Prueba para obtener spreads de todos los mercados
  it('retornar spread de todos los mercados', async () => {
    const response = await request.get('/api/spreads');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.have.property('market_id');
    expect(response.body[0]).to.have.property('spread');
  });
});
