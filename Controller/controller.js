const samplecontroller=require('../Model/model');
const multer = require('multer');
const path = require('path'); // inbuilt module in node

exports.create=async(req,res,next)=>    {
    try{
        const { name,age}=req.body;
     const value=new samplecontroller({name,age})
     await value.save();
     return res.status(201).json({message:"record added succesfully",data:value});
        }
        catch(e)
        {
            return res.status(400).json({error:"something went wrong",message:e.message});
        }
};

exports.getall = async(req,res,next)=> {
    try{
        const SampleDoc = await samplecontroller.find({});
        return res.status(200).json({data:SampleDoc})
    }
    catch(err){
        return res.status(404).json({message:err.message})
    }
}

exports.update = async (req,res,next)=>{
    try{
        const {id} = req.params;
        const{name,age} = req.body;

        const updatedObject = {};

        if(name) updatedObject.dbname = name;
        if(age) updatedObject.dbage = age;
        const updatedRecord = await samplecontroller.findByIdAndUpdate(id,updatedObject,{new:true});


        if(!updatedRecord){
            return res.status(400).json({error:'Record not found'});
        }
        
        res.status(200).json({message:"Record Updated Successfully", data : updatedRecord})
        
    }
    catch(err){
        return res.status(400).json({message:err.message});
    }
}

exports.imageupload = async(req,res,next)=>{
    try
    {
        let uploadedFileName = '';
        const filePath = path.join(__dirname + '/Data/Image');
        const UploadStorage = multer.diskStorage({
            destination:filePath,
            filename:(req,file,cb)=>{
                const originalname = file.originalname;
                const fileExtension = path.extname(originalname);
                const uniqueSuffix = Date.now();
                const newFileName = path.basename(originalname,fileExtension)+ '_' + uniqueSuffix + fileExtension;
                uploadedFileName = '/Data/Image/' + newFileName ;

                cb(null,newFileName)
            }
        }); 
        const upload = multer({storage:UploadStorage},).single('image');

        upload(req,res,async function(err){
            if(err){
                return res.status(500).json({command :"Error Uploading file",err})
            }
            res.status(200).json({ImageUploaded:uploadedFileName})
        })  
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
}