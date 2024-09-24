const router=require('express')
const App_Server=router()
App_Server.use('/api',require('./Route/route'))
module.exports=App_Server;

