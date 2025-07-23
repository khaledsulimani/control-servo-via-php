# 🤖 Robot Arm Control Panel

A web-based interface for controlling and managing a 6-motor robot arm. Easily save, load, and remove motor positions using an intuitive slider UI, with all data stored in a MySQL database via PHP backend scripts.

---

## ✨ Features

- 🎚️ **Adjust Motor Positions:** Use sliders to set values for 6 motors (0–180 degrees).
- 💾 **Save Pose:** Store the current motor positions in the database.
- 📋 **View Saved Poses:** See all saved positions in a table.
- 🔄 **Load Pose:** Instantly load any saved pose into the sliders.
- 🗑️ **Remove Pose:** Delete unwanted poses from the database.
- ♻️ **Reset:** Reset all sliders to the default value (90).

---

## 🛠️ Requirements

- [XAMPP](https://www.apachefriends.org/) or similar local server with **PHP** and **MySQL**
- Web browser (Chrome, Firefox, Edge, etc.)
- MySQL database named `robot_arm_db`
- Table named `motor_positions` with the following structure:

```sql
CREATE TABLE `motor_positions` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `motor1` INT NOT NULL,
  `motor2` INT NOT NULL,
  `motor3` INT NOT NULL,
  `motor4` INT NOT NULL,
  `motor5` INT NOT NULL,
  `motor6` INT NOT NULL
);
```

---

## 🚀 Installation & Setup

1. **Clone or Copy the Project**
   - Place all files in your XAMPP `htdocs/robot-arm-control-panel` directory.

2. **Create the Database and Table**
   - Open phpMyAdmin or use the MySQL command line.
   - Create the database:
     ```sql
     CREATE DATABASE robot_arm_db;
     ```
   - Select the database and create the table using the SQL above.

3. **Configure Database Credentials**
   - By default, the PHP scripts use:
     - Host: `localhost`
     - User: `root`
     - Password: *(empty)*
     - Database: `robot_arm_db`
   - If your setup is different, update the credentials in:
     - `save_pose.php`
     - `load_positions.php`
     - `remove_position.php`

4. **Start XAMPP Services**
   - Launch Apache and MySQL from the XAMPP control panel.

5. **Open the Control Panel**
   - Go to [http://localhost/robot-arm-control-panel/control.html](http://localhost/robot-arm-control-panel/control.html) in your browser.

---

## 🗂️ File Structure

| File                  | Purpose                                 |
|-----------------------|-----------------------------------------|
| `control.html`        | Main user interface                     |
| `styles.css`          | Styling for the UI                      |
| `script.js`           | Frontend JavaScript logic               |
| `save_pose.php`       | PHP script to save a pose               |
| `load_positions.php`  | PHP script to load all saved poses      |
| `remove_position.php` | PHP script to remove a saved pose       |

---

## 🖥️ Usage Guide

1. **Set Motor Positions**
   - Move the sliders to your desired values. The current value is shown next to each slider.

2. **Save a Pose**
   - Click the **Save Pose** button to store the current slider values.

3. **View & Manage Saved Poses**
   - All saved poses appear in the table below the sliders.
   - Click **Load** to apply a pose to the sliders.
   - Click **Remove** to delete a pose from the database.

4. **Reset Sliders**
   - Click **Reset** to set all sliders back to 90.

---

## 🐞 Troubleshooting

- **Nothing happens when saving/loading/removing:**  
  - Check your browser console for errors.
  - Make sure XAMPP's Apache and MySQL are running.
  - Ensure your database and table exist.
  - Verify your PHP files have correct credentials and no syntax errors.

- **JSON errors in console:**  
  - Your PHP scripts might be outputting errors or HTML.  
  - Add these lines at the top of your PHP files for debugging:
    ```php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    ```
  - Remove any duplicate `<?php` tags.

- **Database connection errors:**  
  - Double-check your database credentials and table structure.

---

## 🙋 FAQ

**Q: Can I use this on a live server?**  
A: Yes, but make sure to secure your PHP scripts and database.

**Q: Can I add more motors?**  
A: Yes, but you’ll need to update the HTML, JS, and database table accordingly.

---
## 📸 Project Results

### *front-end*:![صورة واتساب بتاريخ 1447-01-28 في 04 45 56_3b50eb36](https://github.com/user-attachments/assets/407d2218-3247-4de1-a898-3a833ea1a026)


### *front-end*:![صورة واتساب بتاريخ 1447-01-28 في 04 47 14_fce3cf31](https://github.com/user-attachments/assets/ab6f0840-588d-433f-8696-1eb332f20009)
---
## *Code Explanation* 📝💻

## 📂 Brief Overview of Each File

- **control.html**  
  The main web page for the robot arm control panel. It contains the layout, slider controls for each motor, and buttons for saving, loading, running, and resetting poses. It also displays a table of saved positions.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Robot Arm Control Panel</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="control-panel">
        <h2>Robot Arm Control Panel</h2>
        <div class="sliders">
            <label for="motor1">Motor 1: <span id="motor1-value">90</span></label>
            <input type="range" id="motor1" min="0" max="180" value="90">
            <label for="motor2">Motor 2: <span id="motor2-value">90</span></label>
            <input type="range" id="motor2" min="0" max="180" value="90">
            <label for="motor3">Motor 3: <span id="motor3-value">90</span></label>
            <input type="range" id="motor3" min="0" max="180" value="90">
            <label for="motor4">Motor 4: <span id="motor4-value">90</span></label>
            <input type="range" id="motor4" min="0" max="180" value="90">
            <label for="motor5">Motor 5: <span id="motor5-value">90</span></label>
            <input type="range" id="motor5" min="0" max="180" value="90">
            <label for="motor6">Motor 6: <span id="motor6-value">90</span></label>
            <input type="range" id="motor6" min="0" max="180" value="90">
        </div>
        <button id="reset">Reset</button>
        <button id="savePose">Save Pose</button>
        <button id="run">Run</button>

        <h3>Saved Positions</h3>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Motor 1</th>
                    <th>Motor 2</th>
                    <th>Motor 3</th>
                    <th>Motor 4</th>
                    <th>Motor 5</th>
                    <th>Motor 6</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="positions_body">
                <!-- Saved positions will be loaded here -->
            </tbody>
        </table>
    </div>

    <script src="script.js"></script>
</body>
</html>

```
- **styles.css**  
  Provides the visual styling for the control panel, sliders, buttons, and table to make the interface clean and user-friendly.
```css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
}

.control-panel {
    margin: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
}

.sliders {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="range"] {
    width: 100%;
}

button {
    margin: 10px;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    border-radius: 5px;
}

button:hover {
    background-color: #45a049;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}

```
- **script.js**  
  Handles all frontend logic using JavaScript. It updates slider values, sends and receives data to/from the PHP backend, manages saving/loading/removing poses, and updates the UI dynamically.
```js
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
```
- **save_pose.php**  
  A backend PHP script that receives motor positions from the frontend and inserts them as a new pose into the MySQL database.
```php
<?php
$mysqli = new mysqli("localhost", "root", "", "robot_arm_db");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

$stmt = $mysqli->prepare("INSERT INTO motor_positions (motor1, motor2, motor3, motor4, motor5, motor6) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
    "iiiiii",
    $data['motor1'],
    $data['motor2'],
    $data['motor3'],
    $data['motor4'],
    $data['motor5'],
    $data['motor6']
);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}

$stmt->close();
$mysqli->close();
?><?php
$mysqli = new mysqli("localhost", "root", "", "robot_arm_db");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

$stmt = $mysqli->prepare("INSERT INTO motor_positions (motor1, motor2, motor3, motor4, motor5, motor6) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
    "iiiiii",
    $data['motor1'],
    $data['motor2'],
    $data['motor3'],
    $data['motor4'],
    $data['motor5'],
    $data['motor6']
);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}

$stmt->close();
$mysqli->close();
?>
```
- **load_positions.php**  
  A backend PHP script that retrieves all saved poses from the database and returns them as JSON for the frontend to display.
```php
<?php
// load_positions.php

$mysqli = new mysqli("localhost", "root", "", "robot_arm_db");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$query = "SELECT * FROM motor_positions";
$result = $mysqli->query($query);

$positions = [];
while ($row = $result->fetch_assoc()) {
    $positions[] = $row;
}

echo json_encode($positions);

$mysqli->close();
?>
```
- **remove_position.php**  
  A backend PHP script that deletes a specific pose from the database when requested by the
```php
<?php
<?php
$mysqli = new mysqli("localhost", "root", "", "robot_arm_db");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$id = intval($_GET['id']);

$stmt = $mysqli->prepare("DELETE FROM motor_positions WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}

$stmt->close();
$mysqli->close();
?>
```
---
## 📄 License

MIT License
---
---
## 🧑‍💻 Author
- **khaled mahmoud sulaimani** – [@khaledsulimani](https://github.com/khaledsulimani)

---
**Enjoy controlling your robot
