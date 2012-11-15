#BBC Test

##Notes

* No 'context' given so I've gone with performance and efficiency as priority.  
  The context would have helped clarify if a specific structure was required.  
  My normal project set-up is to use AMD when writing JavaScript (using either Curl.js or RequireJS). 
  
* The requirements specified the application should work in Google Chrome. No other browsers specified so I've assumed more modern Object/Array methods (i.e. from ES5 specification) can be utilised.
  
* Best practice for a JavaScript application of reasonable complexity is dependant on your point of view. Some feel an MVC structure would be essential and in the past I have used the MVC framework Backbone.js in a few larger projects, but in this instance it felt like it was far too much to load for an application as small as this. Especially if this was to be loaded onto a mobile device the less JavaScript going over the wire the better. The use of most MVC frameworks are dependent on a 3rd party DOM library (most popular being jQuery). If we were to use Backbone.js as the MVC framework we would need to load both jQuery (or jQuery compatible library such as Zepto/Ender) and also added either LoDash (preferred) or Underscore utility libraries. 

* As per my previous point: I've gone for a more functional approach to the structure this time but would be happy to revise using MVC if specifically required or if the project was to grow larger in scope. I try to write my functions so they are as *pure* as possible (e.g. they only do one thing with as little side effects as possible)

* My code is usually heavily commented (which depending on who you talk to is either a good thing or a bad thing). My point of view is that code comments will be stripped out by a build script so there is no harm in being overly specific with comments.

* I've provided both a minified and non-minified version of my script. The non-minified version was linted and unit-tested before minification. 


