// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/**Urls de los servidores que podemos utilizar */
export const urls = {
  local:  'http://localhost:8080',
  servidor: 'http://vps-6874d3d9.vps.ovh.net',
  ruben: 'http://172.16.9.55:8080',
  rizo: 'http://172.16.9.46:8080'
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
