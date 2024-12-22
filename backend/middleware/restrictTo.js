const restrictTo = (...roles)=>{
    return (req,res,next)=>{
       const userRole = req.user.role
       if(!roles.includes(userRole)){
       return res.status(403).json({ message : "you don't have permission for this.forbidden" })
       }
       next()
    }

}

export default restrictTo