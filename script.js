//  const APIURL = 'https://api.github.com/users/'

const APIURL = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?date=13-05-2021&pincode='

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username) {
//    try {
        //const { data } = await axios(APIURL + username)

        let resp = await fetch(APIURL + username)        
        let data = await resp.json()

        console.log(data)

        
        createCenterCard(data)
//        createUserCard(data)
//        getRepos(username)
//    } 
    
/*     catch(err) {
        if(err.response.status == 404) {
            createErrorCard('No profile with this username')
        }
    } */
}

async function getRepos(username) {
    try {
        //const { data } = await axios(APIURL + username + '/repos?sort=created')

        let resp = await fetch(APIURL + username + '/repos?sort=created')
        let data = await resp.json()

        console.log(data)


        addReposToCard(data)
    } catch(err) {
        createErrorCard('No profile with this username & Problem fetching repos')
    }
}


function createCenterCard(myCenter) {

        main.innerHTML = ''

        myCenter.centers.forEach(element => { 

            let availability = '';
            element.sessions.forEach(e => {

                availability += e.date +' Available:  '+ e.available_capacity +'  '+ e.vaccine +'<br>';

            })
        

        const cardHTML = `
        <div class="card">
            <div>
            <h3>${element.name} </h3> 
            <h5>${element.address}</h5>
            Fee: ${element.fee_type}
  
            </div>
        
            <div class="user-info">

            <ul>
                
                ${availability}

            </ul>
            <div id="repos"></div>
          </div>
        </div>  
          `
        main.innerHTML += cardHTML

}); 

}

function createUserCard(myCenter) {




    const cardHTML = `
    <div class="card">
    <div>
      <h1>${myCenter} </h1>   
    </div>

    <div class="user-info">
      <h6>${myCenter.name}</h6>
      <p>${myCenter.bio}</p>
      <ul>
        <li>${myCenter.followers} <strong>Followers</strong></li>
        <li>${myCenter.following} <strong>Following</strong></li>
        <li>${myCenter.public_repos} <strong>Repos</strong></li>
      </ul>
      <div id="repos"></div>
    </div>
  </div>  
    `
    main.innerHTML = cardHTML


    
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `

    main.innerHTML = cardHTML
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if(user) {
        getUser(user)

        search.value = ''
    }
})