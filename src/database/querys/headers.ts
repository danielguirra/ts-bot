import { apiToken } from '../apiToken';

export const headers = {
   'Content-Type': 'application/json',
   'Access-Control-Request-Headers': '*',
   'api-key': apiToken,
};
