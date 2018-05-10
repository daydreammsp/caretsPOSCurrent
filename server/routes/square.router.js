const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
let request = require("request");
const parseString = require('xml2js-parser').parseString;
// let rp = require('request-promise');



router.get('/get', (req, res) => {
    let options = { method: 'GET',
      url: 'https://connect.squareup.com/v2/locations/CBASEGcVZgUKS8RbqdkU-YjiBxggAQ/transactions',
      qs: 
       { begin_time: '2016-01-15T00:00:00Z',
         end_time: '2019-01-31T00:00:00Z' },
      headers: 
       { 
         'Cache-Control': 'no-cache',
         Accept: 'application/json',
         Authorization: 'Bearer sandbox-sq0atb-ffNvoCsEpPIf8cJyXHELlw',
         'Content-Type': 'application/json' } };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      // console.log(body);
      
      res.send(body)
    });
    })

    router.post('/', (req, res) => {
        let randomNum = Math.floor(Math.random() * 1000);
        console.log(req.body)
        let totalAmount = parseInt(req.body * 100)
        let options = { method: 'POST',
          url: 'https://connect.squareup.com/v2/locations/CBASEGcVZgUKS8RbqdkU-YjiBxggAQ/checkouts',
          headers: 
           { 
             'Cache-Control': 'no-cache',
             Accept: 'application/json',
             Authorization: 'Bearer sandbox-sq0atb-ffNvoCsEpPIf8cJyXHELlw',
             'Content-Type': 'application/json' },
          body: 
           { idempotency_key: '86ae1696-b1e3-4328-af6d-f1e04d947a23442989' + randomNum ,
             order: 
              { reference_id: 'reference_id',
                line_items: 
                 [ { name: 'Total',
                     quantity: '1',
                     base_price_money: { amount: totalAmount, currency: 'USD' },
                //      discounts: 
                //       [ { name: '7% off previous season item', percentage: '7' },
                //         { name: '$3 off Customer Discount',
                //           amount_money: { amount: 300, currency: 'USD' } } ] },
                //    { name: 'Slim Jeans',
                //      quantity: '1',
                //      base_price_money: { amount: 2500, currency: 'USD' } },
                //    { name: 'Woven Sweater',
                //      quantity: '3',
                //      base_price_money: { amount: 3500, currency: 'USD' },
                //      discounts: 
                //       [ { name: '$11 off Customer Discount',
                //           amount_money: { amount: 1100, currency: 'USD' } } ],
                     taxes: [ { name: 'Fair Trade Tax', percentage: '5' } ] } ],
                // discounts: 
                //  [ { name: 'Father\'s day 12% OFF', percentage: '12' },
                //    { name: 'Global Sales $55 OFF',
                //      amount_money: { amount: 5500, currency: 'USD' } } ],
                // taxes: [ { name: 'Sales Tax', percentage: '8.5' } ]
             },
            //  ask_for_shipping_address: true,
            //  merchant_support_email: 'merchant+support@website.com',
            //  pre_populate_buyer_email: 'example@email.com',
            //  pre_populate_shipping_address: 
            //   { address_line_1: '1455 Market St.',
            //     address_line_2: 'Suite 600',
            //     locality: 'San Francisco',
            //     administrative_district_level_1: 'CA',
            //     postal_code: '94103',
            //     country: 'US',
            //     first_name: 'Jane',
            //     last_name: 'Doe' },
             redirect_url: 'http://localhost:3000/CheckoutMain' },
          json: true };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          // console.log(body);
          
        res.send(body.checkout.checkout_page_url)
        });
        })


router.post('/getproducts', (req, res) => {
  let options = { method: 'POST',
  url: 'https://connect.squareup.com/v2/catalog/search',
  headers: 
   { 
     'Cache-Control': 'no-cache',
     Accept: 'application/json',
     Authorization: 'Bearer sq0atp--xOe6YM9OchfFi_-1UURRw',
     'Content-Type': 'application/json' },
  body: 
   { object_types: [ 'ITEM' ],
    //  query: { prefix_query: { attribute_name: 'name', attribute_prefix: 'tea' }
    //  },
     limit: 100 },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  // console.log(body);
  res.send(body.objects)
});       
});

router.post('/postproduct', (req, res) => {
  // console.log(req.body)
  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;
  let randomNum = Math.floor(Math.random() * 1000);
   let options = { method: 'POST',
  url: 'https://connect.squareup.com/v2/catalog/object',
  headers: 
   { 'Postman-Token': 'f6052267-3cf1-da17-2d9f-e4a2cc5cbe95',
     'Cache-Control': 'no-cache',
     Accept: 'application/json',
     Authorization: 'Bearer sq0atp--xOe6YM9OchfFi_-1UURRw',
     'Content-Type': 'application/json' },
  body: 
  { idempotency_key: 'af3d1afc-7212-4300-b463-0bfc531489898e' + randomNum,
  object: 
   { type: 'ITEM',
     id: "#Cocoa",
     updated_at: '2018-05-07T14:51:33.869Z',
     version: 1,
     is_deleted: false,
     present_at_all_locations: true,
     item_data: 
      { name: name,
        description: description,
        abbreviation: price,
        product_type: 'REGULAR' } } },
json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  else{
    // console.log(body)
    let options1 = { method: 'POST',
      url: 'https://connect.squareup.com/v2/catalog/search',
      headers: 
       { 
         'Cache-Control': 'no-cache',
         Accept: 'application/json',
         Authorization: 'Bearer sq0atp--xOe6YM9OchfFi_-1UURRw',
         'Content-Type': 'application/json' },
      body: 
       { object_types: [ 'ITEM' ],
        //  query: { prefix_query: { attribute_name: 'name', attribute_prefix: 'tea' }
        //  },
         limit: 100 },
      json: true };
    
    request(options1, function (error, response, body) {
      if (error) throw new Error(error);
    
      // console.log(body);
      res.send(body.objects)
    });       
    }
});       
});

