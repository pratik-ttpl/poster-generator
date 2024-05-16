import User from '../models/User.js';

const usersRepo = {
  getUsers: async () => {
    try {
      const users = await User.find();
      return users.length ? users : 'No users found';
    } catch (error) {
      console.log('Error in retrieving users data', error);
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const userData = await User.findById(id);
      return userData ? userData : `user_id: ${id} | user does not exist`;
    } catch (error) {
      console.log('Error while getting user details');
      throw error;
    }
  },

  updateUser: async (payload, params) => {
    try {
      const { id } = params;
      await User.findByIdAndUpdate(id, payload);
      return { status: 'success', message: 'User details successfully updated' };
    } catch (error) {
      console.log('Error in updating User', error);
      throw error;
    }
  },

  deleteUserById: async (id) => {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error(`User with id ${id} not found`);
      }
      return { status: 'success', message: 'User deleted successfully' };
    } catch (error) {
      console.log('Error while deleting user', error);
      throw error;
    }
  },
};

export default usersRepo;
