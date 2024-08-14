let seasonDate='2023';
let seasonday='28';
load();
function load(){
  const url = `https://transfermarkt-db.p.rapidapi.com/v1/competitions/play-day-matches?locale=DE&competition_id=GB1&match_day=${seasonday}&season_id=${seasonDate}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'fa877d160dmsh6901109048b3b78p11ad0ajsnb8be09301240',
		'x-rapidapi-host': 'transfermarkt-db.p.rapidapi.com'
	}
};

async function football(){
    let matchesList = [];
    try {
		const response = await fetch(url, options);
        const transferData = await response.json();
        console.log(transferData);
        const footballDetails = transferData.data.playDayMatches;
        matchesList = footballDetails.map((items) => {
            return items;
        });
        
        let html = '';
        console.log(matchesList);
        matchesList.forEach((footballMatch) => {
            html += `
                <div class="matchBox">
                <p>${date(footballMatch)}</p>
                    <div class="matchContainer">
                        <div class="team">
                            <div class="img"><img src="${footballMatch.homeClubImage}" alt=""></div>
                            <p>${footballMatch.homeClubName}(Home)</p>
                        </div>
                        ${result(footballMatch)}
                        <div class="team">
                            <div class="img"><img src="${footballMatch.awayClubImage}" alt=""></div>
                            <p>${footballMatch.awayClubName}(away)</p>
                        </div>
                    </div>
                </div>`;
        });
        
        document.querySelector('.container').innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}
football();
}
function result(footballMatch){
 
if(footballMatch.result!=='-:-'){
return `<div class="team">${footballMatch.result}</div>`;
}
else{
  return '';
}
}
function date(footballMatch){
 console.log(footballMatch.fullMatchDate)
if(footballMatch.fullMatchDate!=='-:-'){
return `<div class="team">${footballMatch.fullMatchDate}(${footballMatch.matchTime})</div>`;
}
else{
  return '';
}
}
function selectSeason(){
  const selectElement=document.querySelector('#season').value;
  seasonDate=selectElement;
  load();
}
function selectDay(){
  const selectElement=document.querySelector('.Day-search').value;
  seasonday=selectElement;
  load();
}

document.querySelector('#season').addEventListener('change',()=>{
  selectSeason();
})
document.querySelector('.button-day').addEventListener('click',()=>{
  selectDay();
})
