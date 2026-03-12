async function apiSearch(searchTerm) {
    const netlifyFunctionURL = `/.netlify/functions/search?tag=${searchTerm}`;
    const options = {
        method: "GET"
    };
    const response = await fetch(netlifyFunctionURL, options);
    const data = await response.json();

    console.log(data);
}

let selectedMood;

const moodSelector = document.querySelectorAll('.gradient-btn');
const songResults = document.querySelectorAll('.final-btn');

moodSelector.forEach(element => {
    element.addEventListener('click', () => {
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