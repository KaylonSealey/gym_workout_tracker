const form = document.getElementById("workoutForm");
const list = document.getElementById("workoutList");

let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

function displayWorkouts() {
    list.innerHTML = "";
    workouts.forEach((w, index) => {
        
        const li = document.createElement("li");
        li.textContent =`${w.exercise} - ${w.sets}x${w.reps} @ ${w.weight}lbs`;
        list.appendChild(li);
    });
}

form.addEventListener ("submit", function(e) {
    e.preventDefault();

    const workout = {
        exercise: document.getElementById("exercise").value,
        sets: document.getElementById("sets").value,
        reps: document.getElementById("reps").value,
        weight: document.getElementById("weight").value

    };

workouts.push(workout);
localStorage.setItem("workouts", JSON.stringify(workouts));
displayWorkouts();
form.reset();
});

displayWorkouts();