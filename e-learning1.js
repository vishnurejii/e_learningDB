//create Database
// use e_learningDB

//create user collection
db.createCollection("users",{
    validator:{
        $jsonSchema:{
            bsonType:"object",
            required:["name","email","password","role"],
            properties:{
                name:{bsonType:"string"},
                email:{bsonType:"string"},
                password:{bsonType:"string"},
                role:{enum:["student","instructor"]},
                isVerified:{bsonType:"bool"},
                createdAt:{bsonType:"date"}
            }
        }
    }
})

db.users.createIndex({ email: 1 }, { unique: true })


db.users.insertMany([
  { _id: 1, name: "Rahul", email: "rahul@web.com", password: "pass", role: "instructor", isVerified: true, createdAt: new Date() },
  { _id: 2, name: "Anjali", email: "anjali@web.com", password: "pass", role: "instructor", isVerified: true, createdAt: new Date() },
  { _id: 3, name: "Kiran", email: "kiran@web.com", password: "pass", role: "instructor", isVerified: true, createdAt: new Date() },

  { _id: 4, name: "Meera", email: "meera@ds.com", password: "pass", role: "instructor", isVerified: true, createdAt: new Date() },
  { _id: 5, name: "Arjun", email: "arjun@ds.com", password: "pass", role: "instructor", isVerified: true, createdAt: new Date() },
  { _id: 6, name: "Priya", email: "priya@ds.com", password: "pass", role: "instructor", isVerified: true, createdAt: new Date() },

  { _id: 7, name: "Vikram", email: "vikram@cyber.com", password: "pass", role: "instructor", isVerified: true, createdAt: new Date() },
  { _id: 8, name: "Sneha", email: "sneha@cyber.com", password: "pass", role: "instructor", isVerified: true, createdAt: new Date() },
  { _id: 9, name: "Rohit", email: "rohit@cyber.com", password: "pass", role: "instructor", isVerified: true, createdAt: new Date() }
])



for (let i = 10; i < 20; i++) {
  db.users.insertOne({
    _id: i,
    name: "Student" + (i - 9),
    email: "student" + (i - 9) + "@gmail.com",
    password: "pass",
    role: "student",
    isVerified: true,
    createdAt: new Date()
  })
}



//create course collection

db.createCollection("courses",{
    validator:{
        $jsonSchema:{
            bsonType:"object",
            required:["title","price","instructorId"],
            properties:{
                title:{bsonType:"string"},
                description:{bsonType:"string"},
                price:{bsonType:"number"},
                instructorId:{bsonType:"objectId"},
                categoryId:{bsonType:"objectId"},
                rating:{bsonType:"number"},
                totalStudents:{bsonType:"int"},
                level:{enum:["beginner","intermediate","advanced"]

                }

            }
        }
    }
})


db.courses.insertMany([
  { _id: 1, title: "MERN Bootcamp", price: 5000, instructorId: 1, categoryId: 1, rating: 4.5, totalStudents: 0, level: "beginner" },
  { _id: 2, title: "Advanced React", price: 4000, instructorId: 2, categoryId: 1, rating: 4.7, totalStudents: 0, level: "advanced" },

  { _id: 3, title: "Python for Data Science", price: 4500, instructorId: 4, categoryId: 2, rating: 4.8, totalStudents: 0, level: "beginner" },
  { _id: 4, title: "Machine Learning", price: 6000, instructorId: 5, categoryId: 2, rating: 4.9, totalStudents: 0, level: "advanced" },

  { _id: 5, title: "Ethical Hacking", price: 5500, instructorId: 7, categoryId: 3, rating: 4.6, totalStudents: 0, level: "intermediate" },
  { _id: 6, title: "Network Security", price: 5000, instructorId: 8, categoryId: 3, rating: 4.4, totalStudents: 0, level: "beginner" }
])




//create lessons collection

db.createCollection("lessons",{
    validator:{
        bsonType:"object",
        required:["courseId","title"],
        properties:{
            courseId:{bsonType:"objectId"},
            title:{bsonType:"string"},
            videoUrl:{bsonType:"string"},
            duration:{bsonType:"number"},
            order:{bsonType:"int"}
        }
    }
})


db.createCollection("lessons")

db.lessons.insertMany([
  { _id: 1, courseId: 1, title: "Intro to MERN", duration: 20, order: 1 },
  { _id: 2, courseId: 1, title: "MongoDB Basics", duration: 25, order: 2 },
  { _id: 3, courseId: 3, title: "Python Basics", duration: 30, order: 1 }
])




//create entrollments collection

db.createCollection("entrollments")

db.entrollments.createIndex(
    {courseId: 1, studentId: 1},
    {unique: true}
)

db.createCollection("enrollments")

db.enrollments.insertMany([
  { _id: 1, studentId: 10, courseId: 1, enrolledAt: new Date(), paymentId: 1 },
  { _id: 2, studentId: 11, courseId: 3, enrolledAt: new Date(), paymentId: 2 }
])


//create reviw collection

db.createCollection("reviews",{
    validator:{
        $jsonSchema:{
            bsonType:"object",
            required:["courseId","studentId","rating"],
            properties:{
                rating:{
                    bsonType:"int",
                    minimum:1,
                    maximum:5
                }
            }
        }
    }
})


db.createCollection("reviews")

db.reviews.insertMany([
  { _id: 1, courseId: 1, studentId: 10, rating: 5, comment: "Excellent!", createdAt: new Date() },
  { _id: 2, courseId: 3, studentId: 11, rating: 4, comment: "Very Good", createdAt: new Date() }
])


//create category collection

db.createCollection("categories")

db.categories.insertMany([
  { _id: 1, name: "Web Development" },
  { _id: 2, name: "Data Science" },
  { _id: 3, name: "Cyber Security" }
])


//create payment collection

db.createCollection("payments")


db.createCollection("payments")

db.payments.insertMany([
  { _id: 1, studentId: 10, courseId: 1, amount: 5000, paymentStatus: "completed", transactionId: "TXN001", createdAt: new Date() },
  { _id: 2, studentId: 11, courseId: 3, amount: 4500, paymentStatus: "completed", transactionId: "TXN002", createdAt: new Date() }
])



//phase 2

db.courses.aggregate([
  { $sort: { rating: -1 } },
  { $limit: 3 },
  {
    $project: {
      _id: 1,
      title: 1,
      rating: 1,
      price: 1
    }
  }
])


db.payments.aggregate([
  {
    $group: {
      _id: "$courseId",
      totalRevenue: { $sum: "$amount" }
    }
  },
  {
    $lookup: {
      from: "courses",
      localField: "_id",
      foreignField: "_id",
      as: "courseDetails"
    }
  }
])


db.courses.aggregate([
  {
    $lookup: {
      from: "payments",
      localField: "_id",
      foreignField: "courseId",
      as: "payments"
    }
  },
  {
    $unwind: "$payments"
  },
  {
    $group: {
      _id: "$instructorId",
      totalEarnings: { $sum: "$payments.amount" }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "instructorDetails"
    }
  }
])



db.payments.aggregate([
  {
    $group: {
      _id: { month: { $month: "$createdAt" } },
      monthlyRevenue: { $sum: "$amount" }
    }
  },
  { $sort: { "_id.month": 1 } }
])
