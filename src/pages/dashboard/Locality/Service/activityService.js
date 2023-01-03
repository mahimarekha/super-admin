import requests from './httpService';
const ActivityService = {
  getAllActivity() {
    return requests.get('/activity');
  },
//   upadeCity(body) {
//     return requests.put(`/city/${body.id}`,body); 
//   },
  creteActivity(body){
    return requests.post('/activity/add',body); 
  },
  deleteActivity(body){
    return requests.delete(`/activity/${body._id}`); 
  },
//   getAllCoupon() {
//     return requests.get('/coupon');
//   },
getAllAddClass() {
  return requests.get('/addclass');
},

  upadeActivity(body) {
    return requests.put(`/activity/${body._id}`,body); 
  },
//   creteCoupon(body){
//     return requests.post('/coupon/add',body); 
//   },
//   deleteCoupon(body){
//     return requests.delete(`/coupon/${body._id}`); 
//   },
//   createVendorOrdersById(body){
//     return requests.post('/orders/getvendororders',body); 
//   },

//   getAllVendorList() {
//     return requests.get('/vendorlist');
//   },

};

export default ActivityService;
