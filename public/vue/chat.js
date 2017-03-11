//
// =============================================================================
// Main chat vue file
// =============================================================================
//

var chat = new Vue({
    el: '#chat', // root
    // data used
    data: {
        new_chat_room_title: '', // new chat room title in case of creation one
        new_chat_room_description: '', // its description
        current_room_messages: {}, // current room messages object stores all data from messages request
        current_room_data: '', // current room information
        new_message: '' // new message data
    },
    // while created
    mounted: function () {
        // refresh room each 5 seconds getting new data for chat room
        window.setInterval(function(){
           if(chat.current_room_index != ''){ // if chat is selected
               chat.get_data(chat.current_room_index); // update data
           }
        }, 5000); // each 5000ms


        // Managing getting to room with link.
        if (window.location.hash.substr(1)) { // if hash with id exists
            this.change_room(window.location.hash.substr(1)); // change room to its id
        }
        // validation. if user is not created redirects to login page
        if (!sessionStorage.getItem("mandatory_chat_user") || !sessionStorage.getItem("mandatory_chat_user_id")) {
            document.location.href = "/";
        }
    },
    // properties
    props: {
        current_room_index: {default: 0}, // currently opened chat room id
        new_room_modal: {default: false}, // displays new room modal if true it will be displayed
        display_errors: {default: false}, // displaying errors from validation
        error_message: {default: ''}, // storing the error message
        user_name: {default: sessionStorage.getItem("mandatory_chat_user")}, // assigning user from ls to prop
        user_id: {default: sessionStorage.getItem("mandatory_chat_user_id")} // same thing with id
    },
    computed: {
        has_errors: function () {
            if (this.new_chat_room_title == '') { // if new room title is empty, assign new error message
                this.error_message = 'Please insert name of the chat room';
            } else if (this.new_message == '' && this.new_room_modal == false) { // Assigning new error message only when new room modal is closed, this would override modals error
                this.error_message = 'Sorry but you cant send empty message';
            } else { // else no error
                this.error_message = '';
            }
            return this.error_message; // return error messages
        }
    },
    // methods
    methods: {
        // getting the data method using axios library

        get_data: function () {
            axios.get('/rooms/' + this.current_room_index, { // hit the /rooms/:id url to get room data
            }).then(function (response) { // on success
                chat.current_room_data = response.data.room[0]; // assign response data to data property
                chat.current_room_messages = response.data.messages; // assign messages to current room messages object
            }).catch(function (error) {// if error console the error
                console.log(error);
            });
        },
        // close modal method
        close_modal: function (modal) {
            this[modal] = false; // closing passed modal modal
            this.display_errors = false; // hiding errors
            this.error_message = ''; // clearing errors messages
            this.new_chat_room_title = ''; // clearing title input inside modal
            this.new_chat_room_description = ''; // clearing textarea

        },
        // create room
        create_room: function () {
            if (this.new_chat_room_title == '') { // if user try to create room without name
                this.display_errors = true; // throw error
                return; // end
            }else{
                // hide if there was an error and it's not there anymore
                this.display_errors = false;
            }
            // making the post request to create room
            axios.post('/rooms', {
                // passign parameters
                name: this.new_chat_room_title, // room's name
                description: this.new_chat_room_description, // rooms's description
                author: this.user_name // author
            })
                .then(function (response) { // on response
                    if (response.data == "Room saved") { // if success
                        document.location.href = "/chat"; // refresh our chat to see new room
                    }
                })
                .catch(function (error) { // on error log it to console
                    console.log(error);
                });

        },
        // change room method
        change_room: function (id) {
            this.current_room_index = id; // changing room id saved in property
            window.location.hash = this.current_room_index; //insert hash to url
            this.get_data(); // update room data
        },

        // send message
        send_message: function () {
            if (this.new_message == '') { // if its empty display error and return
                this.display_errors = true;
                return
            }
            this.display_errors = false;
            // if no errors, make a  post request to messages 'controller'
            axios.post('/messages', {
                // params
                body: this.new_message, // message text
                author: this.user_name, // message author
                room_id: this.current_room_index // message assigned to room
            })
                .then(function (response) {
                    // on success
                    chat.new_message = ''; // clear the input field
                    if (response.data == "Message saved") {
                        // update data on success
                        document.location.href = "/chat#" + chat.current_room_index;
                        chat.get_data();
                    }
                })
                .catch(function (error) {
                    // log error
                    console.log(error);
                });
        }

    }
});