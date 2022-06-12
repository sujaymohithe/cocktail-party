class localStorageService {
  // get item
  static getItem = (key: string) => {
    try {
      const data = localStorage.getItem(key);
      if (data && typeof data === "string") {
        return JSON.parse(data);
      } else {
        return {};
      }
    } catch (error) {
      return {};
    }
  };

  // set item
  static setItem = (key: string, data: any) =>
    localStorage.setItem(key, JSON.stringify(data));

  // remove item
  static removeToken = (key: string) => localStorage.removeItem(key);
}

export default localStorageService;
