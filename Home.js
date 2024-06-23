fetch("./data.json")
  .then((response) => response.json())
  .then((dati) => {
    const games = structuredClone(dati);
    const arrayGames = games.results;


    console.log(arrayGames);
    let totalGames = document.querySelector('#totalGames');
    totalGames.textContent = arrayGames.length;
    
    let generi = [];

    arrayGames.forEach(gioco => {
        gioco.genres.forEach(obj => {
          generi.push(obj.name)
        })
    });

    let totalGenres = document.querySelector('#totalGenres');
    totalGenres.textContent = new Set(generi).size;

    let piattaforme = [];
    arrayGames.forEach(gioco => {
      gioco.platforms.forEach(piattaforma => {
        piattaforme.push(piattaforma.platform.name)
      })
    })

    let totalPlatforms = document.querySelector('#totalPlatforms');
    totalPlatforms.textContent = new Set(piattaforme).size

    let mappingCardContent = arrayGames.map( (game) => {
      return [game.name, game.background_image, new Date(game.released)]
    }).sort((a,b) => b[2] - a[2]).slice(0,4)

    
    let gameCardWrapper = document.querySelector('#gameCardWrapper');
    mappingCardContent.forEach(element => {
      let div = document.createElement('div')
      div.classList.add('col-12', 'col-md-3', 'mb-3')
      div.innerHTML = `
      
      <div class="card bg-transparent rounded-0 border-numbers-custom p-3 card-game-shadow h-100" style="width: 18rem;">
        <img src="${element[1]}" class="card-img-top rounded-0" alt="...">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title font-s m">${element[0]}</h5>
            <img src="./media/play-station.png" alt="">
            <img src="./media/windows.png" alt="">
            <img src="./media/xbox-30.png" alt="">
            </div>
            <div>
              <hr>
              <div class="d-flex justify-content-between align-items-center">
                <p class="lead font-s acc">Released:</p>
                <p class="font-s acc fst-italic">${element[2].toLocaleDateString("it-IT")}</p>
                </div>
                <button class="btn-cta rounded-0 px-4 font-s">Vai al gioco</button>
                </div>
                </div>
                </div>            
                `
                div.classList.add('scaleUp')
                gameCardWrapper.appendChild(div)
              })
              
              
            })
            
  ScrollReveal().reveal('.scaleUp', { scale: 0.85, duration: 1500, interval: 1000});
  ScrollReveal().reveal('.item', { distance: '100px', duration: 1200, interval: 500 });
