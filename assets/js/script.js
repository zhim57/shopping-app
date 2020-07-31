// function to force js to wait till the whole document loads
$(document).ready(function () {
    $('.modal').modal();
    $('select').formSelect();

    // setting up some global variables
    var searchString = "";
    var debugMode = false;
    var debugResponse;
    var searchStringDebug;
    var perPage = 10;
    var priceResult;


    // on click function for updating  the below 3 variables from user preferences modal
    $(".modal-close").on("click", function () {
        // APIkey3 = $("#APIkey3").val().trim();
        searchString1 = $("#search-radius").val().trim();
        perPage = $("#search-results").val().trim();

           $(".pererences").html(`search string = ${searchString} miles, results = ${perPage} results.`);
    });
    $(".pererences").html(`radius = ${searchString} miles, results = ${perPage} results.`);

    // module for connecting the debugMode boolean to the debugMode toggle
    debugModePicker = $("#debugModePicker");
    debugModePicker.click(function () {
        debugMode = !debugMode;
        console.log(debugMode);
    });


    $("#submit-city").on("click", function (event) {
        event.preventDefault();
        searchString = $("#city-input").val().trim();
        // // APIkey1 = "f2e73a675d880326530db1f8aee7437b";
        // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey1;
        searchStringDebug = localStorage.getItem("searchString");
// ======================================================================
       
        var searchURL = {
            "async": true,
            "crossDomain": true,
            "url": "https://amazon-price1.p.rapidapi.com/search?keywords="+searchString+"&marketplace=US",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "amazon-price1.p.rapidapi.com",
                "x-rapidapi-key": "847928476cmsheaaf2b6abd565d9p1758d2jsn129d9533941b"
            }
        }
        
     
// ======================================================================

        // Creating an AJAX call for the specific city button being clicked
        //if the program is in a debugMode 
        // the call would be avoided and data red from local storage instead
        console.log(debugMode);
        if (debugMode === false && searchString !== searchStringDebug) {
            searhStringDebug = localStorage.setItem("searchString", searchString);
    
            $.ajax(searchURL).done(function (response) {
                console.log(response);
                console.log(" actual response");

                localStorage.setItem("responseString", JSON.stringify(response));
                fillIntrailCards(response);
            });
        }
        else {
            // debug Mode  uses saved last responce for debugging , no actual ajax calls=============
            debugResponse = JSON.parse(localStorage.getItem("responseString"));
            console.log(" reused response");
            let response= debugResponse;
            fillIntrailCards(response);

        }
    });



    
    
    
    function fillIntrailCards(response) {
        $("#bike-trails-list").empty();
        
        // forloop for creating and filling in of the card elements
        if (response.data === null) {
            $('.modal').modal();
            $('#modal2').modal('open'); 
            $(".modal2-close").on("click", function (open) {
                $('#modal1').modal('open'); 
            });
            
            localStorage.setItem("city", "badRadius");
            
        }
        else {
 
            for (var i = 0; i < response.length; i++) {
  
                // creating variables and assigning values from the trail api object(fresh or from localstorage)
                // var aId = response[i].ASIN;
                var url = response[i].detailPageURL;
                var aImg = response[i].imageUrl;
                // var isPrimeEligible = response[i].isPrimeEligible;
                var listPrice = response[i].listPrice;
                // var price = response[i].price;
                // var aRaiting = response[i].rating;
                // var subtitle = response[i].subtitle; - seems empty most times
                var title = response[i].title;
                // var aName = response[i].title;
                var totalReviews = response[i].totalReviews;
        if (listPrice === ""){
            console.log("triggered");
            console.log(url);
            loadHTML(url)
            listPrice = priceResult;

        }
        else{
            console.log("not -triggered");
            console.log("-------");
            

        }
 
                 // creating the new elements for the dom
                var news12m7 = $('<div class="col s12 m12">');
                var newCard = $('<div class="cardJ horizontal  ">');
                var newCardImg = $('<div class="cardJ-image">');
                var newCardStckrd = $('<div class="cardJ-stacked">');

                var newCardCont = $('<div class="cardJ-content">');
                // var pOne = $('<p>');
                // var s1 = $('<span class="card-title">');
                var s2 = $('<span class="card-title">');
                var pThree = $('<p>');
                // var pFour = $('<p>');
                var pFive = $('<p>');
                // var pSix = $('<p>');
                // var pSeven = $('<p class="AISN">');
                // var pEight = $('<p>');
                var pNine = $('<p>');
                var pTen = $('<p>');
                // var iOne = $('<img class="activator iOne">');
                var iOne = $('<img class="iOne image-fluid">');
                var l1 = $('<a>');
                // var newCardReveal = $('<div>');

                // assigning values , text , html, attibutes and classes accordingly
                // $(newCardImg).addClass("waves-effect waves-block waves-light");
                // $(s1).addClass("activator grey-text text-darken-4");
                // $(s2).addClass("grey-text text-darken-4");
                // $(s1).html(`Name: ${aName}<i class="material-icons right">Click for More</i>`);
                // $(s2).html(`<i class="material-icons right">close</i>`);
                // $(newCardReveal).addClass("card-reveal");
                // $(pOne).text("Online Price: "+price);
                pThree.html( title);
                console.log(listPrice);
                
                listPrice1 = listPrice.split("$");
                listPrice1.shift();
                // console.log(listPrice);
                // listPrice1 = listPrice.pop();
                let listPricej= (parseInt(listPrice1) *1.19).toFixed(2);
                console.log(listPricej);
                // pFour.html("subtitle:  " + subtitle);
                let    listPrice2 =""+"$"+listPricej;
                pFive.text("Expected Price:  " + listPrice2);
                console.log(listPrice2);

                // pSix.text("Rating:  " + aRaiting);
                pTen.html("total Reviews  " + totalReviews);

                iOne.attr("src", aImg);
                iOne.attr("width", "150");
                // iOne.attr("height", "250");
                iOne.attr("alt", "thumbnail");
                // pSeven.html("ASIN: " + aId+  "&nbsp;&nbsp; Prime 1-yes , 0 for No: " + isPrimeEligible);
                // pEight.text("Prime 1-yes , 0 for No: " + isPrimeEligible);
                l1.attr("href", url);
                l1.attr("target", "_blank");
                l1.text(url);
                pNine.html(l1);


                //appending all  completed new elements on the page

                $(newCardCont).append(pThree);
                // $(newCardCont).append(pOne);
                $(newCardCont).append(pFive);
                // $(newCardCont).append(s1);
                $(newCardCont).append(pNine);
                $(newCardStckrd).append(newCardCont);
                $(newCard).append(iOne);
                $(newCard).append(newCardImg);
                $(newCard).append(newCardStckrd);
                $(news12m7).append(newCard);
                $("#bike-trails-list").append(news12m7);
            }
        }
download()
    }
// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}


});


