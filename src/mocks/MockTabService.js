export const TabService = {
  getTabData: (url) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`Mocked data from URL: ${url}`);
      }, 1000);
    });
  }
};
