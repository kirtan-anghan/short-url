
const data = require('../model/model.js');
const shortid = require('shortid');
const express = require('express');
const path = require('path');
const app = express();



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function getActualUrl(req, res) {
    console.log(req.body.actual_url);

    if(!req.body.actual_url){   
        res.status(400).send('Please enter a url');
    }
else{
    await data.create({
        actual_url: req.body.actual_url,
        short_url: shortid.generate(req.body.actual_url),
        clicks: 0
    })
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.send(err);
        })
}
}

async function handleRedirect(req, res) {
    await data.findOneAndUpdate({ short_url: req.params.short_url },
         { $inc: { clicks: 1 } })
        .then((data) => {
            res.redirect( data.actual_url);
            console.log(data.actual_url);
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
