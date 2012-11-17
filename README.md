#BBC Test

##Notes

* After receiving feedback from BBC contact: the focus should be code organisation, readability and unit tests + "simplicity is a feature"

* Because this application is very small I stripped back on a lot of boilerplate code and structure to abide by the focus of 'keeping things simple'. The code is based on more 'pure' functions (i.e. functions that have a single responsibility with limited side effects).


* My normal project set-up is to use AMD when writing JavaScript (using either Curl.js or RequireJS). But this would have been overkill for an application of this small size.

* I also utilise the Sass pre-processor in larger projects, but again, due to the small size of this application it really wasn't necessary.

* For JavaScript interaction I normally specify id attributes with a prefix of "js-" so it is clear to other developers that this attribute is only being accessed by JavaScript and not CSS. In this instance the HTML would have become too cluttered so I stuck with using the `querySelector` method to target the relevant elements. For scalability I would always recommend using the 'js-' prefix on an id attribute because any change to the CSS would cause the script to break otherwise. But on an application this small the case for readability won over me so I didn't use them this time.

* I use the BEM (Block, Element, Modifier) methodology for handling application structure with CSS.

* For most larger projects I would incorporate the use of 'normalise.css' to help clear up some browser inconsistencies with base styles but because of the small size of this application I've not used any because they just weren't needed.

* I'm not a designer, but hopefully what I've done is clean and simple/focused.

* When rendering complex HTML structure via JavaScript I would normally utilise a templating library like Hogan.js to compile the data. But because of the small scale size of this application - as well as for performance reasons and simplicity - I left out the overhead caused by the use of a templating library.

* The requirements specified the application will only be tested in Google Chrome so the use of modern API's is allowed. I've used from ES5 the `forEach` iterator and from the HTML5 spec the `classList` property.
  
* Best practice for a JavaScript application of reasonable complexity is dependant on your point of view. Some feel an MVC structure would be essential and in the past I have used the MVC framework Backbone.js in a few larger projects, but in this instance it felt like it was far too much overhead to load something like Backbone for an application as small as this. Especially if this was to be loaded onto a mobile device the less JavaScript going over the wire the better. The use of most MVC frameworks are dependent on a 3rd party DOM library (most popular being jQuery). If we were to use Backbone.js as the MVC framework we would need to load both jQuery (or jQuery compatible library such as Zepto/Ender) and also added either LoDash (preferred) or Underscore utility libraries. 

* As per my previous point: I've gone for a more functional approach to the structure this time but would be happy to revise using MVC if specifically required or if the project was expected to grow larger in scope.

* My code is usually heavily commented (which depending on who you talk to is either a good thing or a bad thing). My point of view is that code comments will be stripped out by a build script so there is no harm in being overly specific with comments.

* I will include both a minified and non-minified version of my script. The non-minified version will be linted and unit-tested before minification.

* For the Unit Testing I used the Jasmine BDD library (find the files inside: Assets/Scripts/jasmine/). I'm don't do unit testing as much as I should so I'm a bit inexperienced on this side of things. I wasn't able to test two of my functions because they had no explicit `return` value so they were omitted from the test. In an ideal world I would be doing full TDD to design my API's before writing any actual code, but for this project I opted for Unit Testing over TDD to help speed up the process. You'll see I've had to write a couple of my own 'matchers' for the library to test for Array, Number and NaN types.