router.post('/deleteproduct', (req, res) => {
  let productId = req.body
  // console.log(productId)
  let options = { method: 'DELETE',
  url: 'https://connect.squareup.com/v2/catalog/object/'+ productId,
  headers: 
   { 
     'Cache-Control': 'no-cache',
     Accept: 'application/json',
     Authorization: 'Bearer sq0atp--xOe6YM9OchfFi_-1UURRw',
     'Content-Type': 'application/json' } };

request(options, function (error, response, body){
  if (error) throw new Error(error);
else{
console.log(body)
let options1 = { method: 'POST',
  url: 'https://connect.squareup.com/v2/catalog/search',
  headers: 
   { 
     'Cache-Control': 'no-cache',
     Accept: 'application/json',
     Authorization: 'Bearer sq0atp--xOe6YM9OchfFi_-1UURRw',
     'Content-Type': 'application/json' },
  body: 
   { object_types: [ 'ITEM' ],
    //  query: { prefix_query: { attribute_name: 'name', attribute_prefix: 'tea' }
    //  },
     limit: 100 },
  json: true };

request(options1, function (error, response, body) {
  if (error) throw new Error(error);

  // console.log(body);
  res.send(body.objects)
});       
}
  
})
})

router.post('/postcash', (req, res) => {
      // console.log('POST cash route');
      // console.log(req.body);
      // console.log('is authenticated?', req.isAuthenticated());
      // console.log('user', req.user);
      if(req.isAuthenticated()){//in order to post an item, user must be signed in
          let queryText = `INSERT INTO transactions ("total") VALUES ($1);`;
          pool.query(queryText, req.body).then((result)=>{
              res.sendStatus(201);
          }).catch((err)=>{
              console.log(err);
              res.sendStatus(500)
          })
      } else {
          res.sendStatus(403);
      }
  });
  router.get('/getcash', (req, res) => {
    
        // console.log('/userinfo GET route');
        // console.log('is authenticated?', req.isAuthenticated());
        // console.log('user', req.user);
        if (req.isAuthenticated()) {
            let queryText = `SELECT * FROM transactions;`;
            pool.query(queryText).then((result) => {
                res.send(result.rows);
                console.log(result.rows);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(500);
            });
        } else {
            res.sendStatus(403);
        }
    });//end router

router.post('/getWeather', (req, res) => {
  


  let city = req.body.city;
  let state = req.body.state;
  let date = (req.body.date).split('-').join('');
  console.log(date)
    let options = { method: 'GET',
  url: 'http://api.wunderground.com/api/03fa8d24a90b1d6a/history_'+ 
  date +'/q/'+ 
  state +'/'+ 
  city +'.json',
  headers: 
   { 
     'Cache-Control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  res.send(body)
 });
});

router.post('/getevents', (req, res) => {
  let city = req.body.city;
  let date = (req.body.date).split('-').join('');
  let options = { method: 'GET',
  url: 'http://api.eventful.com/json/events/search?app_key=HftNddnqvkw8xDhd&location='+ 
  city +'&sort_order=date&date='+ date +'-'+ date,
  qs: { app_key: 'HftNddnqvkw8xDhd', id: 'E0-001-000278174-6' },
  headers: 
   { 
     'Cache-Control': 'no-cache',
     Authorization: 'Basic Og==' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
  res.send(body)
  
//   const xml = body;
// let events = parseString(xml, (err, result) => {
//   console.log(result.search.events[0]);
//   res.send(result.search.events[0])
// });
});
});
// eventful key HftNddnqvkw8xDhd


router.post('/productedit', (req, res) => {
  // console.log(req.body)
  let productId = req.body.productId;
  let version = req.body.version;
  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;
  // let editId = req.body.editId
  let randomNum = Math.floor(Math.random() * 1000);
   let options = { method: 'POST',
  url: 'https://connect.squareup.com/v2/catalog/object',
  headers: 
   { 
     'Cache-Control': 'no-cache',
     Accept: 'application/json',
     Authorization: 'Bearer sq0atp--xOe6YM9OchfFi_-1UURRw',
     'Content-Type': 'application/json' },
     
     body: 
     { idempotency_key: 'af3d1afc-7212-4300-b463-0bfc531489898e' + randomNum,
       object: 
        { type: 'ITEM',
          id: productId,
          updated_at: '2018-05-07T14:51:33.869Z',
          version: version,
          is_deleted: false,
          present_at_all_locations: true,
          item_data: 
           { name: name,
             description: description,
             abbreviation: price,
             product_type: 'REGULAR' } } },
    json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  else{
    console.log(body)
    let options1 = { method: 'POST',
      url: 'https://connect.squareup.com/v2/catalog/search',
      headers: 
       { 
         'Cache-Control': 'no-cache',
         Accept: 'application/json',
         Authorization: 'Bearer sq0atp--xOe6YM9OchfFi_-1UURRw',
         'Content-Type': 'application/json' },
      body: 
       { object_types: [ 'ITEM' ],
        //  query: { prefix_query: { attribute_name: 'name', attribute_prefix: 'tea' }
        //  },
         limit: 100 },
      json: true };
    
    request(options1, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
      res.send(body.objects)
    });       
    }
});       
});
    module.exports = router;