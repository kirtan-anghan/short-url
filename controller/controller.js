
const data = require('../model/model.js');
const shortid = require('shortid');
const express = require('express');
const path = require('path');
const app = express();
const qrcode = require('qrcode');



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function getActualUrl(req, res) {


    if(!req.body.actual_url){   
        res.status(400).send(`<script>alert('Please Enter URL');window.location.href = '/';</script>`);
    }

else{
    const actual_url = req.body.actual_url;
    const short_url = shortid.generate(actual_url);
    const qrCode = await createQRcode(`https://short-linkss.vercel.app/${short_url}`);
    await data.create({
        actual_url: actual_url,
        short_url: short_url,
        clicks: 0,
        qrcode : qrCode,
    })
        .then((data) => {
            res.status(200).send(`<script>window.location.href = '/';</script>`);
        })
        .catch((err) => {
            res.send(err);
        })
}
}

async function createQRcode(url) {
    try {
        const qrImage = await qrcode.toDataURL(url);
        return qrImage;
      } catch (error) {
        throw new Error('Error generating QR code.');
      }
    }


async function handleRedirect(req, res) {
    await data.findOneAndUpdate({ short_url: req.params.short_url },
         { $inc: { clicks: 1 } })
        .then((data) => {
            res.redirect( data.actual_url);
        }
        ).catch((err) => {
            res.send(err);
        })
}

async function count_totalClicks(req, res) {
    const data1 = await data.find({});
    let totalClicks = 0;
    for (let i = 0; i < data1.length; i++) {
        totalClicks = totalClicks + data1[i].clicks;
    }
    return totalClicks;``
}


async function handleAlluser(req, res) {
   const alldata =  await data.find({})
   const count  = await count_totalClicks();

    res.render('index.ejs' , { data :  alldata , totalClicks : count});
}

module.exports = { getActualUrl, handleRedirect , handleAlluser}
