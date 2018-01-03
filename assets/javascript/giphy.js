$(document).ready(function() {

  var cartoons = [
  "garfield", "george of the jungle", "mickey mouse", "pocahontas", "popeye", "rugrats", "scooby doo", "snow white", 
  "spongebob squarepants", "teen titans", "teenage mutant ninja turtles", "the flintstones", "the incredibles", 
  "the jetsons", "the lion king", "the little mermaid", "the powerpuff girls"
  ];

  // function to make btns and add to page
  function loadBtns(crtnArray) {
    /* clear the caroon area */
    $("#cartoon-btns").empty();
    /* generate and load the cartoon buttons with the cartoon array elements (class, data-type, text) and 
    append to the cartoon button area ID located on the DOM */
    for (var i = 0; i < crtnArray.length; i++) {
      var a = $("<button>").addClass("cartoon-button").attr("data-type", crtnArray[i]).text(crtnArray[i]);
      $("#cartoon-btns").append(a);
    }
  }


/* on click of one of the cartoon buttons, clear the DOM, and then do a search via ajax to find 6 varieties of images 
pertaining to the button data-type (of the button that was clicked on), and then generate a new DIV and variable to use 
to hold the Rating, still image url and animation image url. Use the still image url as the default to show first.
Append the default image and rating together in the DIV and the display that to the DOM */

  $(document).on("click", ".cartoon-button", function() {
    /* After selecting a button, clear the cartoon gif area on the DOM and 
    remove the active class associated with the button */
    $("#cartoon-gif-area").empty();
    $(".cartoon-button").removeClass("active");

    /* add the class of active the button selected on the Dom and get the data type 
    of the button or the string to use to lookup or search for the GIF and then setup the query */
    $(this).addClass("active");

    /* Sitch the protocol in the query URL from http to https, as the app may not work properly 
    when deployed to Github Pages.*/
    
    var type = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    /* the quiry URL will return 10 items as per the limit=10 in the above command */

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(ajaxResponse) {

      /* once the 10 individual ajaxResponse objects are returned, parse the objects for the 
      rating, animt url and still url */

      var ajaxResult = ajaxResponse.data;

      for (var i = 0; i < ajaxResult.length; i++) {

        /* define a div to store the ajaxResult in and ultimately send to the DOM */
        var cartoonDiv = $("<div class=\"cartoon-item\">");

        /* create a paragraph to display the text containing the rating information */
        var p = $("<p>").text("Rating: " + ajaxResult[i].rating);

        /* create variables animtation url and still url to hold the object urls for each */
        var animt = ajaxResult[i].images.fixed_height.url;
        var still = ajaxResult[i].images.fixed_height_still.url;

        /* default the image to the still image, set the attributes up for data-still (still image url), 
        data-animage (animate image url), data-state (default to still image), and add the class cartoon-image */

        var cartoonImg = $("<img>").attr("src", still).attr("data-still", still).attr("data-animate", animt).attr("data-state", "still").addClass("cartoon-image");

        cartoonDiv.append(p).append(cartoonImg);
        /* disaply the appended rating and cartoom image on the DOM */
        $("#cartoon-gif-area").append(cartoonDiv);
      }
    });
  });


 /* on click of the cartoon image, verify the state, and then toggle 
 that particular image state and url between still and animation */

  $(document).on("click", ".cartoon-image", function() {

    var state = $(this).attr("data-state"); 

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate")); /* animation url */
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still")); /* still url */
      $(this).attr("data-state", "still");
    }
  });

  /* when the user wants to add a new cartoon event button then they must
  enter the new cartoon name in the input box and then click submit to have 
  a new cartoon button added to the cartoon array displayed on top of the DOM 
  by running the function loadBtns to re-display all buttons, including the new 
  button just added */

  $("#add-cartoon").on("click", function(event) {

    /* The event.preventDefault() method stops the default action of an element from happening. 
    For example: Prevent a submit button from submitting a form; 
    Prevent a link from following the URL*/

    event.preventDefault();

    /* create and load a new temporary cartoon array to store the new input button
    entry value [.val(newvalue)], in array index 0 [.eq(index)] */

    var newcartoon = $("input").eq(0).val();

    if (newcartoon.length > 2) {
      cartoons.push(newcartoon);
    }

    /* run the function loadBtns to re-display all buttons */

    loadBtns(cartoons);

  });

  loadBtns(cartoons);
});