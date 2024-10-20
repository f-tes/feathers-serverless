async function checkFeathers() {
    const studentId = document.getElementById('studentId').value.toUpperCase();
    try {
        const response = await fetch(`/api/feathers?studentId=${encodeURIComponent(studentId)}`);
        const data = await response.json();
        
        const feathersCountDisplay = document.getElementById('feathers-count');
        feathersCountDisplay.innerText = `${data.feathers} feathers`;
        feathersCountDisplay.style.display = 'block';
        
    } catch (error) {
        console.error('Error:', error);
        const feathersCountDisplay = document.getElementById('feathers-count');
        feathersCountDisplay.innerText = 'Error retrieving data';
        feathersCountDisplay.style.display = 'block';
    }
}




document.addEventListener('DOMContentLoaded', () => {
    const feathers = document.querySelectorAll('#feathers i');

    feathers.forEach(feather => {
        // Generate a random position within the right half
        const randomLeft = Math.random() * 50; // Adjust range as needed
        feather.style.left = `calc(50% + ${randomLeft}%)`;
        feather.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random duration between 5s and 10s
    });

    typeWriter(); // Assuming typeWriter is defined elsewhere
});
