const http = require('http');
const PORT = process.env.PORT || 3001;
const app = require("./src/config/express.config")
const server=http.createServer(app);    
server.listen(PORT,(err)=>{
    if(!err){
        console.log("Server is running on port 3001")
        console.log("Press Ctrl + C to stop the server")
    }
})