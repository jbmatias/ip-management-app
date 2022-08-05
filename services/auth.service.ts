import BaseService from './base.service'

export interface IUser {
  name: string;
  email: string; 
  password: string;
  repeatPassword: string;
}


export default class AuthService extends BaseService {    
  register (payload: IUser): Promise<any> {    
    return this.axios.$post('/api/register', payload)
  } 
}
