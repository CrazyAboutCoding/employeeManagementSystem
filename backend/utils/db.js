import mysql from 'mysql2'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Student"
})

con.connect(function(err) {
    if(err) {
        console.log(err)
    } else {
        console.log("Connected")
    }
})

export default con;