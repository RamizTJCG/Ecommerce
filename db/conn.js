const mongoose = require('mongoose');
require('dotenv').config()
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/youtubeRegistration',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(() => {

        console.log('db connection seccessfull');        
    }).catch(() => {
        console.log('db connection Failed');
    });    
  }