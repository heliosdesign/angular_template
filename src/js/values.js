'use strict';

/* Values */

angular.module('angularApp.values', [])
  .constant('baseUrl', {
    // 'cdn': 'cdn/',
    'cdn': 'http://205.186.156.50:8000/uploads/',
    'content_local': 'http://localhost:8000/data.json',
    'content': 'http://205.186.156.50:8000/data.json',
    'cms': 'http://205.186.156.50:8000/admin'
  });