import axios from "axios";

/*
  --------------- (Url base de Agustín Ruatta) ---------------
  baseURL: 'https://laboratorio3-f36a.restdb.io/rest/transactions',
	headers: {'x-apikey': '64bdbb6f86d8c5e18ded91e3'}
  -----------------------------------------------------------------
  getUserTransactionsInfo(userId){
    return apiClient.get(`q={"user_id": "${userId}"}`);
  },
  -----------------------------------------------------------------
  .catch(error => {
      if (error.response && error.response.status === '404'){
        error404Manipulation();
      }
    });
  -----------------------------------------------------------------
  -------------------- (Url base de Emiliano) --------------------
  baseURL: 'http://localhost:8080/rest/transactions',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
  -----------------------------------------------------------------
  getUserTransactionsInfo(userId){
    const apiClientPurchase = axios.create({
      // TODO: Una vez cumplido los objetivos del proyecto como realiza el 'posteo' de las transacciones y otras cosas, arreglar el problema de la 'url' para que sea universal y no individual para cada consulta.
      baseURL: 'http://localhost:8080/rest/transactions?userId=' + userId,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    return apiClientPurchase.get();
  }
*/

const apiClient = axios.create({
	baseURL: 'https://laboratorio3-f36a.restdb.io/rest/transactions',
	headers: {
    'x-apikey': '60eb09146661365596af552f'
  }
});

export default{
  getUserTransactionsInfo(userId){
    return apiClient.get(`q={"user_id":"${userId}"}`);
  },
  postNewTransaction(transactionInfo){
    return apiClient.post('', transactionInfo);
  },
  patchSelectedTransaction(transactionId, transactionInfo){
    return apiClient.patch('/' + transactionId, transactionInfo);
  },
  deleteSelectedTransaction(transactionId){
    return apiClient.delete('/' + transactionId);
  }
}