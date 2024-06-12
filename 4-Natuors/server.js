const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const app = require('./app')

// console.log(process.env);
//we can start server in this way
const port = process.env.port || 3000;
app.listen(port,()=>{
    console.log(`Server is started on port ${port}............`);
})

