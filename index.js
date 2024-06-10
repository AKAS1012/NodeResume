const PORT = 8000
const { query } = require('express');
var express = require('express');
var app = express();
const cors = require('cors');
var sql = require("mssql");
var Request = require('tedious').Request; 
var multer = require("multer");
var path = require("path");
var pdf = require('html-pdf');

// var admin = require("firebase-admin");
// var serviceAccount = require("path/to/serviceAccountKey.json");

// require("dotenv").config();

// const {validatorSchema}  = require("./Validation")
// app.use('/firebase/fcm', require('./firebase/fcm'));
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const maxSize = 1*1024*1024;
const upload = multer({
    storage :storage,
    fileFilter:(req,file,cb)=>{
        if (file.mimetype=="images/png" ||file.mimetype=="images/jpg" || file.mimetype=="images/jpeg"){
            cb(null, true);
        }
        else{
            cb(null, true);
        }
    },
    limits:{fieldSize:maxSize}
}).single('file')

// config for your database
const sqlConfig = {
    user:'sa', 
    password:"1234",
    server: "DESKTOP-TTMUCAF",
    database:"ONtime_Att", 
     pool: {
       max: 10,
       min: 0,
      idleTimeoutMillis: 30000
    },  
    options: {
        encrypt: false, 
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1'
      }
      }
  }


    app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE", );
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});


app.use(cors());
app.use(express.json());



app.post("/Create",async function (_req, res) { 
    const {error} = validatorSchema(_req.body)
    if (error)
    {
       const {details} = error
       return res.json({error:details});
    }
    else
    {
       await sql.connect(sqlConfig).then(pool => {  
       // Stored procedure
       return pool.request()
           .input('@pname', sql.NVarChar(45), _req.body.fullName)
           .input('@pCode', sql.VarChar(100), _req.body.Email)
           .input('@pDiscription', sql.NVarChar(100), _req.body.Passwordfield)
           .execute("ProductData")

   }).then((recordset, Message) => {
       return res.json(Message="Company Details Has been Created");
       // Response.json(recordset);
   }).catch(err => {
       // ... error checks
       console.log("Error while connecting to database:- " + err);
       res.send(err);
   })
    }
});


app.put("/company/:Code", async function (_req, Response) {
    await sql.connect(sqlConfig).then(pool => {
        // Stored procedure
        return pool.request()
        .input('CompanyCode', sql.NVarChar(45), _req.body.CompanyCode)
        .input('CompanyName', sql.VarChar(100), _req.body.CompanyName)
        .input('Address', sql.NVarChar(100), _req.body.Address)
        .input('Phone', sql.NVarChar(45), _req.body.Phone)
        .input('Email', sql.NVarChar(45), _req.body.Email)
        .input('Website', sql.NVarChar(45), _req.body.Website)
        .input('Country', sql.NVarChar(45), _req.body.Country)
        .input('state', sql.NVarChar(45), _req.body.state)
        .input('City', sql.NVarChar(45), _req.body.City)
        .input('Pincode', sql.NVarChar(45), _req.body.Pincode)
        .input('TinNo', sql.NVarChar(45), _req.body.TinNo)
        .input('PanNo', sql.NVarChar(45), _req.body.PanNo)   
        .query("UPDATE  ComDeatils SET  Code=@CompanyCode,Comname=@CompanyName,Phone=@Phone , Email=@Email ,Web=@Website ,Country=@Country ,Sstate=@state, City=@City ,Pinno=@Pincode ,Tinno =@TinNo,Panno=@PanNo  WHERE  Code=@CompanyCode ")
    }).then((recordset) => {
        Response.json(recordset);
    }).catch(err => {
        console.log("Error while connecting to database:- " + err);
        Response.send(err);
    })
});

app.delete("/employees/:employee_id",  async function (_req, Response){
    await sql.connect(sqlConfig).then(pool=>{
         return pool.request()
        .input('employee_id', sql.NVarChar(45), console.log(_req.body.employee_id))
        .query("delete  from employees where employee_id=@employee_id");
}).then((recordset)=>{
    Response.json(recordset)
}).catch((err)=>{
    console.log("Error while connecting to database:- " + err);
    Response.send(err);  
})
})

app.get('/dealer', async function (_req, Response) {
    await sql.connect(sqlConfig).then(pool=>{
        let equery = "select * from employees"
        return pool.request().query(equery);
}).then((recordset, returnValue)=>{
    Response.json(recordset)
    // console.log(recordset)
}).catch((err)=>{
    console.log("Error while connecting to database:- " + err);
    Response.send(err);  
})
});

// Profile Image
app.use('/file',express.static('upload/images'))

