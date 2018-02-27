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
        this.emit(CHANGE_EVENT);
    },

    getAllAuthors: function() {
        return _authors;
    },

    getAuthorById: function(id) {
        return _.find(_authors, {id: id});
    }
});

//the embedded function will get called anytime ANY action is dispatched
Dispatcher.register(function(action){

        switch(action.actionType){
            case ActionTypes.CREATE_AUTHOR: 
                _authors.push(action.author);
                AuthorStore.emitChange(); //notifies all the views that the AuthoStore has been updated
        }
});

module.exports = AuthorStore;
