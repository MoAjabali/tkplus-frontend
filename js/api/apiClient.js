export default class ApiClient {
  constructor(baseURL, defaultHeaders = {}) {
    this.baseURL = "http://localhost:3000/api" + baseURL;

    this.defaultHeaders = defaultHeaders;
    this.token = localStorage.getItem("Token");
  }
  
  async request(endpoint, method = "GET", data = null, headers = {}) {
    const config = {
      method,
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
        ...this.defaultHeaders,
        ...headers
      }
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  // GET
  get(endpoint, headers = {}) {
    return this.request(endpoint, "GET", null, headers);
  }

  // POST
  post(endpoint, data, headers = {}) {
    return this.request(endpoint, "POST", data, headers);
  }

  // PUT
  put(endpoint, data, headers = {}) {
    return this.request(endpoint, "PUT", data, headers);
  }

  // DELETE
  delete(endpoint, headers = {}) {
    return this.request(endpoint, "DELETE", null, headers);
  }
}