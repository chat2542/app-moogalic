import { NotFoundError } from 'elysia';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../services/userService';

export async function handleGetAllUsers() {
  try{
    return await getAllUsers();
  } catch (e) {
    console.error(`Error Get all user: ${e}`);
    throw new Error(`Failed Get all user`);
  }
}

export async function handleGetUserById(id: number) {
  try {
    console.log('Received Body:', id);
    const user = await getUserById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;

  } catch (e) {
    console.error(`Error Get user id: ${e}`);
    throw new Error(`Failed Get user with ID ${id}.`);
  }
  
}

export async function handleCreateUser(body?: any) {
  try {
    console.log('Received Body:', body);

    const { email, firstName, lastName } = body;

    if (!email || !firstName || !lastName) {
        throw new Error('Missing required fields: email, firstName, or lastName');
    }

    return await createUser({ email, firstName, lastName });

  } catch (e) {
    console.error(`Error Post user: ${e}`);
    throw new Error(`Failed Post user`);
  }
  
}

  
export async function handleUpdateUser(id: number, body?: any) {
  try {
    console.log('Received Body for Update:', body);

    const { email, firstName, lastName } = body;

    if (!email && !firstName && !lastName) {
        throw new Error('At least one of the fields: email, firstName, or lastName must be provided.');
    }

    return await updateUser(id, { email, firstName, lastName });

  } catch (e) {
    console.error(`Error Update user: ${e}`);
    throw new Error(`Failed Update user with ID ${id}.`);
  }

}

export async function handleDeleteUser(id: number) {
  try {
    const deletedUser = await deleteUser(id);

    if (!deletedUser) {
      throw new NotFoundError('User not found');
    }
    return { message: `User with ID ${id} has been deleted.` };
  } catch (e) {
    console.error(`Error deleting user: ${e}`);
    throw new Error(`Failed to delete user with ID ${id}.`);
  }

}