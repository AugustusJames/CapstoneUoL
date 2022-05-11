import { Template } from 'meteor/templating';
import { Messages } from "/imports/api/messages";
import { Accounts } from "meteor/accounts-base";
import './main.html';

Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL",
});


Template.chat.helpers({
  messages() {
    return Messages.find();
  },
  getUserName(userId) {
    if (userId) {
      const user = Meteor.users.findOne(userId);
      if (user) return user.username;
    }
  },
  formatDate(date) {
    return date.toLocaleString();
  }
});

Template.chat.events({
  'submit #chat-form'(event, instance) {
    event.preventDefault();
    const text = event.target.text.value;
    Meteor.call('messages.insert', text, (err) => {
      if(err) {
        alert(err.message);
      } else {
        // reset the form
        event.target.reset();
      }
    });
  }
});
