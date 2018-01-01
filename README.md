# Giphy-API
Giphy API Assignment.

Use the GIPHY API to make a dynamic web page that populates with gifs. 
Call the GIPHY API and use JavaScript and jQuery to change the HTML of your site.

GIPHY requires developers to use a key to access their API data. For now, you can use their public API key.
Make sure you switch the protocol in the query URL from http to https, or the app may not work properly when deployed to Github Pages.

Create an array of strings, each one related to a topic that interests you and save it to a variable called topics. 

The app should take the topics in this array and create buttons in the HTML.
Try using a loop that appends a button for each string in the array.
When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page. 
When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
Under every gif, display its rating (PG, G, so on). 
This data is provided by the GIPHY API.
Only once you get images displaying with button presses should you move on to the next step.
Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.
Deploy your assignment to Github Page.
