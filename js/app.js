const btnSearch = document.getElementById('search');
const leagueTableBody = document.getElementById('table');
const url = 'https://api.football-data.org/v2/';

document.addEventListener('DOMContentLoaded', ()=>{
    
    //event for get league table data
    btnSearch.addEventListener('click', getDataTable);
})

function getDataTable(e) {
    const league = e.target.parentElement.querySelector('select').value;

    if(league!=='') {
        getLeagueTable(league);
    }
}

function getLeagueTable(league) {

    fetch(`${url}competitions/${league}/standings?standingType=HOME`,{
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
              <td><img src="${team.team.crestUrl}" class="image-team">  ${team.team.name}</td>
              <td>${team.playedGames}</td>
              <td>${team.won}</td>
              <td>${team.draw}</td>
              <td>${team.lost}</td>
              <td>${team.goalsFor}</td>
              <td>${team.goalsAgainst}</td>
              <td>${team.goalDifference}</td>
              <td>${team.points}</td>
              <td><a href="#">schedule</a></td>
            `;

            row.innerHTML = stringTemplate;
            leagueTableBody.appendChild(row);

        });
    });
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