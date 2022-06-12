class localStorageService {
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

  // set
  static setItem = (key: string, data: any) =>
    localStorage.setItem(key, JSON.stringify(data));

  // remove
  static removeToken = (key: string) => localStorage.removeItem(key);
}

export default localStorageService;
