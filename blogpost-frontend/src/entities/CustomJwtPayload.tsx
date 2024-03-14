import { JwtPayload } from 'jwt-decode'

export interface CustomJwtpayload extends JwtPayload {
    role?: string;
}


