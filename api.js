const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const StudentModel = require('./studentschema');
const EmployeeDetails = require('./EmployeeDetails');
const Salary = require('./SalaryDetails'); 


// Connecting to database
const query = 'mongodb+srv://yashmittal964:Yash%40123@cluster1.53tz1.mongodb.net/'

const db = (query);
mongoose.Promise = global.Promise;



mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database Connected successfully!");
})
.catch((error) => {
    console.log("Error connecting to the database: " + error);
});

router.use(express.json());
// In routes/students.js
// router.put('/students/updateByName', async (req, res) => {
//     const { Name, updatedData } = req.body;
//     try {
//       if (!Name || !updatedData) {
//         return res.status(400).json({ error: "Name and updatedData fields are required." });
//       }
      
//       const result = await Student.updateMany({ name: Name }, { $set: updatedData });
      
//       if (result.modifiedCount === 0) {
//         return res.status(404).json({ message: "No records found to update." });
//       }
  
//       res.json({ message: 'Records updated successfully', result });
//     } catch (error) {
//       console.error('Error updating records:', error.message);
//       res.status(500).json({ error: error.message });
//     }
//   });
  
router.get('/students/:studentId', async (req, res) => {
    try {
      const student = await StudentModel.findOne({ StudentId: req.params.studentId });
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// POST route to add a student
router.post('/addStudent', async (req, res) => {
    try {
        const student = new StudentModel(req.body);
        await student.save();
        res.status(201).send({ message: 'Student added successfully' });
    } catch (error) {
        res.status(400).send({ error: 'Failed to add student', details: error.message });
    }
});

//Create function//
// router.get('/getStudent', async function (req, res){
//     try{

//         const data1 = [{
            
//             StudentId: 103,
//             Name: "Harish",
//             Phone_No: "805-674-2123",
//             Country_code: "+92",
//             Age: 21 
//     },
//     {
        
//             StudentId: 110,
//             Name: "Shivam",
//             Phone_No: "805-674-1340",
//             Country_code: "+11",
//             Age: 11, 
//     },
//     {

//             StudentId: 120,
//             Name: "Shivansh",
//             Phone_No: "805-674-1980",
//             Country_code: "+91",
//             Age: 14, 
//         }
        
        
//     ]

//         // lookup 

//     const saveddata = await data1.flatMap(Object.values);
//     console.log(saveddata);



//     res.status(201).send({"data": saveddata}); 
// } catch (error) {
//     res.status(500).send({"error": "Error saving data", "details": error.message});
// }
// })

//Create function//
router.get('/get', async function (req, res){
    try{
    //     const data5 = [{
            
    //             StudentId: 103,
    //             Name: "Harish",
    //             Phone_No: "805-674-2123",
    //             Country_code: "+92",
    //             Age: 21 
    //     },
    //     {
            
    //             StudentId: 110,
    //             Name: "Shivam",
    //             Phone_No: "805-674-1340",
    //             Country_code: "+91",
    //             Age: 11, 
            
            
    //     }]
    //     console.log(data5, "data1");
    //     // const studentIdToInsert = 103;
    
    // const saveddata = await StudentModel.insertMany(data5);
    const result = await StudentModel.aggregate([
        {
            $lookup: {
                from: "Countries",       // The collection to join with
                localField: "Country_code",   // Field in the Student collection
                foreignField: "Country_code", // Matching field in CountryDetails
                as: "CountryInfo"             // Alias for the joined data
            }
        },
        {
            $addFields: {                  // Ensure null preservation
                CountryInfo: { $ifNull: ["$CountryInfo", null] }
            }
        }
    ]);
    res.status(201).send({"data": result}); 
} catch (error) {
    res.status(500).send({"error": "Error saving data", "details": error.message});
}
})


//update Function//
router.patch('/edit', async function (req, res) {
    

    try {

        const dataArray = [{
            StudentId: 102,
            Name: "Harsh",
            Phone_No: "805-674-2157",
            Country_code: "+91",
            Age: 23, 
        },
        {
            StudentId: 104,
            Name: "sam",
            Phone_No: "805-674-2121",
            Country_code: "+11",
            Age: 20, 

        }]

        console.log(dataArray,"dataArray")
        // const studentIdToUpdate = 104; 
        const updateData = { 
            Name: "Sam Updated", // New data you want to set
            Phone_No: "805-674-2122", // New phone number, for example
            Age: 21 // Updated age, for example
        };

        const datasaved = await StudentModel.updateOne(
            { _id: "671f2e4d8a94b3e09d53d73e" }, // Query to find the student
            { $set: updateData }
        );
        res.status(201).send({"data": datasaved}); 
        
    } catch (error) {
        res.status(500).send({"error": "Error saving data", "details": error.message});
    }
});

//Delete Function//
router.delete('/delete', async function (req, res) {

    try {

        const dataArr = [{
            StudentId: 102,
            Name: "Harsh",
            Phone_No: "805-674-2157",
            Country_code: "+91",
            Age: 23, 
        }]

        console.log(dataArr,"dataArr1")

        const savedata1 = await StudentModel.deleteOne(
            { Age:23}, // Query to find the student
        );
        res.status(201).send({"data": savedata1});  
        
    } catch (error) {
        res.status(500).send({"error": "Error saving data", "details": error.message});
    }
});

//find//

router.get('/add', async function (req, res){

    try {

        const data2= [{
            StudentId: 102,
            Name: "Harsh",
            Phone_No: "805-674-2157",
            Country_code: "+91",
            Age: 23, 
        },
        {
            StudentId: 105,
            Name: "sam",
            Phone_No: "805-674-2121",
            Country_code: "+11",
            Age: 20,
        },
            {
                StudentId: 103,
                Name: "Harsh",
                Phone_No: "805-674-2157",
                Country_code: "+91",
                Age: 23, 
            }]
            console.log(data2, "data2");
            const svedta = await StudentModel.find({});
    res.status(201).send({"data": svedta}); 
} catch (error) {
    res.status(500).send({"error": "Error saving data", "details": error.message});
}  
})

//findOne//
router.get('/add1', async function (req, res){

    try {

        const data2= [{
            StudentId: 102,
            Name: "Harsh",
            Phone_No: "805-674-2157",
            Country_code: "+91",
            Age: 23, 
        },
        {
            StudentId: 105,
            Name: "sam",
            Phone_No: "805-674-2121",
            Country_code: "+11",
            Age: 20,
        },
            {
                StudentId: 103,
                Name: "Harsh",
                Phone_No: "805-674-2157",
                Country_code: "+91",
                Age: 23, 
            }]
            console.log(data2, "data2");
            const svedta = await StudentModel.findOne({});
    res.status(201).send({"data": svedta}); 
} catch (error) {
    res.status(500).send({"error": "Error saving data", "details": error.message});
}  
})

//findOneAndDelete//
router.delete('/add2', async function (req, res){

    try {

        const data2= [{
            StudentId: 102,
            Name: "Harsh",
            Phone_No: "805-674-2157",
            Country_code: "+91",
            Age: 23, 
        },
        {
            StudentId: 105,
            Name: "sam",
            Phone_No: "805-674-2121",
            Country_code: "+11",
            Age: 20,
        },
            {
                StudentId: 103,
                Name: "Harsh",
                Phone_No: "805-674-2123",
                Country_code: "+92",
                Age: 21, 
            }]
            console.log(data2, "data2");
            const svedta = await StudentModel.findOneAndDelete({_id: "671f2c39f15deeae3595e207"});
    res.status(201).send({"data": svedta}); 
} catch (error) {
    res.status(500).send({"error": "Error saving data", "details": error.message});
}  
})

//findOneAndUpdate
router.get('/add3', async function (req, res){

    try {

        const data5= [{
            StudentId: 102,
            Name: "Harsh",
            Phone_No: "805-674-2157",
            Country_code: "+91",
            Age: 23, 
        },
        {
            StudentId: 105,
            Name: "sam",
            Phone_No: "805-674-2121",
            Country_code: "+11",
            Age: 20,
        },
            {
                StudentId: 103,
                Name: "Harsh",
                Phone_No: "805-674-2157",
                Country_code: "+91",
                Age: 23, 
            }]
            console.log(data5, "data5");
            const svedta = await StudentModel.findOneAndUpdate({_id: "671f2d1af33aa20cbadbcef6"},{$set:{Age:29}});
    res.status(201).send({"data": svedta}); 
} catch (error) {
    res.status(500).send({"error": "Error saving data", "details": error.message});
}  
})


// Update student by ID (instead of Name)
router.put('/update/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        
        // Find student by StudentId (not MongoDB _id)
        const student = await StudentModel.findOne({ StudentId: studentId });
        
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Update the student with the new data
        const updatedStudent = await StudentModel.findOneAndUpdate(
            { StudentId: studentId },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: 'Student updated successfully',
            data: updatedStudent
        });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ 
            error: 'Error updating student',
            details: error.message 
        });
    }
});
//Salary table

