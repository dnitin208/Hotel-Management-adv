
const express = require("express");
const bodyparser = require("body-parser");
// const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://dnitin28:test123@cluster0.i4on07m.mongodb.net/hotelDB",{useNewUrlParser: true});

const app = express();
// 1---->
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

// let bed_no="",facility="";
let no=0,room_n=0;

let exp="",msg="";



// ...................................................................................................................................................................................................................................................................................................................................
// ...................................................................................................................................................................................................................................................................................................................................
// CHECK----->>>


const checkSchema = new mongoose.Schema({
    Roomid:{
        type: Number
    },
    No_of_bed:{
        type:Number
    },
    facility:{
        type:String
        // required: [true,"Please Fill the mandatory fields!!"]
    },
    accom:{
        type:String
        // required: [true,"Please Fill the mandatory Fields!!"]
    },
    free:{
        type: Number
    }

});


const Room=mongoose.model("Room",checkSchema);

                        
            // const room = [];
            // for(let i=1;i<=100;i++){
            
            //     if(i%4===0){
                                
            //         const roomm=new Room({
            //             Roomid:i,
            //             No_of_bed:1,
            //             facility:"Normal",
            //             accom:"AC",
            //             free:0
            //         });
            //         room.push(roomm);
            //     }
            //     else if(i%2===0){
            //         const roomm=new Room({
            //             Roomid:i,
            //             No_of_bed:1,
            //             facility:"King",
            //             accom:"AC",
            //             free:0
            //         });
            //         room.push(roomm);
            //     }
            //     else{
            //         const roomm=new Room({
            //             Roomid:i,
            //             No_of_bed:1,
            //             facility:"Queen",
            //             accom:"NAC",
            //             free:0
            //         });
            //         room.push(roomm);
            //     }
            // }

            // for(let i=101;i<=200;i++){
            
            //     if(i%4===0){
                                
            //         const roomm=new Room({
            //             Roomid:i,
            //             No_of_bed:2,
            //             facility:"Normal",
            //             accom:"AC",
            //             free:0
            //         });
            //         room.push(roomm);

            //     }
            //     else if(i%2===0){
            //         const roomm=new Room({
            //             Roomid:i,
            //             No_of_bed:2,
            //             facility:"King",
            //             accom:"AC",
            //             free:0
            //         });
            //         room.push(roomm);
            //     }
            //     else{
            //         const roomm=new Room({
            //             Roomid:i,
            //             No_of_bed:2,
            //             facility:"Queen",
            //             accom:"NAC",
            //             free:0
            //         });
            //         room.push(roomm);
            //     }
            // }

            // for(let i=201;i<=300;i++){
            
            //     if(i%4===0){
                                
            //         const roomm=new Room({
            //             Roomid:i,
            //             No_of_bed:3,
            //             facility:"Normal",
            //             accom:"AC",
            //             free:0
            //         });
            //         room.push(roomm);

            //     }
            //     else if(i%2===0){
            //         const roomm=new Room({
            //             Roomid:i,
            //             No_of_bed:3,
            //             facility:"King",
            //             accom:"AC",
            //             free:0
            //         });
            //         room.push(roomm);
            //     }
            //     else{
            //         const roomm=new Room({
            //             Roomid:i,
            //             No_of_bed:3,
            //             facility:"Queen",
            //             accom:"NAC",
            //             free:0
            //         });
            //         room.push(roomm);
            //     }
            // }

            // for(let i=301;i<=400;i++){
            
            //     if(i%4===0){
                                
            //         const roomm=new Room({
            //             Roomid:i,
            //             No_of_bed:4,
            //             facility:"Normal",
            //             accom:"AC",
            //             free:0
            //         });
            //         room.push(roomm);

            //     }
            //     else if(i%2===0){
            //         const roomm=new Room({
            //             Roomid:i,
            //             No_of_bed:4,
            //             facility:"King",
            //             accom:"AC",
            //             free:0
            //         });
            //         room.push(roomm);
            //     }
            //     else{
            //         const roomm=new Room({
            //             Roomid:i,
            //             No_of_bed:4,
            //             facility:"Queen",
            //             accom:"NAC",
            //             free:0
            //         });
            //         room.push(roomm);
            //     }
            // }

            // Room.insertMany(room,function(err){
            //     if(err){
            //         console.log(err);
            //     }
            //     else{
            //         console.log("added successfully");
            //     }
            // });



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});


app.get("/check",function(req,res){
    res.render("check",{});
});


app.post("/check",function(req,res){
    
    no=0;

    let bed_no=req.body.bedno;
    let fac = req.body.facilit;
    let accomod=req.body.accom;

    Room.find(function(err,rooms){
        if(err){
            console.log(err);
        }
        else{
            let len=rooms.length;
            for(let i=0;i<len;i++){
                
                if(rooms[i].No_of_bed==bed_no && rooms[i].facility==fac && rooms[i].accom==accomod && rooms[i].free<=0){
                    no++;
                    break;
                }
            }
        }
        setTimeout(function(){
            if(no>0) res.redirect("/available");
            else res.redirect("/unavailable");
        },1000);
    });

})

app.get("/available",function(req,res){
    res.render("available",{});
});

app.get("/unavailable",function(req,res){
    res.render("unavailable",{});
})


// ......................................................................................................................................................................................................................................................................................................................................
// ......................................................................................................................................................................................................................................................................................................................................
//  ADDD  ------>>>>>

const addSchema = new mongoose.Schema({
    name:{
        type:String
        
    },
    email:{
        type:String
        
    },
    contact:{
        type: String
    },
    aadhar:{
        type:String
    },
    roomno:{
        type:Number
    },
    date:{
        type:String
    },
    no_day:{
        type:Number
    }
});


