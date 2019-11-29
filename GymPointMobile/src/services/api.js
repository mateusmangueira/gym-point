import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333', // Android pelo emulador, se for genymotion 10.0.3.2 e se for via USB usa o ip da rede
});

export default api;
