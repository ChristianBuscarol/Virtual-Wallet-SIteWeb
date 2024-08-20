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
  getPurchaseTransactionInfo(userId){
    return apiClient.get('/userId=' + userId);
  },
  getSaleTransactionInfo(userId){
    return apiClient.get('?userId=' + userId + '/action=sell');
  },
  postNewTransaction(transactionInfo){
    return apiClient.post(transactionInfo);
  },
  patchSelectedTransaction(transactionId){
    return apiClient.patch('/' + transactionId);
  },
  deleteSelectedTransaction(transactionId){
    return apiClient.delete('/' + transactionId);
  }
}