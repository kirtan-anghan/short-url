const mongooes = require('mongoose');
const url = "mongodb+srv://kirtan__2004:V5JOWvmNM84uH1aY@k2004.skcu64n.mongodb.net/k2004?retryWrites=true&w=majority&appName=AtlasApp"

async function dbconnect(){
    await mongooes.connect(url , {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { console.log('Connected to database') })
    .catch((err) => { console.log(err) })
}
module.exports =  {dbconnect};