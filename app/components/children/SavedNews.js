// import React from "react";
import React, { Component } from 'react';

// Helper for making AJAX requests to our API
import helpers from "../utils/helpers";


import Modal from 'react-bootstrap-modal';

class ModalExample extends Component {

  render(){
    let closeModal = () => this.setState({ open: false })

    let saveAndClose = () => {
      api.saveData()
        .then(() => this.setState({ open: false }))
    }

    return (
      <div>
        <button type='button'>Launch modal</button>

        <Modal
          show={this.state.open}
          onHide={closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Some Content here</p>
          </Modal.Body>
          <Modal.Footer>
            // If you don't have anything fancy to do you can use
            // the convenient `Dismiss` component, it will
            // trigger `onHide` when clicked
            <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>

            // Or you can create your own dismiss buttons
            <button className='btn btn-primary' onClick={saveAndClose}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}



class SavedNews extends Component {
    constructor(){
        super();
        this.state = {
            savedNews:[],
            noteInput: "",
            newsID:""
        }
        this.getSavedNews = this.getSavedNews.bind(this);
        this.renderSavedNews = this.renderSavedNews.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleAddNotes = this.handleAddNotes.bind(this);
        this.renderNotesModal = this.renderNotesModal.bind(this);
        this.handleNoteInputChange = this.handleNoteInputChange.bind(this);
        this.handleSaveNote = this.handleSaveNote.bind(this);
        this.renderSavedNotes = this.renderSavedNotes.bind(this);
    }
    //After this component is loaded then call getSavedNews function
    componentDidMount() {
        this.getSavedNews();
    }

    // to be able to access tootip with bootstrap place tooltip inside  DidUpdate
    componentDidUpdate(){
        $('[data-toggle="tooltip"]').tooltip()
    }

    getSavedNews() {
        // get saved news from server with helpers
        helpers.GetSavedNews().then(savedNews=>{
            // console.log(savedNews.data);
            // console.log("Run get saved News");
            //after data come back then set state
            this.setState({savedNews: savedNews.data})
        });
    }

    handleDeleteClick(id) {
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
        event.preventDefault();
        //send id to helper and delete from database then re-render
        helpers.deleteNews(id).then((data)=>{
            // console.log(`Deleted News and its notes`)
            this.getSavedNews()}
        );
    }

    handleDeleteNote(id) {
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
        event.preventDefault();
        //send id to helper and delete from database then re-render
        helpers.deleteNotes(id).then((data)=>{
            // console.log(`Deleted Note `)
            this.getSavedNews()}
        );
    }


    handleAddNotes(id) {
        
        console.log("+++++++++++++++++++++++++++++++" + id)
        // toggle modal to input notes
        $('.modal').modal();


        // set newsId state to whateever id in the add notes buttons clicked
        this.setState({newsID: id})

    }

    handleSaveNote() {
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
         event.preventDefault();

         // grab neccessary data to send back to the server
        const newsObj = {
            "ID": this.state.newsID,
            "note": this.state.noteInput
        }

        //send newsObj to server
        helpers.saveNotes(newsObj).then((data)=>{
            console.log(`Run handleSaveNote`);
            // if succeed then re-render the component
            this.getSavedNews()

             //Close modal
            $('.modal').modal('hide');
            //Reset state
            this.setState({noteInput: "", newsID: ""})
        });
    }

    handleNoteInputChange(event) {
        // set note input whenever users type
        this.setState({ noteInput: event.target.value});
    }

     renderSavedNotes(i){
        return this.state.savedNews[i].note.map((note, index)=>{
            return(
                <div className=""key={note._id}>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <button type="button" 
                                className="close" 
                                
                                onClick={()=>this.handleDeleteNote(note._id)}
                                >
                                <span>&times;</span>
                            </button>
                            <p className="note-p"><span className="label label-success">Note: </span>
                                {note.note}
                            </p>
                        </li>
                    </ul>
                </div>
            )
        })
    }

    renderNotesModal(){
         return this.state.savedNews.map((news, i)=>{
        return(
                
                <div className="modal" key={news._id}>

                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Please add your note here.</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="control-label">Type here.</label>
                                <input 
                                value={this.state.noteInput}
                                className="form-control input-lg" 
                                id="focusedInput" 
                                type="text"
                                onChange={this.handleNoteInputChange} 
                                />
                                {this.renderSavedNotes(i)}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" 
                            className="btn btn-default" 
                            data-dismiss="modal"
                            onClick={()=>this.setState({newsID: ""})}
                            >Close</button>
                            <button type="button" 
                            className="btn btn-primary save-btn"
                            onClick={this.handleSaveNote}
                            >Save</button>
                             
                        </div>
                        </div>
                    </div>
                </div>
            
        )
    })
    }

   

    renderSavedNews() {
        // iterate through the state
        return this.state.savedNews.map((news, i)=>{
            if ((news.date) && (news.image)){
                return (
                    <div className="well" key={news._id}>
                        <button type="button" 
                        className="close" 
                        onClick={()=>this.handleDeleteClick(news._id)}
                        >
                        <span>&times;</span>
                        </button>
                        <img src={"https://static01.nyt.com/" + news.image}></img>
                        <a target="_blank" href={news.url}><h5>
                        <span className="label label-default"></span>
                        {news.headline}
                        </h5></a>
                        <p id="snippet">{news.snippet}</p>
                        <small><strong><p id="byline">On {news.date.substring(0, 10)} {news.byline}</p></strong></small>
                        {/*<div className="text">
                        <small>
                        <strong>
                        <cite id="date" title="Source Title">{news.date.substring(0, 10)}</cite>
                        </strong>
                        </small>
                        </div>*/}
                        {this.renderSavedNotes(i)}
                        <div className="article-footer">
                        <p className="text-right">

                            <button 
                            className="btn btn-info btn-sm btn-block"
                            onClick={()=>this.handleAddNotes(news._id)}
                            >
                            <i className="fa fa-sticky-note" aria-hidden="true"></i> Add Notes
                            </button>
                        </p>
                        </div>
                    
                  </div>
                )
            }    
                    else if((!news.date) && (news.image)){
                        return (
                    <div className="well" key={news._id}>
                        <button type="button" 
                        className="close" 
                        onClick={()=>this.handleDeleteClick(news._id)}
                        >
                        <span>&times;</span>
                        </button>
                        <img src={"https://static01.nyt.com/" + news.image}></img>
                        <a target="_blank" href={news.url}><h5>
                        <span className="label label-default"></span>
                        {news.headline}
                        </h5></a>
                        <p id="snippet">{news.snippet}</p>
                        <small><strong><p id="byline">{news.byline}</p></strong></small>
                       
                        {this.renderSavedNotes(i)}
                        <div className="article-footer">
                        <p className="text-right">
                            <button 
                            className="btn btn-info btn-sm btn-block"
                            onClick={()=>this.handleAddNotes(news._id)}
                            >
                            <i className="fa fa-sticky-note" aria-hidden="true"></i> Add Notes
                            </button>
                        </p>
                        </div>
                    
                  </div>
                )
                    }
                    else if((news.date) && (!news.image)){ 

                        return (
                    <div className="well" key={news._id}>
                        <button type="button" 
                        className="close" 
                        onClick={()=>this.handleDeleteClick(news._id)}
                        >
                        <span>&times;</span>
                        </button>
                        <img src="/img/unavailable.png"></img>
                        <a target="_blank" href={news.url}><h5>
                        <span className="label label-default"></span>
                        {news.headline}
                        </h5></a>
                        <p id="snippet">{news.snippet}</p>
                        <small><strong><p id="byline">On {news.date.substring(0, 10)} {news.byline}</p></strong></small>
                        <div className="text">
                        
                        </div>
                        {this.renderSavedNotes(i)}
                        <div className="article-footer">
                        <p className="text-right">
                            <button 
                            className="btn btn-info btn-sm btn-block"
                            onClick={()=>this.handleAddNotes(news._id)}
                            >
                            <i className="fa fa-sticky-note" aria-hidden="true"></i> Add Notes
                            </button>
                        </p>
                        </div>
                    
                  </div>
                )


                    }
                    else {
                        return (
                    <div className="well" key={news._id}>
                        <button type="button" 
                        className="close" 
                        onClick={()=>this.handleDeleteClick(news._id)}
                        >
                        <span>&times;</span>
                        </button>
                        <img src="/img/unavailable.png"></img>
                        <a target="_blank" href={news.url}><h5>
                        <span className="label label-default"></span>
                        {news.headline}
                        </h5></a>
                        <p id="snippet">{news.snippet}</p>
                        <small><strong><p id="byline">{news.byline}</p></strong></small>
                        {this.renderSavedNotes(i)}
                        <div className="article-footer">
                        <p className="text-right">
                            <button 
                            className="btn btn-info btn-sm btn-block"
                            onClick={()=>this.handleAddNotes(news._id)}
                            >
                            <i className="fa fa-sticky-note" aria-hidden="true"></i> Add Notes
                            </button>
                        </p>
                        </div>
                    
                  </div>
                )
                    }
            })
    }
    render() {
        return(
                <div>
                    <div className="well-container">
                        <div className="panel panel-default saved-articles">
                                <div className="panel-heading text-center"></div>
                                <div className="panel-body">
                                    {/*We'll call render function here  */}
                                    {this.renderSavedNews()}
                                </div>
                        </div>
                    </div>
                    {this.renderNotesModal()}
                </div>
        )
    }
}

//export class 
export default SavedNews;