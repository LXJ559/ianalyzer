/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */

System.config({
   defaultJSExtensions: true,
   paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
   },
   // map tells the System loader where to look for things
   map: {
      // our app is within the app folder
      app: 'app',
      'mydaterangepicker': 'npm:mydaterangepicker/bundles/mydaterangepicker.umd.js',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // Others
      'core-js': 'npm:core-js/client/shim.min.js',
      'zone.js': 'npm:zone.js/dist/zone.js',
      'reflect-metadata': 'npm:reflect-metadata/Reflect.js',
      'jquery': 'npm:jquery/dist/jquery.min.js',


      //I18N support
      'ng2-translate': 'npm:ng2-translate',
      //Data Grid for Angular2
      'ag-grid-ng2': 'npm:ag-grid-ng2',
      'ag-grid': 'npm:ag-grid',
      'moment': 'npm:moment',
      'ng2-bootstrap': 'npm:ng2-bootstrap',
      //FileItem uploader
      'ng2-file-upload': 'npm:ng2-file-upload',
      //notifications
      'angular2-notifications': 'npm:angular2-notifications',
      // other libraries
      'rxjs': 'npm:rxjs',
      'lodash': 'node_modules/lodash/lodash.js'
   },
   // packages tells the System loader how to load when no filename and/or no extension
   packages: {
      app: {
         main: './main.js',
         defaultExtension: 'js'
      },
      rxjs: {
         main: './Rx.js',
         defaultExtension: 'js'
      },
      'ng2-translate': {
         main: './ng2-translate.js',
         defaultExtension: 'js'
      },
      lib: {
         format: 'register',
         defaultExtension: 'js'
      },
      'ag-grid-ng2': {
         defaultExtension: "js"
      },
      'ag-grid': {
         defaultExtension: "js"
      },
      'moment': {
         main: './moment.js',
         defaultExtension: 'js'
      },
      'ng2-bootstrap': {
         main: './ng2-bootstrap.js',
         defaultExtension: "js"
      },
      'ng2-file-upload': {
         main: '/ng2-file-upload.js',
         defaultExtension: 'js'
      },
      'angular2-notifications': {
         main: './components.js',
         defaultExtension: 'js'
      }
   }
});