const Allot = mongoose.model("Allot",addSchema);


let ac="";
let co=0;
let nm="";
let em="";
let con="";
let aa ="";

let dt="";

let amt=0;
let no_of_day=0;

app.get("/add",function(req,res){

    res.render("add",{
        room_no: room_n,
        amount: amt
    });

    
if(room_n>0){

    const allotment = new Allot({
        name:nm,
        email:em,
        contact:con,
        aadhar:aa,
        roomno:room_n,
        date:dt,
        no_day:no_of_day
    });
    room_n=0;
    amt=0;
    Allot.insertMany(allotment,function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Successfully added");
        }
    });

    Room.updateOne({Roomid:room_n},{free:1},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("sucessfully updated");
        }
    });

}

});

app.post("/add",function(req,res){

    room_n=0;
    nm = req.body.nam;
    em = req.body.emai;
    con = req.body.contac;
    aa = req.body.aadha;
    ac = req.body.accomodatio;
    co=req.body.coun;
    dt=req.body.dat;
    no_of_day = req.body.day;

    Room.find(function(err,rooms){
        if(err){    
            console.log(err);
        }
        else{
            let len=rooms.length;
            for(let i=0;i<len;i++){
                // console.log(rooms[i]);
                if(rooms[i].accom==ac && rooms[i].No_of_bed==co  &&  rooms[i].free==0){
                    room_n=rooms[i].Roomid;

                                    
                    if(ac=="AC"){
                        amt=(200*no_of_day);
                    }
                    else{
                        amt=(150*no_of_day);
                    }
    
                    Room.updateOne({Roomid: room_n},{free:1},function(err){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("updated successfully");
                        }
                    })
                    break;
                }
            }
        }
    })
    setTimeout(function(){
        if(room_n>0) res.redirect("/add");
        else res.redirect("/add_unavailable");
    },1000);
});


app.get("/add_unavailable",function(req,res){
    res.render("add_unavailable",{});
});


// ...............................................................................................................................................................................................................................................................................................................................................................
// ...............................................................................................................................................................................................................................................................................................................................................................
//  DELETE  ------>>>>>

let dl_name="",dl_room=0,dl_aadha="";

let dl_exp="",dl_msg="";let dl_date="";
let db_msgg="";
var cur_date = new Date();
let dd = String(cur_date.getDate()).padStart(2, '0');
let mm = String(cur_date.getMonth() + 1).padStart(2, '0'); 
let yyyy = cur_date.getFullYear();
cur_date = mm + '/' + dd + '/' + yyyy;
let diffDays;
// console.log("current date is "+cur_date);


app.get("/delete",function(req,res){
    res.render("delete",{});
});

app.post("/delete",function(req,res){
    // cur_date=Date();
    cur_date = new Date();
    let dd2 = String(cur_date.getDate()).padStart(2, '0');
    let mm2 = String(cur_date.getMonth() + 1).padStart(2, '0'); 
    let yyyy2 = cur_date.getFullYear();
    cur_date = mm2 + '/' + dd2 + '/' + yyyy2;

    dl_name=req.body.nam;
    dl_room=req.body.roo;
    dl_aadha=req.body.aadha;
    let ok=false;

         Allot.findOne({roomno:dl_room, name:dl_name, aadhar:dl_aadha},function(err,aaloo){
            if(err){
                console.log(err);
            }
            else if(!aaloo){
                res.redirect("/delete_unavailable");
            }
            else{
                    dl_date=aaloo.date;
                    no_of_day=aaloo.no_day;
                    dl_date = new Date(dl_date);
                    cur_date = new Date(cur_date);
                    let diffTime = Math.abs(cur_date - dl_date);
                    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    diffDays-=no_of_day;
                    console.log(diffDays);
                    diffDays*=150;
                    if(diffDays>0){
                        db_msgg="You have to give";
                    }
                    else{
                        diffDays=diffDays*(-1);
                        db_msgg="You have to take";
                    }
                    Room.updateOne({Roomid:dl_room},{free:0},function(err){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("Data deleted Successfully");
                        }
                    });
                    Allot.deleteMany({roomno:dl_room},function(err){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("Allotment data deleted");
                        }
                    });
                    ok=true;
                    res.redirect("/delete_available");
            }
         });

   
});

    app.get("/delete_available",function(req,res){
        res.render("delete_available",{
            db_mssg:db_msgg,
            fin:diffDays
        });
    });
    app.get("/delete_unavailable",function(req,res){
        res.render("delete_unavailable",{});
    });

//................................................................................................................................................................................................................................................................................................................................................................... 
//................................................................................................................................................................................................................................................................................................................................................................... 
// check about customer ------->>>>>


let search_nm;let search_em;let search_ct;let search_aa;let search_roo=0;


app.get("/search",function(req,res){
if(search_roo>0){
    res.render("search",{
        nam:search_nm,
        emai:search_em,
        contac:search_ct,
        roomn:search_roo,
        aadha:search_aa
    });
}
else{
    
}
});


app.post("/search",function(req,res){
    search_roo=0;
    search_nm=req.body.searching;   


    Allot.findOne({name:search_nm},function(err,alloted){
        if(err){
            console.log(err);
        }
        else if(!alloted){
            
            res.redirect("/customer_unavailable");
        }
        else{
            search_em=alloted.email;
            search_ct=alloted.contact;
            search_aa=alloted.aadhar;
            search_roo=alloted.roomno;
            res.redirect("/search");
        }
    });

});

app.get("/customer_unavailable",function(req,res){
    res.render("customer_unavailable",{});
});
//.................................................................................................................................................. 
//.................................................................................................................................................. 

const port = process.env.PORT || 3000;
app.listen(port ,function(req,res){
    console.log("Server is running at 3000");
})