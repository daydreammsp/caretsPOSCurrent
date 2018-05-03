const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
let request = require("request");
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
    
      console.log(body);
      
      res.send(body)
    });
    })

    router.post('/', (req, res) => {
        let randomNum = Math.floor(Math.random() * 1000);
        console.log(req.body.amount)
        let totalAmount = parseInt(req.body.amount)
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
                 [ { name: 'Printed T Shirt',
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
             redirect_url: 'http://localhost:3000/Checkout' },
          json: true };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          console.log(body);
          
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

  console.log(body);
  res.send(body.objects)
});       
});

router.post('/postproduct', (req, res) => {
  let randomNum = Math.floor(Math.random() * 1000);
  let options = { method: 'POST',
  url: 'https://connect.squareup.com/v2/catalog/batch-upsert',
  headers: 
   { 
     'Cache-Control': 'no-cache',
     Accept: 'application/json',
     Authorization: 'Bearer sq0atp--xOe6YM9OchfFi_-1UURRw',
     'Content-Type': 'application/json' },
  body: 
   { idempotency_key: '789ff020-f723-43a9-b4b5-43b5dc1fa34575009'+ randomNum,
     batches: 
      [ { objects: 
           [ { type: 'ITEM',
               id: '#Tea',
               present_at_all_locations: true,
               item_data: 
                { name: 'cola',
                  description: 'Hot Cola Juice',
                  category_id: '#Beverages',
                  tax_ids: [ '#SalesTax' ],
                  variations: 
                   [ { type: 'ITEM_VARIATION',
                       id: '#Tea_Mug',
                       present_at_all_locations: true,
                       item_variation_data: 
                        { item_id: '#Tea',
                          name: 'Mug',
                          pricing_type: 'FIXED_PRICING',
                          price_money: { amount: 150, currency: 'USD' } } } ] } },
             { type: 'ITEM',
               id: '#Coffee',
               present_at_all_locations: true,
               item_data: 
                { name: 'Coffee',
                  description: 'Hot Bean Juice',
                  category_id: '#Beverages',
                  tax_ids: [ '#SalesTax' ],
                  variations: 
                   [ { type: 'ITEM_VARIATION',
                       id: '#Coffee_Regular',
                       present_at_all_locations: true,
                       item_variation_data: 
                        { item_id: '#Coffee',
                          name: 'Regular',
                          pricing_type: 'FIXED_PRICING',
                          price_money: { amount: 250, currency: 'USD' } } },
                     { type: 'ITEM_VARIATION',
                       id: '#Coffee_Large',
                       present_at_all_locations: true,
                       item_variation_data: 
                        { item_id: '#Coffee',
                          name: 'Large',
                          pricing_type: 'FIXED_PRICING',
                          price_money: { amount: 350, currency: 'USD' } } } ] } },
             { type: 'CATEGORY',
               id: '#Beverages',
               present_at_all_locations: true,
               category_data: { name: 'Beverages' } },
             { type: 'TAX',
               id: '#SalesTax',
               present_at_all_locations: true,
               tax_data: 
                { name: 'Sales Tax',
                  calculation_phase: 'TAX_SUBTOTAL_PHASE',
                  inclusion_type: 'ADDITIVE',
                  percentage: '5.0',
                  applies_to_custom_amounts: true,
                  enabled: true } } ] } ] },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
  // res.send(body.objects)
});       
});

router.post('/deleteproduct', (req, res) => {
  let productId = req.body
  console.log(productId)
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

  console.log(body);
})
})
    module.exports = router;