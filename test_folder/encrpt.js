const bcrypt = require('bcrypt');
const saltRounds = 10; // The number of rounds to use for generating the salt

// Example array of users
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' },
    // Add more users as needed
];

// Function to hash passwords
async function hashPasswords(users) {
    try {
        // Hash each user's password and return a new array with hashed passwords
        const hashedUsers = await Promise.all(users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            return { username: user.username, password: hashedPassword };
        }));

        console.log('Users with hashed passwords:', hashedUsers);
        return hashedUsers;
    } catch (err) {
        console.error('Error hashing passwords:', err);
    }
}

// Call the function
hashPasswords(users);
