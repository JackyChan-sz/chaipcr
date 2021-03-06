describe("Testing wifiLock directive", function() {

    var _$rootScope, _$scope, _allowAdminToggle, _$compile, httpMock, compiledScope, _ExperimentLoader, _canvas, _$timeout, _$uibModal,
    _alerts, _popupStatus, _TimeService, _addStageService, _$state;

    beforeEach(function() {

        module("ChaiBioTech", function($provide) {
            $provide.value('IsTouchScreen', function () {});
        });

        inject(function($injector) {

            _$rootScope = $injector.get('$rootScope');
            _$scope = _$rootScope.$new();
            _$compile = $injector.get('$compile');
            _ExperimentLoader = $injector.get('ExperimentLoader');
            _canvas = $injector.get('canvas');
            _$timeout = $injector.get('$timeout');
            _HomePageDelete = $injector.get('HomePageDelete');
            _$uibModal = $injector.get('$uibModal');
            _alerts = $injector.get('alerts');
            _$state = $injector.get('$state');
            _popupStatus = $injector.get('popupStatus');
            httpMock = $injector.get('$httpBackend');
            _TimeService = $injector.get('TimeService');
            _addStageService = $injector.get('addStageService');
            
            _$state.is = function() {
                return true;
            };

            _$state.params = {
                name: "wow"
            };

            httpMock.expectGET("http://localhost:8000/status").respond("NOTHING");
            httpMock.expectGET("http://localhost:8000/network/wlan").respond("NOTHING");
            httpMock.expectGET("http://localhost:8000/network/eth0").respond("NOTHING");
            httpMock.whenGET("/experiments/10").respond("NOTHING");

            var stage = {
                auto_delta: true
            };

            var step = {
                delta_duration_s: 10,
                hold_time: 20,
                pause: true
            };

            var elem = angular.element('<wifi-lock encryption="encryption" ssid="wow"></wifi-lock>');
            var compiled = _$compile(elem)(_$scope);
            _$scope.show = true;
            _$scope.$digest();
            compiledScope = compiled.isolateScope();
            
        });
    });

    it("It should test initial values", function() {
        
        spyOn(_$state, "is").and.callThrough();

        expect(compiledScope.encryption).toEqual("encryption");
        expect(compiledScope.ssid).toEqual("wow");
        expect(compiledScope.selected).toEqual(true);
    });

    it("It should test $stateChangeStart", function() {

        compiledScope.$broadcast('$stateChangeStart', {}, {}, {name: "wow"});
        //compiledScope.$stateChangeStart = "okay";
        //compiledScope.$digest();
        expect(compiledScope.selected).toEqual(false);

    });

    it("It should test change encryption", function() {

        spyOn(angular, "element").and.returnValue({
            hide: function() {

            }
        });

        compiledScope.encryption = "";
        compiledScope.$digest();
        expect(angular.element).toHaveBeenCalled();
    });
});