import axios from "axios";

/*
  baseURL: 'https://laboratorio3-f36a.restdb.io/rest/transactions',
	headers: {'x-apikey': '64bdbb6f86d8c5e18ded91e3'}
*/

const apiClient = axios.create({
	baseURL: 'http://localhost:8080/rest/transactions?userId=Alfito123'
});

export default{
  getTransactionInfo(userId){
    return apiClient.get(userId)
  },
  postNewTransaction(){
    return apiClient.post()
  }
}