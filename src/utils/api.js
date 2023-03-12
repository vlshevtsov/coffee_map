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
    return fetch(`${this._url}/places`, {
      headers:{
        "accepts":"application/json"
      }
    })
    .then(this._handleResponse)
  }
}

const api = new Api(
  {
    baseUrl: '/coffee_map/api',
  }
);

export default api;