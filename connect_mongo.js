const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://GeeksLearnEasy:GmIvDVAfuFlOPWuk@cluster0.yvyxpru.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection succesfull")
}).catch((e)=>{
    console.log(`error is ${e}`)
})


// GmIvDVAfuFlOPWuk