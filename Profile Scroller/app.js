const data = [
    {
        name: 'John Doe',
        age: 32,
        gender: 'male',
        lookingfor: 'female',
        location: 'Boston',
        image: 'https://randomuser.me/api/portraits/men/82.jpg'
    },

    {
        name: 'Jen Doe',
        age: 23,
        gender: 'female',
        lookingfor: 'male',
        location: 'Miami',
        image: 'https://randomuser.me/api/portraits/women/82.jpg'
    },

    {
        name: 'William Li',
        age: 28,
        gender: 'male',
        lookingfor: 'female',
        location: 'New York',
        image: 'https://randomuser.me/api/portraits/men/83.jpg'
    }
];

const profiles = profileIterator(data);

// Call first profile
nextProfile();

// Next Event
document.querySelector('#next').addEventListener('click', nextProfile);

// nextProfile display function
function nextProfile() {
    const currentProfile = profiles.next().value;
    if(currentProfile !== undefined) {
    document.querySelector('#profileDisplay').innerHTML = `
        <ul class="list-group">
            <li class="list-group-item">Name: ${currentProfile.name}
            </li>
            <li class="list-group-item">Age: ${currentProfile.age}
            </li>
            <li class="list-group-item">Gender: ${currentProfile.gender}
            </li>
            <li class="list-group-item">Looking For: ${currentProfile.lookingfor}
            </li>
            <li class="list-group-item">Location: ${currentProfile.location}
            </li>
        </ul>
    `;
    document.querySelector('#imageDisplay').innerHTML = `<img src="${currentProfile.image}">`;
    }
    else{
        // No more profiles
        window.location.reload();
    }
}

// Profile Iterator
function profileIterator(profiles) {
    let nextIndex = 0;

    return{
        next: function() {
            return nextIndex < profiles.length ? { value: profiles[nextIndex++], done: false } : { done: true }
        }
    }
}