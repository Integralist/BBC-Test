// Utilise an IIFE (immediately invoked function expression) to prevent global variable leaking
(function(global){

    /*
        Code Structure:

        - Variables
        - Functions
            - init
            - evaluate_amount
            - convert_to_pennies
            - parse_data
            - calculate sterling
        - Initialisation
     */

    var doc = document; 
    var form = doc.getElementById('js-widget');
    var amount = doc.getElementById('js-widget__amount');

    /*
        @description initialises the whole application
        @param e {Object} the browser's event object
        @return {undefined} no specified return value
     */
    function init (e) {
        var parsed = parse_data(amount.value);
        var pennies = evaluate_amount(parsed);
        var sterling = calculate_sterling(pennies);

        console.log(sterling);

        e.preventDefault(); // prevent the form from submitting data to the server
    }

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

    function convert_to_pennies (amount) {
        var pennies = Math.round(parseFloat(amount) * 100);

        return pennies;
    }

    /*
        @description function which parses the user's data looking for numerical/decimal pattern
        @param amount {String} user input via text form field
        @return parsed {Array} parsed user data, returns 3 item Array (index 2 is potential pound character & index 3 is match)
     */
    function parse_data (amount) {
        /*
            The regex I've constructed removes leading and ending white space from around the users input
         */
        var strip_spaces = amount.replace(/^\s+|\s+$/g, '');

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
        var parsed = /(£)?(\d(?:[\d.]+)?)/.exec(strip_spaces);
        
        return parsed;
    }

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

        //Create an object that will hold the results of our calculations
        amounts.forEach(function (item, index, array) {
            // To be used as object property key
            var title;

            // If there was a coin used then store it for the function's return value
            if (!!item) {
                switch (index) {
                    case 0:
                        title = 'two pounds';
                        break;
                    case 1:
                        title = 'one pound';
                        break;
                    case 2:
                        title = 'fifty pence';
                        break;
                    case 3:
                        title = 'twenty pence';
                        break;
                    case 4:
                        title = 'two pence';
                        break;
                    case 5:
                        title = 'one pence';
                        break;
                }

                results[title] = item;
            }
        });

        return results;
    }

    form.addEventListener('submit', init, false);

}(this));