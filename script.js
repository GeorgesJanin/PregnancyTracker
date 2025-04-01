// Set the min and max dates when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    
    // Calculate date 42 weeks ago
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() - (42 * 7));
    const minDateString = minDate.toISOString().split('T')[0];
    
    //adding commemnt here
    const dateInput = document.getElementById('conception-date');
    dateInput.min = minDateString;
    dateInput.max = maxDate;
});

// Function to format date as DD/MM/YYYY
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function calculatePregnancy() {
    const lastPeriodDate = new Date(document.getElementById('conception-date').value);
    const today = new Date();
    
    if (!lastPeriodDate || isNaN(lastPeriodDate.getTime())) {
        alert('Please select a valid date');
        return;
    }

    // Check if the selected date is in the future
    if (lastPeriodDate > today) {
        alert('Please select a date that is not in the future');
        return;
    }

    // Check if the selected date is more than 42 weeks ago
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() - (42 * 7));
    if (lastPeriodDate < minDate) {
        alert('Please select a date that is not more than 42 weeks ago');
        return;
    }

    // Calculate due date (40 weeks from first day of last period)
    const dueDate = new Date(lastPeriodDate);
    dueDate.setDate(dueDate.getDate() + 280);

    // Calculate current week (pregnancy is counted from first day of last period)
    const weeksPregnant = Math.floor((today - lastPeriodDate) / (7 * 24 * 60 * 60 * 1000));
    const weeksRemaining = 40 - weeksPregnant;

    // Calculate fetal size based on week
    // Note: We subtract 2 weeks from the pregnancy week to get the actual fetal age
    const fetalAge = Math.max(0, weeksPregnant - 2);
    const fetalSizes = {
        1: "Size of a poppy seed",
        2: "Size of a sesame seed",
        3: "Size of a lentil",
        4: "Size of a blueberry",
        5: "Size of a raspberry",
        6: "Size of a sweet pea",
        7: "Size of a blueberry",
        8: "Size of a raspberry",
        9: "Size of a cherry",
        10: "Size of a strawberry",
        11: "Size of a lime",
        12: "Size of a lime",
        13: "Size of a lemon",
        14: "Size of a lemon",
        15: "Size of an apple",
        16: "Size of an avocado",
        17: "Size of a turnip",
        18: "Size of a bell pepper",
        19: "Size of a tomato",
        20: "Size of a banana",
        21: "Size of a carrot",
        22: "Size of a spaghetti squash",
        23: "Size of a mango",
        24: "Size of an ear of corn",
        25: "Size of a rutabaga",
        26: "Size of a scallion",
        27: "Size of a head of cauliflower",
        28: "Size of an eggplant",
        29: "Size of a butternut squash",
        30: "Size of a large cabbage",
        31: "Size of a coconut",
        32: "Size of a jicama",
        33: "Size of a pineapple",
        34: "Size of a cantaloupe",
        35: "Size of a honeydew melon",
        36: "Size of a head of romaine lettuce",
        37: "Size of a bunch of Swiss chard",
        38: "Size of a leek",
        39: "Size of a mini watermelon",
        40: "Size of a small pumpkin"
    };

    const currentSize = fetalSizes[Math.min(fetalAge, 40)] || "Size of a small pumpkin";

    // Common issues by trimester
    const commonIssues = {
        first: "First Trimester (Weeks 1-13):\n• Morning sickness and nausea\n• Fatigue and exhaustion\n• Breast tenderness\n• Frequent urination\n• Mood swings\n• Food aversions or cravings\n• Spotting or light bleeding (consult doctor if heavy)",
        second: "Second Trimester (Weeks 14-26):\n• Round ligament pain\n• Back pain\n• Swelling in feet and ankles\n• Heartburn\n• Nasal congestion\n• Dizziness\n• Braxton Hicks contractions",
        third: "Third Trimester (Weeks 27-40):\n• Increased back pain\n• Difficulty sleeping\n• Swelling in hands and feet\n• Shortness of breath\n• Frequent urination\n• Hemorrhoids\n• Braxton Hicks contractions\n• Pelvic pressure"
    };

    // Determine which trimester's issues to show
    let currentIssues;
    if (weeksPregnant <= 13) {
        currentIssues = commonIssues.first;
    } else if (weeksPregnant <= 26) {
        currentIssues = commonIssues.second;
    } else {
        currentIssues = commonIssues.third;
    }

    // Add any trimester-specific warnings
    if (weeksPregnant <= 12) {
        currentIssues += "\n\n⚠️ Important: First trimester is crucial for development. Avoid alcohol, smoking, and certain medications. Take prenatal vitamins.";
    } else if (weeksPregnant >= 37) {
        currentIssues += "\n\n⚠️ Important: You're now considered full-term. Watch for signs of labor: regular contractions, water breaking, or bloody show.";
    }

    // Display results
    document.getElementById('results').style.display = 'block';
    document.getElementById('due-date').textContent = formatDate(dueDate);
    document.getElementById('current-week').textContent = `${weeksPregnant} weeks`;
    document.getElementById('weeks-remaining').textContent = `${weeksRemaining} weeks`;
    document.getElementById('fetal-size').textContent = currentSize;
    document.getElementById('common-issues').innerHTML = currentIssues.replace(/\n/g, '<br>');
} 