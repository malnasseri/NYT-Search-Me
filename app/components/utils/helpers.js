// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// NYT API Key
const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

const queryURLbase = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${authKey}&q=`;

// Helper functions for making API Calls
const helpers = {

  // This function serves our purpose of running the query to NYT.
  runQuery: function(searchTopic, searchStartYear, searchEndYear) {

      let queryURL = ""
      // if users don't enter start year nor  end year
      if (searchTopic && !searchStartYear && !searchEndYear){
          queryURL = `${queryURLbase}${searchTopic}`
      
        // if users don't enter end year
      } else if (searchTopic && searchStartYear && !searchEndYear){
          queryURL = `${queryURLbase}${searchTopic}&begin_date${searchStartYear}0101`
     
        // if users don't enter start year
      } else if (searchTopic && !searchStartYear && searchEndYear){
          queryURL = `${queryURLbase}${searchTopic}&end_date${searchEndYear}0101`

      } else {
          queryURL = `${queryURLbase}${searchTopic}&begin_date${searchStartYear}0101&end_date${searchEndYear}0101`
      }
    // Log Url
     console.log(queryURL);
      return axios.get(queryURL).then(function(res) {
      // If get a result, return that result's formatted address property
      if (res.data.response.docs[0]) {
        let news = []
        // Iterate through docs array and get only 5 news
         for(let i = 0; i < 5; i++){
            const snippet = res.data.response.docs[i].snippet;
            const headline = res.data.response.docs[i].headline.main;
            const url = res.data.response.docs[i].web_url;
            const date = res.data.response.docs[i].pub_date; 
            news.push({snippet: snippet, headline: headline, url: url, date: date});
         }
          return (news);
      }
      // If we don't get any results, return an empty string
      return (false);
    });
  },

  // This function hits our own server to retrieve the record of query results
  GetSavedNews: function() {
    return axios.get("/api/saved/news").then((data)=>{
      return (data)
    });
  },

  // This function posts new searches to our database.
  postNews: (news)=>{
    return axios.post("/news/save", { data: news }).then((data)=>{ 
      return (data.data);
    });
  },
  // This function delete news from database 
  deleteNews: (id)=>{
    return axios.delete(`/delete/news/${id}`).then((data)=>{ 
      return (data.data);
    });
  },
  // This function save notes to database
  saveNotes: (newsObj)=>{
    return axios.post("/notes/save", {newsObj}).then((id)=>{ 
      return (id.data);
    });
  },
  // This function delete notes from database
  deleteNotes: (noteId)=>{
    return axios.delete(`/delete/note/${noteId}`).then((data)=>{ 
      return (data.data);
    });
  }
};

// We export the API helper
export default helpers;
