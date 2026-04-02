const form = document.getElementById("workoutForm");
const list = document.getElementById("workoutList");
const createSetInputsBtn = document.getElementById("createSetInputs");
const setsContainer = document.getElementById("setsContainer");

let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

//Generates input for each set
createSetInputsBtn.addEventListener("click", () => {
    setsContainer.innerHTML = "";
    const numSets = parseInt(document.getElementById("numSets").value);

    for (let i = 1; i <= numSets; i = i + 1) {
        const div = document.createElement("div");
        div.innerHTML = ` <input type="number" class="weight" placeholder="Set ${i} Weight (lbs)" required>
            <input type="number" class="reps" placeholder="Set ${i} Reps" required>`;
        setsContainer.appendChild(div);
    }
});

// Display workouts
function displayWorkouts() {
    list.innerHTML = "";
    workouts.forEach((w, index) => {
        
        const li = document.createElement("li");
        li.textContent = `${w.date} - ${w.exercise} | Sets: ${w.reps.map((r,i) => r + "x" + w.weights[i]).join(", ")} lbs`;

        // adds delete button to log
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft ="10px";
        deleteButton.addEventListener("click", () => {
            workouts.splice(index, 1);
            localStorage.setItem("workouts", JSON.stringify(workouts));
            displayWorkouts();
        });

        li.appendChild(deleteButton);
        list.appendChild(li);
    });
}

// Submit workout
form.addEventListener ("submit", (e) => {
    e.preventDefault();

    const exercise = document.getElementById("exercise").value;
    const weights = Array.from(document.querySelectorAll(".weight")).map(i =>i.value);
    const reps = Array.from(document.querySelectorAll(".reps")).map(i => i.value);

    const workout = {
        exercise,
        weights,
        reps,
        date: new Date().toLocaleDateString() // adds today's date
    };

workouts.push(workout);
localStorage.setItem("workouts", JSON.stringify(workouts));
displayWorkouts();

form.reset();
setsContainer.innerHTML = "";
});

displayWorkouts();