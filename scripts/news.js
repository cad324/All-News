const API_KEY = "089dad27958d4d83bfaa6eacf4ce4b48";
const uri_path = 'https://newsapi.org/v2/everything?q=';
var query_variable= '&apiKey=';
var url = uri_path+query_variable+API_KEY;
var data;

/* Obtained from almende/vis repository */
function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
      }
      else {
        error(xhr);
      }
    }
  };
  xhr.open('GET', path, true);
  xhr.send();
}

function gotData(data) {
  console.log(data);
  this.data = data;
  displayHeadlines();
}

function changeQuery() {
  while (document.getElementById("headlines").firstChild) {
    document.getElementById("headlines")
    .removeChild(document.getElementById("headlines").firstChild);
  }
  query_variable = document.getElementById("query").value +'&apiKey=';
  url = uri_path+query_variable+API_KEY;
  loadJSON(url, gotData);
}

function displayHeadlines() {
  for (var index = 0; index < this.data.articles.length; ++index) {
    var headlines_container = document.getElementById("headlines");
    var div_container = document.createElement("div");
    var img_container = document.createElement("span");
    var text_container = document.createElement("span");
    var source = document.createElement("h3"); // Name of the source of the article
    var headline = document.createElement("a"); //Title of the article
    var thumbnail = document.createElement("img"); //Accompanying article photo
    var source_node = document.createTextNode(this.data.articles[index]
      .source.name);
    var headline_node = document.createTextNode(this.data.articles[index].title);
    src = this.data.articles[index].urlToImage; //URL of article's main image
    thumbnail.setAttribute('src', src);
    source.appendChild(source_node);
    headline.setAttribute('href', this.data.articles[index].url);
    headline.setAttribute('target', '_blank');
    headline.appendChild(headline_node);
    img_container.appendChild(thumbnail);
    text_container.appendChild(source);
    text_container.appendChild(headline);
    div_container.appendChild(img_container);
    div_container.appendChild(text_container);
    headlines_container.appendChild(div_container);
  }
}

$(document).ready(function() {

  $("#query").keypress(function(e) {
    if (e.which == 13) {
      changeQuery();
    }
  })
});
