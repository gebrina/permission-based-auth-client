import Axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

export const axios = import.meta.env.DEV
  ? Axios.create()
  : Axios.create({ baseURL: import.meta.env.API_URL });

export const mock = new AxiosMockAdapter(axios, { delayResponse: 500 });
