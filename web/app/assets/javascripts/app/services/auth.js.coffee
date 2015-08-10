app = window.ChaiBioTech.ngApp

app.factory 'Auth', [
  '$http'
  '$rootScope'
  ($http, $rootScope) ->

    login: (email, password) ->
      loginPromise = $http.post('/login', {email: email, password: password}, ignoreAuthModule: true)
      loginPromise.then (resp) ->
        $rootScope.authToken = resp.data.authentication_token

      loginPromise

    isLoggedIn: ->
      $http.get('/loggedin', null, ignoreAuthModule: true)

    logout: ->
      $http.post('/logout')

]

app.service 'AuthToken', [
  '$rootScope'
  '$window'
  ($rootScope, $window) ->
    request: (config) ->
      corsCheck = /8000/
      if $rootScope.authToken && corsCheck.test(config.url)
        config.headers = config.headers || {}
        config.headers['Authorization'] = "Token #{$rootScope.authToken}"

      config

]

app.config [
  '$httpProvider'
  ($httpProvider) ->
    $httpProvider.interceptors.push('AuthToken')
]
