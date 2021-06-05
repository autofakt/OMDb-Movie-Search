$("#errorCall").hide();
var apiKey = "USE YOUR OWN";

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

  if (result.Poster.length > 6) { //adds a stock poster img for results that dont have an image
    image.attr("src", result.Poster);
  } else {
    image.attr("src", "imdblogo_300x448.jpg");
  }

  card.append(image);

  var list = $("<ul class='list-group list-group-flush'></ul>");

  var title = result.Title;
  var listItem1 = $("<li id='movieTitle' class='list-group-item'>" + title + "</li>");

  var type = result.Type;
  var listItem2 = $("<li class='list-group-item'>" + type + "</li>");

  var year = result.Year;
  var listItem3 = $("<li class='list-group-item'>" + year + "</li>");

  list.append(listItem1);
  list.append(listItem2);
  list.append(listItem3);

  card.append(list);

  var linkBody = $("<div class='card-body'></div>");

  var cardID = result.imdbID;
  var link = $("<a href='#' class='card-link' target='_blank'>View on IMDb</a>");
  //alert(link);
  var finalLink = "https://www.imdb.com/title/" + cardID + "/";
  //console.log(finalLink);
  link.attr("href", finalLink);
  linkBody.append(link);
  card.append(linkBody);

  $("#results").append(card);
}

function makeCall(link){
  $("#results").empty(); // This will remove everything in the div
  console.log("original call: " +link);
  $.getJSON(link, function(result) {
    var originalLink = link;
    if (result.Response == "True") {
      //console.log(result.totalResults);
      $('#errorCall').css('display', 'none');
      for (each of result.Search) {

        loadCardData(each);
      }

    } else {
      //  console.log("False");
      $('#errorCall').css('display', 'block');


    }

makePagination(result, originalLink);

  });
}

function makeCall2(link,page){
  $("#results").empty(); // This will remove everything in the div
  var newLinkWithPage = link + "&page=" + page;
  console.log("Second call: " +newLinkWithPage);
  $.getJSON(newLinkWithPage, function(result) {

    if (result.Response == "True") {
      //console.log(result.totalResults);
      $('#errorCall').css('display', 'none');
      for (each of result.Search) {

        loadCardData(each);
      }

    } else {
      //  console.log("False");
      $('#errorCall').css('display', 'block');


    }



  });
}

function makePagination(result, originalLink){
  var totalSearchCount = result.totalResults;
  var pageCount = Math.ceil(totalSearchCount/10);
  var nav = $("<nav aria-label='...'></nav>");
  var ul = $("<ul class='pagination pagination-sm pagination flex-wrap'></ul>");

  for(var i = 1; i <=pageCount;i++){
    //var newLink = originalLink + "&page=" + i;
    var pageItem = $("<li class='page-item'></li>");
    var pageItem2 = $("<a class='page-link' href='#'>" +i+"</a>");
    pageItem2.click(function(){
      //lert(this.innerText);
      var linkPage = this.innerText;
      makeCall2(originalLink, linkPage);
    })
    pageItem.append(pageItem2);
    ul.append(pageItem);
  }
  nav.append(ul);
  $("#pages").append(nav);
}

$("#searchBtn").on("click", function() {
  var searchTerm = "&s=" + $("#searchTerm").val();
  var searchType = getSearchType();
$("#pages").empty();
var link = "https://www.omdbapi.com/?" + apiKey + searchType + searchTerm;


makeCall(link);


});
