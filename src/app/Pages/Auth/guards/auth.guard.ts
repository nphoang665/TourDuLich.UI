import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from "jwt-decode";
import { LoadingSanphamService } from '../../Admin/services/Loading/loading-sanpham.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  if (!user) {
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token);

    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      authService.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
    } else {
      if (user.roles.some(role => role === 'Admin')) {
        return true;
      } else {
        alert('Bạn chưa được cấp quyền truy cập');
        return router.createUrlTree(['/404']);
      }
    }
  } else {
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
  }
};

export const employeeGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  if (!user) {
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token);

    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      authService.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
    } else {
      if (user.roles.some(role => role === 'Nhân viên')) {
        return true;
      } else {
        alert('Bạn chưa được cấp quyền truy cập');
        return router.createUrlTree(['/404']);
      }
    }
  } else {
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
  }
};
export const customerGuard: CanActivateFn = async (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const loadingService = inject(LoadingSanphamService);

  // Set loading state to true
  loadingService.isLoading.next(true);

  const user = await authService.getUser();

  if (!user) {
    authService.logout();
    loadingService.isLoading.next(false);
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token);

    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      authService.logout();
      loadingService.isLoading.next(false);
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
    } else {
      if (user.roles.some(role => role === 'Khách hàng')) {
        loadingService.isLoading.next(false);
        return true;
      } else {
        alert('Bạn chưa được cấp quyền truy cập');
        loadingService.isLoading.next(false);
        return router.createUrlTree(['/404']);
      }
    }
  } else {
    authService.logout();
    loadingService.isLoading.next(false);
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
  }
};
export const GuestGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();


  if (!user) {
    return true;
  }

  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token);

    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      authService.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
    } else {
      console.log(user.roles);

      if (user.roles.some(role => role === null)) {
        return true;
      } else {
        alert('Bạn chưa được cấp quyền truy cập');
        return router.createUrlTree(['/404']);
      }
    }
  } else {
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
  }
};
export const guestOrCustomerGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  if (!user) {
    // Allow guests to access
    return true;
  }

  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token);

    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      authService.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
    } else {
      console.log(user.roles);

      if (user.roles.some(role => role === null || role === 'Khách hàng')) {
        // Allow guests or customers to access
        return true;
      } else {
        alert('Bạn chưa được cấp quyền truy cập');
        return router.createUrlTree(['/404']);
      }
    }
  } else {
    // Allow guests to access
    return true;
  }
};
export const adminOrEmployeeGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  if (!user) {
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token);

    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
      authService.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
    } else {

      if (user.roles.some(role => role === 'Admin' || role === 'Nhân viên')) {
        // Allow Admin or Nhân viên to access
        return true;
      } else {
        alert('Bạn chưa được cấp quyền truy cập');
        return router.createUrlTree(['/404']);
      }
    }
  } else {
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } })
  }
};
