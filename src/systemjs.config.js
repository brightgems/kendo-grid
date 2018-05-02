/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'lib/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
          // Angular Material 
    '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
    
        // CDK individual packages
        '@angular/cdk/a11y': 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
        '@angular/cdk/bidi': 'npm:@angular/cdk/bundles/cdk-bidi.umd.js',
        '@angular/cdk/coercion': 'npm:@angular/cdk/bundles/cdk-coercion.umd.js',
        '@angular/cdk/collections': 'npm:@angular/cdk/bundles/cdk-collections.umd.js',
        '@angular/cdk/keycodes': 'npm:@angular/cdk/bundles/cdk-keycodes.umd.js',
        '@angular/cdk/observers': 'npm:@angular/cdk/bundles/cdk-observers.umd.js',
        '@angular/cdk/overlay': 'npm:@angular/cdk/bundles/cdk-overlay.umd.js',
        '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
        '@angular/cdk/portal': 'npm:@angular/cdk/bundles/cdk-portal.umd.js',
        '@angular/cdk/rxjs': 'npm:@angular/cdk/bundles/cdk-rxjs.umd.js',
        '@angular/cdk/table': 'npm:@angular/cdk/bundles/cdk-table.umd.js',
        '@angular/cdk/scrolling': 'npm:@angular/cdk/bundles/cdk-scrolling.umd.js',
        '@angular/cdk/stepper': 'npm:@angular/cdk/bundles/cdk-stepper.umd.js',
        '@angular/cdk/layout': 'npm:@angular/cdk/bundles/cdk-layout.umd.js',
        '@angular/cdk/accordion': 'npm:@angular/cdk/bundles/cdk-accordion.umd.js',
      
      // other libraries
      'cldr-data': 'npm:cldr-data',
      'rxjs': 'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'jszip': 'npm:jszip',
      'pako': 'npm:pako',
      'systemjs-plugin-json': 'npm:systemjs-plugin-json',
      'tslib': 'npm:tslib/tslib.js',
		'ng2-slim-loading-bar': 'npm:ng2-slim-loading-bar/bundles/index.umd.js',
    'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
    "hammerjs": "npm:hammerjs/hammer.min.js",
      // Kendo UI for Angular scopes
      '@progress': 'npm:@progress',
      '@telerik': 'npm:@telerik'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      'ng2-slim-loading-bar':  {  defaultExtension: 'js' },
      '@progress/kendo-angular-buttons' : {main:"dist/cdn/js/kendo-angular-buttons.js",defaultExtension:"js"},
      '@progress/kendo-angular-grid' : {main:"dist/cdn/js/kendo-angular-grid.js",defaultExtension:"js"},
      '@progress/kendo-angular-sortable' : {main:"dist/cdn/js/kendo-angular-sortable.js",defaultExtension:"js"},
      '@progress/kendo-data-query' : {main:"dist/cdn/js/kendo-data-query.js",defaultExtension:"js"},
    '@progress/kendo-angular-l10n': {main: 'dist/cdn/js/kendo-angular-l10n.js',  defaultExtension: 'js'},
    '@angular/kendo-angular-l10n': {main: 'dist/cdn/js/kendo-angular-l10n.js',  defaultExtension: 'js'},
      app: {
        main: 'main',
        defaultExtension: 'js'
      },
      rxjs: {main: 'index'},
      '.': {
        defaultExtension: 'js'
      },
    }
  });
})(this);
