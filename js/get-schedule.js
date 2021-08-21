const params = new URLSearchParams(document.location.search.substring(1));
const id = params.get('id');
const url = 'https://api.football-data.org/v2/';
const matchesTableBody = document.getElementById('table');
window.sr = ScrollReveal();


document.addEventListener('DOMContentLoaded', () => {
    
    //scroll animations
    sr.reveal('header', {
        duration: 3000,
        origin: 'bottom',
        distance: '-100px'
    });

    getSchedule();
});

async function getSchedule() {
    try {
        await fetch(`${url}teams/${id}/matches`, {
            "method" : "GET",
            "headers" : {
                "X-Auth-Token" : "fb158dbd69914356b52d87836a01a36f"
            }
        })
        .then(resp => resp.json())
        .then(result => {
            const matches = result.matches;
            console.log(matches);

            cleanHTML(matchesTableBody);
    
            matches.forEach(match => {
                let { utcDate , awayTeam, homeTeam, score: { fullTime }  } = match;
                utcDate = utcDate.substring(0,10);
                let row = document.createElement('tr');
                let stringTemplate = `
                  <th scope="row">${utcDate}</th>
                  <td><img src="https://crests.football-data.org/${homeTeam.id}.svg" class="image-team"> &nbsp; ${homeTeam.name} </td>
                  <td><img src="https://crests.football-data.org/${awayTeam.id}.svg" class="image-team"> &nbsp;  ${awayTeam.name} </td>
                  <td>${fullTime.homeTeam || '&nbsp;'} : ${fullTime.awayTeam || ''}</td>
                `;
    
                row.innerHTML = stringTemplate;
                matchesTableBody.appendChild(row);
            });
        });
    }
    catch(error) {
        console.log(error);
    }
}


function cleanHTML(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
