import axios, {
  AxiosInstance as AxiosInstanceType,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

class AxiosInstance {
  private instance: AxiosInstanceType;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3333/api",
      headers: { "Content-Type": "application/json" },
    });
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return this.handleResponse(response);
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return this.handleResponse(response);
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return this.handleResponse(response);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return this.handleResponse(response);
  }
}

export const axiosInstance = new AxiosInstance();
