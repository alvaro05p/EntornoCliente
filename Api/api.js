

fetch("https://rae-api.com/api/words/bici")

.then(function(response) {
    return response.json(); // Convert the response to JSON
  })

.then(function(palabra){
    console.log(palabra.ok);
})

.catch(function(error) {
    console.error("Error:", error); // Handle errors
});