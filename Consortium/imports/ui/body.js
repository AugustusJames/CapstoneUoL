import { Template } from 'meteor/templating';
import './body.html';
import './message.js';
import { Messages } from '../api/messages.js';


Template.body.helpers({
  messages() {
    return Messages.find();
  },
});

Template.body.events({
  'submit .new-message'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a message into the collection
    Messages.insert({
      text,
      // current time
      createdAt: new Date(), 
      //user information
      owner: Meteor.userId(), 
      username:Meteor.user().username,
    });

    // Clear form
    target.text.value = '';
    
    // scroll to last message ( scroll-to-bottom / css-chat-window1)
    //$('.js-panel-body').scrollTop($('.js-messages').height());
    var element = document.getElementById("js-messages");
    element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});

 },
});