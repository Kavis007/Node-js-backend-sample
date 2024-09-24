 const{Schema,model}=require('mongoose')
 const sampleone=new Schema({
   dbname:{type:String},
   dbage:{type:Number}
 })
 module.exports=model('nodejs1',sampleone)