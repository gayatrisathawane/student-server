import express from 'express';

const app = express();

const PORT = 8080;

app.use(express.json())

const students = []
app.get('/students', (req, res) => {
    res.json(
        {
            status: true,
            data: students,
            message: "successfull fetch dada  "
        })

})

app.post('/addstudent', (req, res) => {
    const id = Math.floor(Math.random() * 100) + 1
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

    const obj = {
        id: id,
        name: name,
        age: age
    }

    students.push(obj)

    res.send(
        {
            data: students,
            message: "added daa"
        }
    )

})

app.get('/student', (req, res) => {

    let student = null

    const { id } = req.query;
    students.forEach((stud) => {
        if(stud.id == id) {
            student = stud
        }
    })

    if (student == null) {
        return res.json({
            message: "not found"
        })
    }

    res.json({

        data: student,
        status: "successfully fetch"
    })

})





app.listen(PORT, () => {
    console.log("port running")
})