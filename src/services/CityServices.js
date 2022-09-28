import requests from './httpServices';

const CityServices = {
  getAllCity() {
    return requests.get('/city');
  },
  upadeCity(body) {
    return requests.put(`/city/${body.id}`,body); 
  },
  creteCity(body){
    return requests.post('/city/add',body); 
  },
  deleteCity(body){
    return requests.delete(`/city/${body._id}`); 
  }
};

export default CityServices;
