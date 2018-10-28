

function alertFunc(){
   alert("WAT WAT!");
}



function ajax(url, success, failure) {
   let xhr = new XMLHttpRequest();

   // the "readyState" tells you the progress of
   // receiving the response.
   xhr.onreadystatechange = () => {
       //console.log(xhr.readyState);
       // TODO: handle the response
       if (xhr.readyState === 4) {
           // we've received the full response.
           // it's a JSON string
           let resJSON = xhr.response;
           if (xhr.status === 200) { // (success)
               let resObj = JSON.parse(resJSON);
               // use our callbacks
               success(resObj);
           } else {
               failure(resJSON, xhr.status);
           }
       }
   };

   // describing the request to be made
   xhr.open('GET', url);

   // construct and send the request
   xhr.send();
   // the next thing that'll happen is
   // readystatechange will fire a bunch of times
   console.log("end of ajax function.");
}

document.addEventListener("DOMContentLoaded", () => {
    let videoIdd;
    document.body.style.backgroundImage = "url('drizzyDrake.jpeg')"
      let ytbBtn = document.getElementById("searchBtn");
      

      ytbBtn.addEventListener("click", event => {
         // params: url, success, failure
         let searchPhrase = document.getElementById("songArtistSearchText");
         console.log(searchPhrase);
         let searchPhrase1 = "Halsey+Bad+At+Love";
         let srcIframeYoutube = document.getElementById("youtubeVideo");
         let videoSrc;
         ajax(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchPhrase1}&key=AIzaSyAn9TqGyVC8GpCsNfszZlckoFkiqWWF2CA`,
            obj => {
                
               console.log(JSON.stringify(obj, null, 2));
               console.log(obj.items);
               console.log(obj.items[0].id.videoId);
               videoIdd = obj.items[0].id.videoId;
               console.log("I live a life I deserve:" + videoIdd);
               videoSrc = (`https://www.youtube.com/embed/${videoIdd}`);
               //console.log(videoSrc);
              // srcIframeYoutube.src = "https://www.jw.org";
               srcIframeYoutube.children[videoSrc];

            },
            (res, status) => {
               console.log(`Failure, status ${status}`);
            }
         )
            console.log("I'm your video id:");
            console.log(videoIdd);

           
           // window.location = "youtube.html";
           window.open('youtube.html', '_blank');

      
        });

        
      console.log("I'm your video id:");
      console.log(videoIdd);
});