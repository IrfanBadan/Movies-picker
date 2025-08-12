import { moviesData } from "./data.js";

const moodRadios = document.getElementById("mood-radios")
const classicsOnlyOption =document.getElementById("classics-only-option")
const getMovieBtn = document.getElementById("get-movie-btn")
const movieModalInner = document.getElementById("movie-modal-inner")
const movieModal = document.getElementById("movie-modal")
const closeBtn = document.getElementById("movie-modal-close-btn")


closeBtn.addEventListener("click",function(){
  movieModal.style.display = "none";
})

getMovieBtn.addEventListener("click",renderMovie)
function renderMovie(){
  const movieObject = getSingleMovieObject()
  movieModalInner.innerHTML= `<img
   class="movie-poster" src="${movieObject.poster}">
   <h3 class="movie-title">${movieObject.title}</h3>
   <p class="movie-details" >year :${movieObject.year}</p>
   <p class="movie-details"> Rating : ${movieObject.rating} </p>
   <p class="movie-genre">${movieObject.genre}</p>` 
  movieModal.style.display = "flex";

}


function getSingleMovieObject(){
  const moviesArray = getMatchingMoviesArray()
  if(moviesArray.length===1){
    return moviesArray[0]
  }else{
    const randomNumber = Math.floor(Math.random(moviesArray)*moviesArray.length)
    console.log(randomNumber)
    return moviesArray[randomNumber]
  }
}

function getMatchingMoviesArray(){
  if(document.querySelector(`input[type = "radio"]:checked`)){
    const isClassic = classicsOnlyOption.checked;
    console.log(isClassic)
    console.log(document.querySelector(`input[type = "radio"]:checked`).value)

    const selectedMovie = document.querySelector(`input[type = "radio"]:checked`).value
    const MatchingMoviesArray = moviesData.filter(function(movie){
      // return cat.emotionTags.includes(selectedEmotion)
      if(isClassic){
              return movie.moodTags.includes(selectedMovie) && movie.isClassic === true
      }else{
        return movie.moodTags.includes(selectedMovie)
      }   
    })
   return MatchingMoviesArray ;
  }
}

moodRadios.addEventListener("change",highlightCheckedOption)
function highlightCheckedOption(e){
  const radios = document.getElementsByClassName("radio")
  for(let radio of radios){
    radio.classList.remove("highlight")
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

function getMoviesArray(movies){
    const moodsArray =[];
    for(let movie of movies){
      for(let mood of movie.moodTags){
        if(!moodsArray.includes(mood)){
            moodsArray.push(mood)
        }
      }
    }
    return moodsArray ;
}

function renderMoodsRadios(movies){
    let radioItems ="" ;
    const moods = getMoviesArray(movies)
    .sort((a, b) => a.localeCompare(b));
    for(let mood of moods){
        radioItems += `<div class="radio">
         <input type ="radio" id = "${mood}" value = "${mood}" name ="movies"/>
         <label for="${mood}">${mood}</label>
        </div>`
    }
    moodRadios.innerHTML = radioItems ; 
}

renderMoodsRadios(moviesData)
