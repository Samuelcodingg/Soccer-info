const btnSearch = document.getElementById('search');
const leagueTableBody = document.getElementById('table');
const url = 'https://api.football-data.org/v2/';
window.sr = ScrollReveal();

document.addEventListener('DOMContentLoaded', ()=>{
    
    sr.reveal('header', {
        duration: 3000,
        origin: 'bottom',
        distance: '-100px'
    });

    sr.reveal('#form-container', {
        duration: 3000,
        origin: 'right',
        distance: '-100px'
    });

    sr.reveal('#container-table', {
        duration: 3000
    })

    //event for get league table data
    btnSearch.addEventListener('click', getDataTable);
})

function getDataTable(e) {
    const league = e.target.parentElement.querySelector('select').value;

    if(league!=='') {
        getLeagueTable(league);
    }
    else {
        showAlert();
    }
}

function showAlert() {
    swal("There is not an option selected!", "Please choose one.", "error");
}

async function getLeagueTable(league) {

    try {
        await fetch(`${url}competitions/${league}/standings?standingType=HOME`,{
            "method" : "GET",
            "headers" : {
                "X-Auth-Token" : "fb158dbd69914356b52d87836a01a36f"
            }
        })
        .then(resp => resp.json())
        .then(result => {
            const teams = result.standings[0].table;
    
            cleanHTML(leagueTableBody);
    
            teams.forEach(team => {
                let row = document.createElement('tr');
                let stringTemplate = `
                  <th scope="row">${team.position}</th>
                  <td class="align-self-center"><img src="${team.team.crestUrl}" class="image-team">  ${team.team.name}</td>
                  <td>${team.playedGames}</td>
                  <td>${team.won}</td>
                  <td>${team.draw}</td>
                  <td>${team.lost}</td>
                  <td>${team.goalsFor}</td>
                  <td>${team.goalsAgainst}</td>
                  <td>${team.goalDifference}</td>
                  <td>${team.points}</td>
                  <td><a href="#" class="text-dark">schedule <i class="fas fa-long-arrow-alt-right"></i></a></td>
                `;
    
                row.innerHTML = stringTemplate;
                leagueTableBody.appendChild(row);
            });
        });
    }
    catch(error) {
        swal("Request failed", error, "error");
    }

    
}


function cleanHTML(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

//request for schedule

// fetch("https://api.football-data.org/v2/teams/66/matches?status=SCHEDULED",{
//     "method" : "GET",
//     "headers" : {
//         "X-Auth-Token" : "fb158dbd69914356b52d87836a01a36f"
//     }
// })
// .then(resp => resp.json())
// .then(result => console.log(result));