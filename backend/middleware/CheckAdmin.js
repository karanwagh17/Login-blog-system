

const CheckAdmin = (req,res,next) => {
   

    if(req.user.role!="admin")
    {
        return res.status(400).json({message:"you are not admin"})
    }
    next()

}

module.exports= CheckAdmin
