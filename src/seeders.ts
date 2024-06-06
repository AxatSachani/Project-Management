import User from './models/User';
import bcrypt from 'bcrypt';

const seedUsers = async () => {
    // Check if users already exist
    const userCount = await User.countDocuments();
    if (userCount > 0) {
        console.log('Users already exist, skipping seeding.');
        return;
    }

    // Create user data
    const users = [
        {
            username: 'admin',
            email: 'admin@example.com',
            password: 'password',
            role: 'admin'
        },
        {
            username: 'project_manager',
            email: 'pm@example.com',
            password: 'password',
            role: 'project_manager'
        },
        {
            username: 'team_member',
            email: 'tm@example.com',
            password: 'password',
            role: 'team_member'
        }
    ];

    // Hash passwords and save users
    for (let userData of users) {
        userData.password = await bcrypt.hash(userData.password, 8);

        const user = new User(userData);
        await user.save();
    }

    console.log('Users seeded successfully');
};

export default seedUsers;
