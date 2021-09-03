import Axios, {AxiosInstance} from "axios";

class StarWarsSdk<T> {
  private baseUrl = 'https://swapi.dev/api/';
  private api: AxiosInstance;

  constructor(resourceName: string) {
    this.api = Axios.create({
      baseURL: this.baseUrl + resourceName,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async getPersonById(id: string): Promise<T> {
    return this.api.get(`/${id}`);
  }

  async getPeople(): Promise<T[]> {
    let result: T[] = [];
    let currentPage = 1;

    while (true) {
      const {data: { results, next }} = await this.api.get(`/?page=${currentPage}`);

      result = [...result, ...results]
      currentPage += 1;

      if (next === null) {
        break;
      }
    }

    return result;
  }
}

export default StarWarsSdk;
