document.addEventListener('DOMContentLoaded', () => {
    loadSavedPositions();

    // Update slider value displays
    for (let i = 1; i <= 6; i++) {
        const slider = document.getElementById(`motor${i}`);
        const valueSpan = document.getElementById(`motor${i}-value`);
        slider.addEventListener('input', () => {
            valueSpan.textContent = slider.value;
        });
    }

    // Reset button
    document.getElementById('reset').addEventListener('click', () => {
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`motor${i}`).value = 90;
            document.getElementById(`motor${i}-value`).textContent = 90;
        }
    });

    // Save Pose button
    document.getElementById('savePose').addEventListener('click', savePose);
});

// Function to load saved positions from the database
function loadSavedPositions() {
    fetch('load_positions.php')
        .then(response => response.json())
        .then(data => {
            let positionsHtml = '';
            data.forEach((position, index) => {
                positionsHtml += `<tr>
                    <td>${index + 1}</td>
                    <td>${position.motor1}</td>
                    <td>${position.motor2}</td>
                    <td>${position.motor3}</td>
                    <td>${position.motor4}</td>
                    <td>${position.motor5}</td>
                    <td>${position.motor6}</td>
                    <td>
                        <button onclick="loadPosition(${position.id})">Load</button>
                        <button onclick="removePosition(${position.id})">Remove</button>
                    </td>
                </tr>`;
            });
            document.getElementById('positions_body').innerHTML = positionsHtml;
        })
        .catch(error => {
            console.error('Error loading positions:', error);
        });
}

// Save pose to database
function savePose() {
    const data = {};
    for (let i = 1; i <= 6; i++) {
        data[`motor${i}`] = document.getElementById(`motor${i}`).value;
    }

    fetch('save_pose.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Pose saved!');
            loadSavedPositions();
        } else {
            alert('Error saving pose');
        }
    })
    .catch(error => console.error('Error saving pose:', error));
}

function removePosition(id) {
    fetch(`remove_position.php?id=${id}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Position removed successfully');
            loadSavedPositions();
        } else {
            alert('Error removing position');
        }
    })
    .catch(error => console.error('Error removing position:', error));
}

// Load a saved position into the sliders
function loadPosition(id) {
    fetch('load_positions.php')
        .then(response => response.json())
        .then(data => {
            const position = data.find(pos => pos.id == id);
            if (position) {
                for (let i = 1; i <= 6; i++) {
                    document.getElementById(`motor${i}`).value = position[`motor${i}`];
                    document.getElementById(`motor${i}-value`).textContent = position[`motor${i}`];
                }
            }
        })
        .catch(error => {
            console.error('Error loading position:', error);
        });
}