import requests from './httpServices';

const CategoryServices = {
  getAllCategory() {
    return requests.get('/category');
  },
  getByIdCategory(id) {
    return requests.get(`/category/${id}` );
  },
  upadeCategory(body) {
    return requests.put(`/category/${body.id}`,body); 
  },
  creteCategory(body){
    return requests.post('/category/add',body); 
  },
  deleteCategory(body){
    return requests.delete(`/category/${body._id}`); 
  }
};

export default CategoryServices;
