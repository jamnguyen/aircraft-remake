export function handleAxiosData(promise) {
  return new Promise((resolve, reject) => {
    promise().then(res => {
      resolve(res.data);
    }, error => {
      if (!error.response) {
        reject({ message: 'Connection error!'});
      } else if (error?.response?.data?.message) {
        reject(error?.response?.data);
      } else {
        reject({ message: 'Something wrong...'});
      }
    });
  });
};
