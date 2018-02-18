$ = jQuery = require('jquery');
var React = require('react');
var Home = require('./components/homePage');
var Authors = require('./components/authors/authorPage');
var About = require('./components/about/aboutPage');
var Header = require('./components/common/header');

(function(win){ //this is the iffy, passing in window to win

    "use strict"; //tells browser to evaluate everything we're doing in 'strict mode'

    var App = React.createClass({
        render: function() {
            var Child;

            switch(this.props.route){
                case 'about': 
                    Child = About; 
                    break;
                case 'authors':
                    Child = Authors;
                    break;
                default:
                    Child = Home;
                    break;
            }

            return (
                <div>
                    <Header />
                    <Child />
                </div>
            );
        }

    });

    function render() {
        //get route
        var route = win.location.hash.substr(1); //now using 'win' instead of 'window' now that we're inside the iffy.
        //Render it
        React.render(<App route={route} />, document.getElementById('app'));
    }

    //create event listener and call render
    win.addEventListener('hashchange', render);
    render();

})(window);