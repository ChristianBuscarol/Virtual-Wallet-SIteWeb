import axios from "axios";

/*
  baseURL: 'https://laboratorio3-f36a.restdb.io/rest/transactions',
	headers: {'x-apikey': '64bdbb6f86d8c5e18ded91e3'}
*/

const apiClient = axios.create({
	baseURL: 'http://localhost:8080/rest/transactions',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

export default{
  getUserTransactionsInfo(userId){
    const apiClientPurchase = axios.create({
      // TODO: Una vez cumplido los objetivos del proyecto como realiza el 'posteo' de las transacciones y otras cosas, arreglar el problema de la 'url' para que sea universal y no individual para cada consulta.
      baseURL: 'http://localhost:8080/rest/transactions?userId=' + userId,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    return apiClientPurchase.get();
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