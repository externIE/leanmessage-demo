var appId = '7DvXXouGwac4t5ksf4sU8Gcl-gzGzoHsz';

class UserService {
  constructor(rt, conversationCache) {
    'ngInject';

    this.user = {};
    this._connected = false;
    this.rt = rt;
    this.conversationCache = conversationCache;
  }

  isCached() {
    try {
      return localStorage.getItem('user') !== null;
    } catch (e) {
      return false;
    }
  }

  cache(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCachedInfo() {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      return undefined;
    }
  }

  login(id, email) {
    var user = {
      id: id,
      email: email
    };

    this.user = user;
    console.log(user);
    this.cache(user);
    this.conversationCache.setCurrentClientId(id);

    return this.connect(id);
  }

  logout() {
    localStorage.removeItem('user');
    this.close();
    this._connected = false;
  }

  isLoggedin() {
    return this._connected;
  }
  connect(clientId) {
    this._connected = true;
    return this.rt.connect({
      appId: appId,
      clientId: clientId
    });
  }
  close() {
    this.rt.close();
  }
}

export default UserService;
