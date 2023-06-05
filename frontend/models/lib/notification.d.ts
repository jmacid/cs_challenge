import BaseModel from './base-model';

export default class Notification extends BaseModel {
    id: string;
    account: string;
    created_at: Date;
    message: string;
    notification_type: 'AL' | 'WL';
    seen: boolean;
}
