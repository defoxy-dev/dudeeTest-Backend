const express = require('express');
const router = express.Router();
const restaurants = require('../data')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const request = require('request');
dotenv.config();

require('../models/wmdata.model.js')

const washingMachine = mongoose.model('WMdata');


router.get('/',(req,res)=>{
    washingMachine.find().then((data) => {

        if (data) {
          const poArr = [];

          data.forEach((data) => {
            poArr.push({
              id: data.id,
              pictureUrl: data.pictureUrl,
              wmStatus: data.wmStatus,
              exp: data.exp,
              price: data.price,
             
            });
          
        });

          res.status(200).json({
            success: true,
            data: poArr,
          });
        } else {
          res.status(400).json({ success: false, msg: 'po not found!' });
        }
      })
      .catch((err) => res.status(400).json('Error: ' + err))
})

router.put('/price',(req,res)=>{
    if(req.body.price != null && req.body.id!= null){
        washingMachine.findOne({id:req.body.id})
        .then((data)=>{
           
            data.price=req.body.price
            data.save().then(() =>
            res
              .status(200)
              .json({ success: true, msg: 'po updated!' })
          )
          .catch((err) =>
            res
              .status(400)
              .json({ success: false, msg: `Error ${err}` })
          );
        })
        
    }
    
})
router.put('/',(req,res)=>{
  if(req.body.price != null && req.body.id!= null
    && req.body.exp!= null
    && req.body.wmStatus!= null){
      washingMachine.findOne({id:req.body.id})
      .then((data)=>{
         
          data.price=req.body.price
          data.wmStatus=req.body.wmStatus
          data.exp=req.body.exp
          data.save().then(() =>
          res
            .status(200)
            .json({ success: true, msg: data })
        )
        .catch((err) =>
          res
            .status(400)
            .json({ success: false, msg: `Error ${err}` })
        );
      })  
  } 
})
router.put('/status',(req,res)=>{
  if(req.body.id!= null && req.body.wmStatus!= null){
      washingMachine.findOne({id:req.body.id})
      .then((data)=>{
          data.wmStatus=req.body.wmStatus
          data.save().then(() =>
          res
            .status(200)
            .json({ success: true, msg: data })
        )
        .catch((err) =>
          res
            .status(400)
            .json({ success: false, msg: `Error ${err}` })
        );
      })    
  } 
})

router.post('/notify',(req,res)=>{
  var url_line_notification = "https://notify-api.line.me/api/notify";

request({
    method: 'POST',
    uri: url_line_notification,
    header: {
        'Content-Type': 'multipart/form-data',
    },
    auth: {
        bearer: process.env.TOKEN,
    },
    form: {
        message: req.body.ms
    },
}, (err, httpResponse, body) => {
    if (err) {
        console.log(err)
    } else {
      res
      .status(200)
      .json(body)
    }
})


})

module.exports = router;