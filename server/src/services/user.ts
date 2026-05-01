import UserRepo from "../db/repositories/User.js";
import type { UserType } from '../types/user.js';

export const findAllUsers = async (): Promise<UserType[] | null> => {
  return UserRepo.findAllUsers();
};

export const findUserById = async (id: number): Promise<UserType | null> => {
  return UserRepo.findUserById(id);
};

export const findUserByEmail = async (email: string): Promise<UserType | null> => {
  return UserRepo.findUserByEmail(email);
};

export const findByProperty = async (property: string, value: string): Promise<UserType | null> => {
  return UserRepo.findByProperty(property, value);
};

export const createUser = async (data: UserType): Promise<UserType | null> => {
  return UserRepo.createUser(data);
};

export const updateUser = async (id: number, data: Partial<UserType>): Promise<UserType | null> => {
  return UserRepo.updateUser(id, data);
};

export const deleteUser = async (id: number): Promise<UserType | null> => {
  return UserRepo.deleteUser(id);
};