/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
  
    const params = options.data && options.method === 'GET' ? 
      '?' + Object.entries(options.data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&') : '';
  
    xhr.open(options.method, options.url + params);
  
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        options.callback(null, xhr.response);
      } else {
        options.callback(new Error(xhr.statusText), xhr.response);
      }
    };
  
    xhr.onerror = () => {
      options.callback(new Error('Network error'));
    };
  
    if (options.method === 'GET') {
      xhr.send();
    } else {
      const formData = new FormData();
      if (options.data) {
        Object.entries(options.data).forEach(([key, value]) => formData.append(key, value));
      }
      xhr.send(formData);
    }
};
