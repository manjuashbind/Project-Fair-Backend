const projects=require('../Models/projectSchema')

//add project Logic

exports.addUserProject=async(req,res)=>{
    console.log("Inside AddUser Projects");
    // res.status(200).json("Add user project request")
    
    //User id get
    const userId=req.payload
    //get add project details

    const {title,language,github,link,overview}=req.body
    //get image
    projectImage=req.file.filename
    console.log(projectImage);

    //logic of adding new project

    try{

        const existingProject=await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exists")
        }
        else{
            const newProject= new projects({title,language,github,link,overview,projectImage,userId})
        await newProject.save()//save new project details into mongodb
        res.status(200).json(newProject)//send response to client
        }
    }
    catch(err){
        res.status(404).json({message:err.message})

    }
}

//get user project from mongo db
exports.getUserProject=async(req,res)=>{
    //get userId
    const userId=req.payload

    //api request
    try{

        const userProject=await projects.find({userId})
        console.log(userProject);
        res.status(200).json(userProject) //send response to clientt

    }
   
    catch(err){
        res.status(401).json(err.message)
    }
}

//get all project for searching
exports.getAllProjects=async(req,res)=>{
    //searching code
    const searchKey=req.query.search
    const query={
        language:{
            $regex:searchKey,
            $options:"i"
        }
    }

    try{
        const AllProjects=await projects.find(query)
        res.status(200).json(AllProjects)
    }
    catch(err){
        res.status(401).json(err.message)
    }
}
//logic to get three projects to show in home page
exports.getHomeProject=async (req,res)=>{
    try{
        const HomeProject=await projects.find().limit(3) //to show only 3 projects
        res.status(200).json(HomeProject)

    }
    catch(err){
        res.status(401).json(err.message)
    }
}

//4 Edit project details
exports.editProject = async(req,res)=>{
const {title,language,github,link,overview,projectImage}=req.body;
const uploadImage = req.file?req.file.filename:projectImage

const userId=req.payload
const {id}=req.params
try{
    //find the particlar project in mongodb and update projectDetails
    const updateProject=await projects.findByIdAndUpdate({_id:id},{title,language,github,link,overview,projectImage:uploadImage,userId},{new:true})
    //save updated project details
    await updateProject.save()
    //responsesend back to the client
    res.status(200).json(updateProject)

}
catch(err){
res.status(401).json(err)
}
}


//5)delete project

exports.deleteProject = async(req,res)=>{
    const {pid} = req.params
    try{
        const deleteData= await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteData)

    }
    catch(err){
        res.status(401).json(err)
    }
}