router.get('/join', async function (req, res) {
    try {
      // Data to be inserted into Salary collection
      const Emp_dta = [
        {
          Employee_id: "E12345",
          Month: "October 2024",
          salary: 5000
        },
        {
          Employee_id: "E67890",
          Month: "June 2024",
          salary: 6000
        }
      ];
  
      console.log(Emp_dta, "Emp_dta");
  
      // Insert salary data into the Salary collection
    //   const salaryData = await Salary.insertMany(Emp_dta);
  
      // Aggregate to join Employee and Salary collections
      const results = await Salary.aggregate([
        {
          $lookup: {
            from: 'employees',           // Collection name should match the Employee collection
            localField: 'Employee_id',   // Field in Salary schema
            foreignField: 'Employee_id', // Field in Employee schema
            as: 'employeeSalary'         // Output array field
          }
        },
        {
          $unwind:  {
            path: "$employeeSalary",
            preserveNullAndEmptyArrays: true,
          },   // Flatten the array
        },
        {
          $project: {
            _id: 0,
            employeeId: '$employeeSalary.Employee_id', // Field from Employee schema
            month: '$Month',
            salary: '$salary'
          }
        }
      ]);
  
      console.log(results);
      res.json(results); // Send the results as a response
    } catch (error) {
      console.error("Error fetching employee salaries:", error);
      res.status(500).send("Error fetching employee salaries");
    }
  });



module.exports = router;