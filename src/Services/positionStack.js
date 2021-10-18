import axios from "axios";

const instance = axios.create({
  baseURL: 'http://api.positionstack.com/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: (status) => (status >= 200 && status < 400),
});

export default async function SimpleRequestHandler(url, query) {
  const config = {
    url,
    method: 'GET',
    headers: {},
    params: {
      access_key: '5c002588a427a56e5d3cbc050c6b74aa',
      query: query
    }
  };

  return instance.request(config);
}
