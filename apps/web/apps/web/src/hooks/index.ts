import PocketBase from 'pocketbase';

export const PB = new PocketBase(import.meta.env.VITE_ENV_POCKETBASE_URL);

export const records = await PB.collection('users').getFullList();