app.post('/uploadImage', async function (_req, res){
    // const {username} = _req.body;
    upload(_req, res, function(err){
        if(err instanceof multer.MulterError){
            res.json({
                success:0,
                messgae:err.message
            })
        }
        else{
            try{
                    sql.connect(sqlConfig).then(pool=>{
                    return pool.request()
                    .input('file', sql.NVarChar(100),  _req.file.filename)
                    .input('username', sql.VarChar(100),_req.body.username)
                    .input('userprofile', sql.VarChar(100), _req.body.userprofile)
                    .query("insert into userPic(filename, username, userprofile) values(@file, @username,@userprofile)");
                  })
                   res.json({
                   success:1,
                   profile_url:`http://localhost:8000/upload/images/${ _req.file.filename}`
                })
            }  
            catch(err){
                console.log("Error while connecting to database:- " + err);
                res.send(err);  
            }
        }
    })
});

// .query("insert into userPic(filename, username, userprofile) values(@file, @username,@userprofile)");


function errorhandle(err, req, res, next){
    if(err instanceof multer.MulterError){
        res.json({
            success:0,
            messgae:err.message
        })
    }
}
app.use(errorhandle)
app.get('/getImage',async function (_req, res){
   
    await sql.connect(sqlConfig).then(pool=>{
        return pool.request()
       .query("select * from userPic");
}).then((recordset)=>{
console.log(res.json(recordset));
}).catch((err)=>{
   console.log("Error while connecting to database:- " + err);
   res.send(err);  
})

});

app.get('/getPic',async function (_req, res){
   
    await sql.connect(sqlConfig).then(pool=>{
        return pool.request()
       .query("select * from userPic");
}).then((recordset)=>{
console.log(res.json(recordset));
}).catch((err)=>{
   console.log("Error while connecting to database:- " + err);
   res.send(err);  
})

});

// contect info
app.get('/contactInfo',async function (_req, res){
   
    await sql.connect(sqlConfig).then(pool=>{
        return pool.request()
       .query("select * from ContactInfo");
}).then((recordset)=>{
console.log(res.json(recordset));
}).catch((err)=>{
   console.log("Error while connecting to database:- " + err);
   res.send(err);  
})

});

// Eduction
app.get('/userEduction',async function (_req, res){
   
    await sql.connect(sqlConfig).then(pool=>{
        return pool.request()
       .query("select * from Education");
}).then((recordset)=>{
console.log(res.json(recordset));
}).catch((err)=>{
   console.log("Error while connecting to database:- " + err);
   res.send(err);  
})

});

// Company details
app.get('/Compantdets',async function (_req, res){
   
    await sql.connect(sqlConfig).then(pool=>{
        return pool.request()
       .query("select * from Compantdets");
}).then((recordset)=>{
console.log(res.json(recordset));
}).catch((err)=>{
   console.log("Error while connecting to database:- " + err);
   res.send(err);  
})

});
// Skills
app.get('/skills',async function (_req, res){
   
    await sql.connect(sqlConfig).then(pool=>{
        return pool.request()
       .query("select * from skills");
}).then((recordset)=>{
console.log(res.json(recordset));
}).catch((err)=>{
   console.log("Error while connecting to database:- " + err);
   res.send(err);  
})

});
// Interest
app.get('/userInterest',async function (_req, res){
   
    await sql.connect(sqlConfig).then(pool=>{
        return pool.request()
       .query("select * from Interest");
}).then((recordset)=>{
console.log(res.json(recordset));
}).catch((err)=>{
   console.log("Error while connecting to database:- " + err);
   res.send(err);  
})

});

app.post('/userPostInterest',async function (_req, res){
   
    await sql.connect(sqlConfig).then(pool=>{
        return pool.request()
        .input("Interest", sql.NVarChar(45), _req.body.Interest)
       .query("insert into Interest(Interests) values(@Interest)");
}).then((recordset)=>{
console.log(res.json(recordset));
}).catch((err)=>{
   console.log("Error while connecting to database:- " + err);
   res.send(err);  
})

})

app.delete('/userDeleteInterest/:id',async function (_req, res){
   
    await sql.connect(sqlConfig).then(pool=>{
        return pool.request()
        .input("Interest", sql.NVarChar(45), _req.body.Interest)
       .query("delete from Interest where Interest=@Interest ");
}).then((recordset)=>{
console.log(res.json(recordset));
}).catch((err)=>{
   console.log("Error while connecting to database:- " + err);
   res.send(err);  
})
})

// Download file 
app.get('/Resumepdf/:id',async function (_req, res){
   
    await sql.connect(sqlConfig).then(pool=>{
        return pool.request()
        .input("Interest", sql.NVarChar(45), _req.body.Interest)
       .query("select up.filename,up.username, up.userprofile, ci.Mobno, ci.useremail,ci.Linkedin, ci.Addresss,ed.yyear, ed.Class, ed.University,c.periodYear, c.profileDesig,c.CompanyName,c.projectDetsils from  Interest e inner join Compantdets c on c.id = e.id  left join userPic up on up.id = c.id left join ContactInfo ci on ci.id = c.id left join Education ed on ed.id= c.id   --where up.id=17");
}).then((recordset)=>{
console.log(res.json(recordset));
}).catch((err)=>{
   console.log("Error while connecting to database:- " + err);
   res.send(err);  
})
})


app.listen(PORT,  ()=> {
    console.log('Server is running '+ PORT);
    // console.log(openai);
});








