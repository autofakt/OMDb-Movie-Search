var apiKey = "apikey=ADDYOUROWNHERE";

function getSearchType() {
  var searchType = $("#searchType").val();
  switch (searchType) {
    case "All":
      searchType = "";
      break;
    case "Movie":
      searchType = "&type=movie";
      break;
    case "Series":
      searchType = "&type=series";
      break;
    case "Episode":
      searchType = "&type=episode";
      break;
    default:
  }
  return searchType;
}

function loadCardData(result) {
  var card = $("<div class='card' style='width: 20rem;'></div>");
  var image = $("<img class='card-img-top' src='...' alt='Card image cap'>");

  image.attr("src", result.Poster)
  card.append(image)

  var list = $("<ul class='list-group list-group-flush'></ul>");

  var title = result.Title;
  var listItem1 = $("<li id='movieTitle' class='list-group-item'>" + title + "</li>")

  var type = result.Type;
  var listItem2 = $("<li class='list-group-item'>" + type + "</li>")

  var year = result.Year;
  var listItem3 = $("<li class='list-group-item'>" + year + "</li>")

  list.append(listItem1);
  list.append(listItem2);
  list.append(listItem3);

  card.append(list);

  var linkBody = $("<div class='card-body'></div>");

  var cardID = result.imdbID;
  var link = $("<a href='#' class='card-link'>View on IMDb</a>");
  //alert(link);
  var finalLink = "https://www.imdb.com/title/" + cardID + "/";
  console.log(finalLink);
  link.attr("href", finalLink);
  linkBody.append(link);
  card.append(linkBody);

  $("#results").append(card);
}

$("#searchBtn").on("click", function() {
  var searchTerm = "&s=" + $("#searchTerm").val();
  var searchType = getSearchType();

  $("#results").empty(); // This will remove everything in the div

  $.getJSON("https://www.omdbapi.com/?" + apiKey + searchType + searchTerm, function(result) {
    if (result.Response == "True") {
      console.log("True");
      for (result of result.Search) {

        loadCardData(result);
      }
    } else {
      console.log("False");
      alert('Something went wrong');
    }



  });



});
