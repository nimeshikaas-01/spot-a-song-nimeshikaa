async function apiSearch(searchTerm) {
    const netlifyFunctionURL = `/.netlify/functions/search?tag=${searchTerm}`;
    const options = {
        method: "GET"
    };
    const response = await fetch(netlifyFunctionURL, options);
    const data = await response.json();

    console.log(data);
}

const moodSelector = document.querySelectorAll('.gradient-btn');

moodSelector.forEach(element => {
    element.addEventListener('click', () => {
        const mood = element.dataset.mood;
        apiSearch(mood);
    });
});
