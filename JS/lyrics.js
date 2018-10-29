let videoIdd;
function ajax(url, success, failure) {
   let xhr = new XMLHttpRequest();

   xhr.onreadystatechange = () => {

       if (xhr.readyState === 4) {
           let resJSON = xhr.response;
           if (xhr.status === 200) { 
               let resObj = JSON.parse(resJSON);
               success(resObj);
           } else {
               failure(resJSON, xhr.status);
           }
       }
   };

   xhr.open('GET', url);
   xhr.send();
   console.log("end of ajax function.");
}

document.addEventListener("DOMContentLoaded", () => {
      
      let ytbBtn = document.getElementById("searchBtn");

      ytbBtn.addEventListener("click", event => {

         let searchPhrase = document.getElementById("songArtistSearchText").value;
         let searchPhraseDelimited = searchPhrase.replace(/[\. ,:-]+/g, "+");
         console.log(searchPhraseDelimited);
         
         let searchPhrase1 = "Halsey+Bad+At+Love";
         //let srcIframeYoutube = document.getElementById("youtubeVideoPlayer");
         let videoSrc;
         let picSrcc;
         fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchPhraseDelimited}&key=AIzaSyAn9TqGyVC8GpCsNfszZlckoFkiqWWF2CA`)
         .then(resObj => resObj.json())
         .then(resObj => {
             videoIdd = resObj.items[0].id.videoId;
            })
        .then(()=>{
                console.log("I am living life big mama!");
                console.log(videoIdd);
                document.getElementById("youtubeVideoPlayer").src = `https://www.youtube.com/embed/${videoIdd}?controls=0`;    
                
                window.open('youtube.html', '_blank');

            }
        ).catch(err=>console.log(err));
           
          // location.reload();

    });
});