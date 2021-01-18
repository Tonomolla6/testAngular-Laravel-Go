import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  getAdminToken(): String {
    return window.localStorage['jwtTokenAdmin'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  saveAdminToken(token: String) {
    window.localStorage['jwtTokenAdmin'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('jwtTokenAdmin');
  }
}
