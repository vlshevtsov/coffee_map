class Api {
  constructor(options){
    this._url = options.baseUrl;
  }

  _handleResponse(res) {
     if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  }

  getPlaces = () => {
    return fetch(`${this._url}/places`)
    .then(this._handleResponse)
  }
}

const api = new Api(
  {
    baseUrl: 'http://127.0.0.1:443/api',
  }
);

export default api;