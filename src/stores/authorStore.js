"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _authors = [];

var AuthorStore = assign({}, EventEmitter.prototype, {
    
    //define the store which 'extends' EventEmitter.prototype
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    }, 

    removeChangeListener: function(callback) {
        this.removeChangeListener(CHANGE_EVENT, callback);
    }, 

    emitChange: function() {
        this.emit(CHANGE_EVENT); //notifies all the views that the AuthoStore has been updated
    },

    getAllAuthors: function() {
        return _authors;
    },

    getAuthorById: function(id) {
        return _.find(_authors, {id: id});
    }
});

//the embedded function will get called anytime ANY action is dispatched
//.register listens for all dispatch calls to the store
Dispatcher.register(function(action){

        switch(action.actionType) {
            case ActionTypes.INITIALIZE: 
                _authors = action.initialData.authors;
                AuthorStore.emitChange(); 
                break;
            case ActionTypes.CREATE_AUTHOR: 
                _authors.push(action.author);
                AuthorStore.emitChange(); 
                break;
            case ActionTypes.UPDATE_AUTHOR: 
                var existingAuthor = _.find(_authors, {id: action.author.id});
                var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
                _authors.splice(existingAuthorIndex, 1, action.author); //replace that element in array with action.author (updatedAuthor)
                AuthorStore.emitChange(); 
                break;
            case ActionTypes.DELETE_AUTHOR: 
                debugger;
                _.remove(_authors, function(author) {
                    return action.id === author.id;
                });    
            
                AuthorStore.emitChange(); 
                break;
            default:
                // no op
        }
});

module.exports = AuthorStore;
