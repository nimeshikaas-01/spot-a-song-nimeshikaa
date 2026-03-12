async function apiSearch(searchTerm) {
    const netlifyFunctionURL = `/.netlify/functions/search?tag=${searchTerm}`;
    const options = {
        method: "GET"
    };
    const response = await fetch(netlifyFunctionURL, options);
    const data = await response.json();

    console.log(data);
    displayResults(data);
}

let selectedMood;

const moodSelector = document.querySelectorAll('.gradient-btn');
const songResults = document.querySelector('.final-btn');

moodSelector.forEach(element => {
    element.addEventListener('click', () => {
        moodSelector.forEach(btn => 
            btn.classList.remove('active')
        );
        element.classList.add('active');
        selectedMood = element.dataset.mood;
        console.log("Mood: ", selectedMood);
    });
});

songResults.forEach(element => {
    element.addEventListener('click', ()=>{
        if (!selectedMood) {
            alert("Please select a mood first!");
            return;
        }
        apiSearch(selectedMood);
    })
})

function displayResults(data) {
    const tracks = data.tracks.track;
    const randomIndex = Math.floor(Math.random() * tracks.length);
    const track = tracks[randomIndex];

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="song-card">
            <h3>${track.name}</h3>
            <p>${track.artist.name}</p>
            <a href="${track.url}" target="_blank">Listen on Last.fm</a>
        </div>
    `;
}