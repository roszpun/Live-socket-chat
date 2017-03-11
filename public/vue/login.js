//
// =============================================================================
// Login vue file
// =============================================================================
//

// ================================================
// Init of root vue instance
// ================================================

var login_form = new Vue({
    el: '#login', // root element

    // ================================================
    // Properties used later in code
    // ================================================

    props: {
        user_login: {default: ''}, // user login
        display_errors: {default: false}, // displaying errors or not
        error_message: {default: ''} // current error message
    },

    // =============================================================
    // Mounted function triggers asap vue is init
    // Checking if user already is saved in local storage
    // If so he will be redirected to chat else he will see login
    // =============================================================

    mounted: function () {
        this.redirect_to_chat();
    },

    // ================================================
    // Computed properties are changing
    // ================================================

    computed: {
        has_errors: {

            // similar to get set validation in C# MVC

            get: function () {
                if (this.user_login == '') {
                    this.error_message = 'Please insert your name';
                }
                return this.error_message; // returns error if exist
            },
            set: function (newValue) {
                this.error_message = newValue;
            }
        }
    },

    // ================================================
    // Methods used in login
    // ================================================

    methods: {
        save_name: function () {
            axios.post('/users/save', {
                // params
                name: login_form.user_login // login
            }).then(function (response) {
                    if (response.data == "Username taken") { // if user is taken
                        login_form.has_errors = response.data; // display erros
                        login_form.display_errors = true;
                    } else if (response.data.info == "User saved") {// if user saved
                        sessionStorage.setItem('mandatory_chat_user_id', response.data.id);//set session storage
                        sessionStorage.setItem('mandatory_chat_user', login_form.user_login); // set session storage
                        login_form.redirect_to_chat(); // redirect to chat
                    }
                })
        },

        // Login method. If user is not logged he will be added to local storage
        login: function () {
            //checking if user has username
            if (this.user_login != '') {
                login_form.save_name();
            } else {
                // if not display error
                this.display_errors = true;
            }
        },
        // Redirect method checks if user is logged nad redirects if its necessery to chat
        redirect_to_chat: function () {
            if (sessionStorage.getItem("mandatory_chat_user") && sessionStorage.getItem("mandatory_chat_user_id")) {
                document.location.href = "/chat";
            }
        }
    }
});