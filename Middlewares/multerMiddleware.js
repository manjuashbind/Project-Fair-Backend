const multer = require('multer')

//to store multer data
const storage= multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    //create a new filename for image
    filename:(req,file,callback)=>{
        const filename=`image-${Date.now()}-${file.originalname}` //filename format
     callback(null,filename)
    }
})

//filter
const fileFilter = (req,file,callback)=>{
    const allowedMimeTypes=['image/png','image/jpeg','image/jpg']
    if(allowedMimeTypes.includes(file.mimetype) ){
        callback(null,true) //null if false case /true is condition true case
    }
    else{
        callback(null,false)
        return callback(new Error("Invalid File Type ..must be image/png or image/jpeg or image/jpg"))
    }

}
const multerConfig = multer({
    storage,fileFilter
})
module.exports= multerConfig