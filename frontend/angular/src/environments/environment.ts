// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // laravel
  api_laravel: 'http://localhost:3000/api',
  // go
  api_go_users: 'http://users.docker.localhost/api',
  api_go_discotecas: 'http://discotecas.docker.localhost/api',
  api_go_events: 'http://events.docker.localhost/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.