// Utilise an IIFE (immediately invoked function expression) to prevent global variable leaking
(function(global){

    /*
        Code Structure:

        - Variables
        - Functions
            - init
            - parse_data
            - evaluate_amount
            - convert_to_pennies
            - calculate sterling
            - render
        - Initialisation
     */

    var doc = document; 
    var form = doc.querySelector('.widget__form');
    var amount = doc.querySelector('.widget--amount');
    var error_container = doc.querySelector('.error');
    var results_container = doc.querySelector('.results');
    var results = doc.querySelector('.results__list');

    /*
        @description initialises the whole application
        @param e {Object} the browser's event object
        @return {undefined} no specified return value
     */
    function init (e) {
        var parsed, pennies, sterling;

        parsed = parse_data(amount.value);

        // If `false` is returned then display an error to the user
        if (!parsed) {
            // `classList` API to remove the class from the element
            error_container.classList.remove('hide');
        }

        // Otherwise continue through the application
        else {
            pennies = evaluate_amount(parsed);
            sterling = calculate_sterling(pennies);
            render(sterling); // display the results on the page
        }

        e.preventDefault(); // prevent the form from submitting data to the server
    }

    /*
        @description function which parses the user's data looking for numerical/decimal pattern
        @param amount {String} user input via text form field
        @return parsed|false {Array|Boolean} parsed user data, returns 3 item Array (index 2 is potential pound character & index 3 is match) OR false if the data fails to be parsed
     */
    function parse_data (amount) {
        // We'll check if the value entered is either empty space or just no value specified (if the length is zero then it coerces to a falsey value so we convert it to true using the ! operator)
        if (/^\s+$/.test(amount) || !amount.length) {
            return false;
        }

        /*
            The regex I've constructed removes leading and ending white space from around the users input
         */
        var strip_spaces = amount.replace(/^\s+|\s+$/g, '');

        /*
            The regex I've constructed replaces any commas , with a period .
         */
        var replace_commas = strip_spaces.replace(/,/g, '.');

        /*
            The next regex I've constructed parses the value like so:
                - match an optional £ character (we capture this character as with some amounts we'll need it to differentiate between pennies and pounds)
                - create a capturing group which will hold the numerical amount entered by the user (including decimal points)
                - inside the capturing group we match a single numerical character (we need at least one numerical)
                - we then create a non-capturing group which acts as an optional grouping mechanism (?:pattern)?
                - inside those parenthesis is the rest of our pattern: we define a character class of just a numerical character and a period

            This means we match all relevant data from the specified examples (matched content is indicated after equals sign)...

            4             = ["4", undefined, "4"]
            85            = ["85", undefined, "85"]
            197p          = ["197", undefined, "197"]
            2p            = ["2", undefined, "2"]
            1.87          = ["1.87", undefined, "1.87"]
            £1.23         = ["£1.23", "£", "1.23"]
            £2            = ["£2", "£", "2"]
            £10           = ["£10", "£", "10"]
            £1.87p        = ["£1.87", "£", "1.87"]
            £1p           = ["£1", "£", "1"]
            £1.p          = ["£1.", "£", "1."]
            001.41p       = ["001.41", undefined, "001.41"]
            4.235p        = ["4.235", undefined, "4.235"]
            £1.257422457p = ["£1.257422457", "£", "1.257422457"]
         */
        var parsed = /(£)?(\d(?:[\d.]+)?)/.exec(replace_commas);
        
        return parsed;
    }

    /*
        @description checks the amount provided and returns it as pennies
        @param amount {Array} parsed user data, returns 3 item Array (index 2 is potential pound character & index 3 is match)
        @return pennies {Number} the amount in pennies
     */
    function evaluate_amount (amount) {
        var pennies;
        
        // If there was no £ character specified then...
        if (!amount[1]) {
            
            // Check if there is a period in the value (if there is: convert amount to pennies)...
            if (amount[2].indexOf('.') !== -1) {
                pennies = convert_to_pennies(amount[2]);
            } 

            // Otherwise the value already appears to be specified as pennies
            else {
                pennies = amount[2];
            }

        }

        // If there is a £ character then we know to convert to pennies
        else {
            pennies = convert_to_pennies(amount[2]);
        }

        return pennies;
    }

    /*
        @description converts the amount to pennies
        @param amount {String} user specified amount
        @return pennies {Number} the amount in pennies
     */
    function convert_to_pennies (amount) {
        var pennies = Math.round(parseFloat(amount) * 100);

        return pennies;
    }

    /*
        @description calculates the more efficient number of coins required to make up the specified amount
        @param amount {Number} user specified amount converted to pennies
        @return results {Object} the final result of the calculation (lists coins required to make up the amount)
     */
    function calculate_sterling (amount) {
        var sterling = [200, 100, 50, 20, 2, 1];
        var amounts = [0, 0, 0, 0, 0, 0];
        var whats_left = amount;
        var results = {};
        var remainder, how_many;

        // Calculate how many coins are needed
        sterling.forEach(function (item, index, array) {
            if (item <= whats_left) {
                // What's the remainder when dividing what's left of the total amount by the current coin
                remainder = whats_left % item;

                // Calculate how many times the current coin goes into what's currently remaining from the amount
                how_many = Math.floor(whats_left/item);

                // Update the `whats_left` value so the loop can move forward
                whats_left = remainder;

                // Store how many of each sterling coin were used
                amounts[index] = how_many;
            }
        });

        // Create an Object that will hold the results of our calculations
        amounts.forEach(function (item, index, array) {
            // To be used as object property key
            var title;

            // If there was a coin used then store it for the function's return value
            if (!!item) {
                switch (index) {
                    case 0:
                        title = '£2';
                        break;
                    case 1:
                        title = '£1';
                        break;
                    case 2:
                        title = '50p';
                        break;
                    case 3:
                        title = '20p';
                        break;
                    case 4:
                        title = '2p';
                        break;
                    case 5:
                        title = '1p';
                        break;
                }

                results[title] = item;
            }
        });

        return results;
    }

    /*
        @description constructs a DOM tree from data object provided and inserts it into the page
        @param coins {Object} results of calculation determining the amount of coins required to make up user specified amount
        @return {undefined} no specified return value
     */
    function render (coins) {
        var list = '';
        
        for (prop in coins) {
            if (coins.hasOwnProperty(prop)) {
                list += '<li>' +  prop + ' x' + coins[prop] + '</li>';
            }
        }

        results.innerHTML = list;

        // `classList` API to remove the class from the element
        results_container.classList.remove('hide');

        // `classList` API to add the class from the element
        error_container.classList.add('hide');
    }

    // Hijack our form's submission and process results client-side
    form.addEventListener('submit', init, false);

}(this));