// Require News Schema
const News = require ("../models/News");
const Note = require ("../models/Note");

module.exports = {

    // Here we'll save the news based on the JSON input.
    save: (req, res)=>{
        const entry = new News(req.body.data);
          // Now, save that entry to the db
          entry.save((err, doc)=> {
            // Log any errors
            if (err) {
            console.log(err);
            }
            // Or log the doc
            else { 
            res.json(doc._id);      
            };
          });
    },
        
    getSavedNews: (req, res)=>{
      //find all saved news
      News.find({})
      .populate("note")
      .exec((err,doc)=>{
        if (err){
          console.log(err);
        }else{
          res.json(doc);
        }
      });
    },

    deleteNews: (req, res)=>{
      //delete news by its id
      News.findById(req.params.id)
      .exec((err, doc)=> {
        console.log(doc._id);
        // Log any errors
        if (err) {
          console.log(err);
        } else {
          // check if that news has its notes
          if(doc.note[0]){
            //delelet its notes first
            for(let i = 0; i < doc.note.length; i++){
                // Delete Note by id from note array inside of news schema
                Note.findByIdAndRemove(doc.note[i])
                // Execute the above query
                .exec((err, doc)=> {
                  // Log any errors
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("Note deleted");
                    }
                })
            }
          }
          // then delete the news
          News.findByIdAndRemove(doc._id)
          .exec((err, doc)=>{
          // Log any errors
            if (err) {
              console.log(err);
            } else {
              console.log("News deleted");
              res.json(doc);
            }
          })
        }
      })
    },

    saveNotes:(req, res)=>{
         // Create a new note and pass the req.body to the entry
        var newNote = new Note({"note": req.body.newsObj.note});

        // And save the new note the db
        newNote.save((error, doc)=> {
            // Log any errors
            if (error) {
              console.log(error);
            }
            // Otherwise
            else {
                // Use the News id to find and update its note
                News.findOneAndUpdate({ "_id": req.body.newsObj.ID }, {$push: {"note": doc._id}})
                
                // Execute the above query
                .exec((err, newsDoc)=> {
                    // Log any errors
                    if (err) {
                      console.log(err);
                    }
                    //send new doc to browser
                    else{
                     res.json(newsDoc);
                    }
                });   
            }
        });
    },

    deleteNotes: (req, res)=>{
      Note.findByIdAndRemove(req.params.id)
      .exec((err,done)=>{
        // Logs any errors
        if(err){
          console.log("err")
        }else{
          //If deteled successfully let browsers know
          res.json(done);
        }
      })
    }
};