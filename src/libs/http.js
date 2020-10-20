class Http {
  static instance = new Http();

  get = async (url) => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      return data;
    } catch (error) {
      console.log('HTTP ERROR', error);
      throw Error(error);
    }
  };

  post = async (url, body) => {
    try {
      let response = await fetch(url, { method: 'POST', body });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log('HTTP ERROR POST', error);
      throw Error(error);
    }
  };

  put = async (url, body) => {
    try {
      let response = await fetch(url, { method: 'PUT', body });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log('HTTP ERROR PUT', error);
      throw Error(error);
    }
  };

  delete = async (url, id) => {
    try {
      let response = await fetch(`${url}/${id}`, { method: 'DELETE' });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log('HTTP ERROR DELETE', error);
      throw Error(error);
    }
  };
}

export default Http;
