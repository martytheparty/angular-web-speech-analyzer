import { Injectable } from '@angular/core';
import { RouteIndexType, RouteValuesType } from '../interfaces/va-navigation';

@Injectable({
  providedIn: 'root'
})
export class VaNavigationService {

  constructor() { }

  getRouteForIndex(index: RouteIndexType): RouteValuesType
  {
    const urlsDict = { 
      0: '/discrete',
      1: '/api',
      2: '/continuous',
      3: '/logs'
    };

    return urlsDict[index] as RouteValuesType;
  }

  getIndexForRoute(route: RouteValuesType): RouteIndexType
  {
    const routeDict = {
      '/discrete': 0,
      '/api': 1,
      '/continuous': 2,
      '/logs': 3
    }

    return routeDict[route] as RouteIndexType;
  }
}
