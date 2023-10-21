import express, { query } from 'express';
import mongoose ,{model ,Schema} from 'mongoose';

const app = express();

const PORT = 8080;

app.use(express.json())

const MONGODB_URL= 'mongodb+srv://gayatrisathawane:gayatri123@cluster0.cqdx7ze.mongodb.net/Cluster0'


const connectMongoDb = async () => {

    const conn = await mongoose.connect(MONGODB_URL)
    console.log("mongo db connect")

}
connectMongoDb()


const StudentSchema = new Schema({
   name:String,
   age:Number

})
const Student = model('Student',StudentSchema)








app.get('/students', async(req, res) => {

    const savedDocuments = await Student.find();
    res.json(
        {
            status: true,
            data: savedDocuments,
            message: "successfull fetch dada  "
        })

})

app.post('/addstudent', async (req, res) => {

    const { name, age } = req.body

    if (!name) {
        return res.json({
            message: "name is required"
        })
    }
    if (!age) {
        return res.json({
            message: "age is required"
        })
    }

      const studentobj = new Student({
        name:name,
        age:age
      })
        
      const saveStudentData  = await studentobj.save()

    res.json(
        {
            data: saveStudentData,
            message: "added daa"
        }
    )

})

app.get('/student', async(req, res) => {

  
       const { _id } = req.query
       const getdata = await Student.findOne({_id:_id})
    

    res.json({

        data:getdata ,
        status: "successfully fetch"
    })

})

// delete data by id 
app.delete('/student/:_id' , async(req,res) => {

    const { _id } = req.params ;

    await Student.deleteOne({ _id : _id })

    res.json(
        {
            message: `delete data ${ _id }`
        })
    })

//update  one data PUT



app.listen(PORT, () => {
    console.log("port running")
})