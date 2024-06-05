import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Exchange } from '../exchanges/entities';

@Injectable()
export class NotificationsService {
  async sendNotification(email: string, exchange: Exchange): Promise<void> {
    const maxRetries = 3;
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
      try {
        await axios.post(
          'https://sac-express-exchanges.wiremockapi.cloud/notifications',
          { email },
        );
        success = true;
        exchange.notificationAttempts.push({
          date: new Date(),
          success: true,
          error: '',
        });
      } catch (error) {
        attempt++;
        exchange.notificationAttempts.push({
          date: new Date(),
          success: false,
          error: error.message,
        });
        if (attempt === maxRetries) {
          break;
        }
      }
    }
  }
}
