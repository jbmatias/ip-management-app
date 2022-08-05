import BaseService from './base.service'

export interface IIpAddress {
  id?: string;
  ip: string;
  user_id?: string;
  label: string;
  updated_at?: string;
  created_at?: string;
}

export interface IAddIpAddressResponse {
  message: string;
  data: IIpAddress;
}

export interface IgetIpAddresses {
  message: string;
  data: Array<IIpAddress>;
}

export default class ApplicationService extends BaseService {    
  storeIpAddress (payload: IIpAddress): Promise<IAddIpAddressResponse> {    
    return this.axios.$post('/api/ip', payload)
  }

  getIpAddress (): Promise<IgetIpAddresses> {    
    return this.axios.$get('/api/ip')
  }

  updateIpAddress (id: string, payload: Object): Promise<IAddIpAddressResponse> {    
    return this.axios.$put(`/api/ip/${id}`, payload)
  }
}
