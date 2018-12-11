//2a8533846cf0494791042990951595f4
//https://api.nytimes.com/svc/search/v2/articlesearch.json

//variables
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var apiKey = "996b60bed4214eb780dbaf19dbfadef9";
var q = "";
var num = "";
var bDate = "";
var eDate = "";

//search 
function pullInfo() {
    $("#articles").empty();
    q = $("#query").val();
    num = $("#number").val();
    bDate = $("#begin").val();
    eDate = $("#end").val();

    url += '?' + $.param({
        'api-key': apiKey,
        'q': q,
        'begin_date': bDate + "0101",
        'end_date': eDate + "0101"
    });
    //ajax call
    $.ajax({
        url: url,
        method: 'GET',
    }).then(function (result) {
        console.log(result);
        console.log(result.response.docs[0].headline.main)
        for (var i = 0; i < num; i++) {
            var newArticle = $("<div>");
            newArticle.attr("data-artTitle", result.response.docs[i].headline.main);
            newArticle.attr("data-artByline", result.response.docs[i].byline.original);
            newArticle.attr("data-link", result.response.docs[i].web_url)
            var title = "<a href = '" + newArticle.attr("data-link") + "'>" + newArticle.attr("data-artTitle") + "</a>";
            var by = "<p>" + newArticle.attr("data-artByline") + "</p>";
            $(newArticle).append(title);
            $(newArticle).append(by);
            $("#articles").append(newArticle);
    
        };
    }).fail(function (err) {
        throw err;
    });

  
    
}

$(document).on("click", "#search", pullInfo);

function clearFields() {
    $("#query").val("")
    $("#begin").val("")
    $("#end").val("")
}

$(document).on("click", "#clear", clearFields);

//comment for example