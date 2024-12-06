import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import axios from 'axios';
import { FapshiConfig } from '../config/fapshi.config';

@Injectable()
export class FapshiService {
  constructor(
    @Inject(FapshiConfig.KEY)
    private config: ConfigType<typeof FapshiConfig>,
  ) {}

  async initiatePay(data: Record<string, any>) {
    try {
      // Add the redirectUrl to the data, either from the configuration or the input data
      const paymentData = {
        ...data,
        redirectUrl: data.redirectUrl || this.config.redirectUrl, // Use the redirect URL from config if not provided
      };

      const response = await axios.post(
        `${this.config.baseUrl}/initiate-pay`,
        paymentData,
        {
          headers: {
            apiuser: this.config.apiUser,
            apikey: this.config.apiKey,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async directPay(data: Record<string, any>) {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/direct-pay`,
        data,
        {
          headers: {
            apiuser: this.config.apiUser,
            apikey: this.config.apiKey,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async paymentStatus(transId: string) {
    try {
      const response = await axios.get(
        `${this.config.baseUrl}/payment-status/${transId}`,
        {
          headers: {
            apiuser: this.config.apiUser,
            apikey: this.config.apiKey,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async expirePay(transId: string) {
    try {
      const response = await axios.post(
        `${this.config.baseUrl}/expire-pay`,
        { transId },
        {
          headers: {
            apiuser: this.config.apiUser,
            apikey: this.config.apiKey,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  async userTrans(userId: string) {
    try {
      const response = await axios.get(
        `${this.config.baseUrl}/transaction/${userId}`,
        {
          headers: {
            apiuser: this.config.apiUser,
            apikey: this.config.apiKey,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
}
