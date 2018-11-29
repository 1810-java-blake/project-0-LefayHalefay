   let videoIdd;
    document.addEventListener("DOMContentLoaded", () => {
        let ytbBtn = document.getElementById("searchBtn");

        ytbBtn.addEventListener("click", event => {
            let searchPhrase = document.getElementById("songArtistSearchText").value;
            let searchPhraseDelimited = searchPhrase.replace(/[\. ,:-]+/g, "+");
            let searchPhraseForLyrics = searchPhrase.replace(/[\. ,:-]+/g, "%20");

            let singerNameForLyrics = searchPhrase.substr(0,searchPhrase.indexOf(' '));
            let searchPhraseForLyricsNoName = searchPhraseDelimited.substr(searchPhraseDelimited.indexOf('+')+1);
            let searchPhraseForLyricsNoName1 = searchPhraseDelimited.substr(searchPhraseDelimited.indexOf('+')+2);
            let lyricsParagraphBody = document.getElementById("lyricsParagraph");
            let lyricsParagraphTitle = document.getElementById("songLyricsTitle");
            
            // let searchPhrase1 = "Halsey+Bad+At+Love";
            // let srcIframeYoutube = document.getElementById("youtubeVideoPlayer");
            // let videoSrc;
            let picSrcc;

            ajax(
            `https://orion.apiseeds.com/api/music/lyric/${singerNameForLyrics}/${searchPhraseForLyricsNoName}?apikey={putyourownapikey}`,
          
                
                obj => { 
                    lyricsParagraphTitle.innerHTML = obj.result.track.name;
                    lyricsParagraphBody.innerHTML = obj.result.track.text;
                },
                (res, status) => {
                    lyricsParagraphTitle.innerHTML = " ";
                    lyricsParagraphBody.innerHTML = "Lyrics Not Found";
                    console.log("No Lyrics Was found for Song!");
                }
            )

            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchPhraseDelimited}&key={putyourownapikey}`)
            .then(resObj => resObj.json())
            .then(resObj => {
                videoIdd = resObj.items[0].id.videoId;
                picSrcc = resObj.items[0].snippet.thumbnails.medium.url;
            })
            .then(
                ()=>{
                    document.getElementById("youtubeVideoPlayer").src = `https://www.youtube.com/embed/${videoIdd}?controls=0`;
                    document.body.style.backgroundImage = `url(${picSrcc})`;
                    document.getElementById('youtubeVideoPlayer').contentWindow.location.reload(true);
                }
            ).catch(err=>console.log(err));      
    });
    });

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
    }
