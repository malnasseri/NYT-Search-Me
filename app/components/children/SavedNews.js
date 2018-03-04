// import React from "react";
import React, { Component } from 'react';

// Helper for making AJAX requests to our API
import helpers from "../utils/helpers";

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
            console.log("Run get saved News");
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
            console.log(`Deleted News and its notes`)
            this.getSavedNews()}
        );
    }

    handleDeleteNote(id) {
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
        event.preventDefault();
        //send id to helper and delete from database then re-render
        helpers.deleteNotes(id).then((data)=>{
            console.log(`Deleteted Note `)
            this.getSavedNews()}
        );
    }


    handleAddNotes(id) {
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

    renderNotesModal(){
        return(
                <div className="modal">
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
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" 
                            className="btn btn-default" 
                            data-dismiss="modal"
                            onClick={()=>this.setState({newsID: ""})}
                            >Close</button>
                            <button type="button" 
                            className="btn btn-primary"
                            onClick={this.handleSaveNote}
                            >Save</button>
                        </div>
                        </div>
                    </div>
                </div>
        )
    }

    renderSavedNotes(i){
        return this.state.savedNews[i].note.map((note, index)=>{
            return(
                <div className=""key={note._id}>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <button type="button" 
                                className="close" 
                                data-toggle="tooltip" 
                                data-placement="top" 
                                title="Remove from save"
                                onClick={()=>this.handleDeleteNote(note._id)}
                                >
                                <span>&times;</span>
                            </button>
                            <p><span className="label label-success">Note :</span>
                                {note.note}
                            </p>
                        </li>
                    </ul>
                </div>
            )
        })
    }

    renderSavedNews() {
        // iterate through the state
        return this.state.savedNews.map((news, i)=>{
                return (
                    <div className="well well-lg" key={news._id}>
                        <button type="button" 
                        className="close" 
                        data-toggle="tooltip" 
                        data-placement="top" 
                        title="Remove from save"
                        onClick={()=>this.handleDeleteClick(news._id)}
                        >
                            <span>&times;</span>
                        </button>
                        <h5>
                            <span className="label label-default">{i+1}</span>
                            {news.headline}
                        </h5>
                        <p>{news.snippet}</p>
                        <div className="text-right">
                            <small>
                                <a href={news.url}>Link </a><cite title="Source Title">{news.date}</cite>
                            </small>
                        </div>
                        {this.renderSavedNotes(i)}
                        <p className="text-right">
                            <button 
                            className="btn btn-info btn-sm"
                            onClick={()=>this.handleAddNotes(news._id)}
                            >
                            <i className="fa fa-sticky-note" aria-hidden="true"></i> Add Notes
                            </button>
                        </p>
                    </div>
                )
            })
    }
    render() {
        return(
                <div>
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-default">
                                <div className="panel-heading text-center"><h5>Saved News</h5></div>
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