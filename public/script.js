

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function() {
    try {
        const keyword = document.querySelector(".input-keyword").value;
        const movies = await getMovies(keyword);
        updateUI(movies)
    } catch (error) {
        alert(error)
    }
})

function getMovies(inputkeywordvalue) {
    return fetch("http://www.omdbapi.com/?apikey=75408463&s=" + inputkeywordvalue).then((response)=> {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json();
    }).then((response)=> {
        if (response.Response === 'False') {
            throw new Error(response.Error);
        }
        return response.Search;
    })
}

function updateUI(movies){
    let cards = ""
    movies.forEach(movie => {
        cards += showCards(movie)
    })
    const cardContainer = document.querySelector(".card-container")
    const notif = document.querySelector(".notif")
    notif.innerHTML = "Here's the Movies 👍"
    const list = cardContainer.classList;
    list.add('border-2')
    cardContainer.innerHTML = cards;
    const modal = document.querySelector('.modal')
    const list_modal = modal.classList;
    const details = document.querySelector('.details');
    details.addEventListener('click',function(){
        list_modal.remove('hidden')
        list_modal.add('flex')
    })

}

function showCards(movie) {
    return `<div class="movie-card flex items-center flex-col border-md  rounded-sm  border-red-500 border-2  shadow-b shadow-md ">
    <img src="${movie.Poster}" alt="" class="bg-fixed rounded-t-sm w-[350px] h-[350px] mb-3 p-0">
    <h1 class="movie-title text-white text-2xl tracking-widest font-semibold mb-2 text-center">${movie.Title}</h1>
    <h2 class="movie-released text-white text-md border-black border-2 px-8 bg-gradient-to-l from-red-500 to-slate-400 mb-2">${movie.Year}</h2>
    <hr class="border border-b border-rose-500 w-full p-0">
    <div class="flex items-center flex-row">
        <button class="details px-8 py-2 decoration-white border-1 underline underline-offset-4 rounded-md m-3 font-medium bg-gradient-to-l from-red-500 to-slate-400 border-black border-2
         hover:bg-gradient-to-bl hover:from-white hover:to-red-500 hover:text-white hover:no-underline transition ease-in-out duration-200 hover:border-white data-imbid="${movie.imdbID}" data-bs-target="#movieDetailModal data-modal-toggle="defaultModal"">Details</button>
    </div>
    </div>
`
}

// const modal = document.querySelector('.modal')
// const list_modal = modal.classList;

// document.addEventListener('click',function(e){
//     if(e.target.classList.contains(".details")) {
//         modal.
//     }
// })


// const detail = document.querySelector('.details')
// detail

// function showDetail(){
//     return ``
// }

// function Modal(){

// }