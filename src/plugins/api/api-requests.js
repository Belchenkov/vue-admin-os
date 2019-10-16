import axios from 'axios';

export default class ApiRequest {

  clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }

  async getBlob(entryPoint, params = {}) {
    return new Promise((resolve) => {
      axios.get(entryPoint, {
        params: params,
        responseType: 'arraybuffer',
      }).then((resp) => {
          resolve(resp.data);
      }).catch((error) => {
        if (error) {
          resolve(error.response.data)
        } else
          resolve({})
      });
    });
  }

  async getRequest(entryPoint, params = {}) {
    return new Promise((resolve) => {
      axios.get(entryPoint, {
        params: params,
      }).then((resp) => {
          resolve(resp.data);
      }).catch((error) => {
        if (error) {
          resolve(error.response.data)
        } else
          resolve({})
      });
    });
  }

  async postRequest(entryPoint, data, options = {}) {
    this.clean(data);

    return new Promise((resolve) => {
      axios.post(entryPoint, data, options).then((resp) => {
        resolve(resp.data)
      }).catch((error) => {
        if (error) {
          resolve(error.response.data)
        } else
          resolve({})
      });
    });
  }

  async patchRequest(entryPoint, data, options = {}) {
    this.clean(data);

    return new Promise((resolve) => {
      axios.patch(entryPoint, data, options).then((resp) => {
        resolve(resp.data)
      }).catch((error) => {
        if (error) {
          resolve(error.response.data)
        } else
          resolve({})
      });
    });
  }

  async deleteRequest(entryPoint, data) {
    return new Promise((resolve) => {
      axios.delete(entryPoint, {data: data}).then((resp) => {
        resolve(resp.data)
      }).catch((error) => {
        if (error) {
          resolve(error.response.data)
        } else
          resolve({})
      });
    });
  }

}