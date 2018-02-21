"use strict";

var React = require('react');

var Input = require('.././common/textInput');

var AuthorForm = React.createClass({
    propTypes: {
		author:	React.PropTypes.object.isRequired,
		onSave:	React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
    },
    
    render: function(){
        return (
            <form>
                <h1>Manage Author</h1>
                
                <div className="form-group">

                <div className="row">
                    <div className="col-sm-10">
                        <Input
                            name="firstName"
                            label="First Name"
                            onChange={this.props.onChange}
                            value ={this.props.author.firstName} 
                            error={this.props.errors.firstName} />
                            <br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-10">
                            <Input
                                name="lastName"
                                label="Last Name"
                                onChange={this.props.onChange}
                                value ={this.props.author.lastName} 
                                error={this.props.errors.lastName} />
                                <br />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-10">
                        <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = AuthorForm;