/**
	responseHTML
	(c) 2007-2008 xul.fr		
	Licence Mozilla 1.1
*/	


/**
	Searches for body, extracts and return the content
	New version contributed by users
*/


function getBody(content) 
{
   test = content.toLowerCase();    // to eliminate case sensitivity
   var x = test.indexOf("<body");
   if(x == -1) return "";

   x = test.indexOf(">", x);
   if(x == -1) return "";

   var y = test.lastIndexOf("</body>");
   if(y == -1) y = test.lastIndexOf("</html>");
   if(y == -1) y = content.length;    // If no HTML then just grab everything till end

   console.log("step1");
   priceResult =$1000000;
   return content.slice(x + 1, y);  
} 

/**
	Loads a HTML page
	Put the content of the body tag into the current page.
	Arguments:
		url of the other HTML page to load
		id of the tag that has to hold the content
*/		

function loadHTML(url, fun, storage, param)
{
	var xhr = createXHR();
	xhr.onreadystatechange=function()
	{ 
		if(xhr.readyState == 4)
		{
			//if(xhr.status == 200)
			{
				storage.innerHTML = getBody(xhr.responseText);
				fun(storage, param);
			}
		} 
	}; 

	xhr.open("GET", url , true);
	xhr.send(null); 

} 

    

/**
		Callback
		Assign directly a tag
	*/		


	function processHTML(temp, target)
	{
		target.innerHTML = temp.innerHTML;
	}

	function loadWholePage(url)
	{
		var y = document.getElementById("storage");
		var x = document.getElementById("displayed");
		loadHTML(url, processHTML, x, y);
	}	


	/**
		Create responseHTML
		for acces by DOM's methods
	*/	
	
	function processByDOM(responseHTML, target)
	{
		target.innerHTML = "Extracted by id:<br />";

		// does not work with Chrome/Safari
		//var message = responseHTML.getElementsByTagName("div").namedItem("two").innerHTML;
		var message = responseHTML.getElementsByTagName("div").item(1).innerHTML;
		
		target.innerHTML += message;

		target.innerHTML += "<br />Extracted by name:<br />";
		
		message = responseHTML.getElementsByTagName("form").item(0);
		target.innerHTML += message.dyn.value;
	}
	
	function accessByDOM(url)
	{
		//var responseHTML = document.createElement("body");	// Bad for opera
		var responseHTML = document.getElementById("storage");
		var y = document.getElementById("displayed");
		loadHTML(url, processByDOM, responseHTML, y);
	}	








