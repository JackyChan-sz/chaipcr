/*
 * Chai PCR - Software platform for Open qPCR and Chai's Real-Time PCR instruments.
 * For more information visit http://www.chaibio.com
 *
 * Copyright 2016 Chai Biotechnologies Inc. <info@chaibio.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

window.ChaiBioTech.ngApp.directive('rampSpeed', [
  'ExperimentLoader',
  '$timeout',
  'alerts',

  function(ExperimentLoader, $timeout, alerts) {
    return {
      restric: 'EA',
      replace: true,
      scope: {
        caption: "@",
        unit: "@",
        reading: '='
      },
      templateUrl: 'app/views/directives/ramp-speed.html',

      link: function(scope, elem, attr) {

        scope.edit = false;
        scope.delta = true; // This is to prevent the directive become disabled, check delta in template, this is used for auto delta field
        var editValue;

        scope.$watch("reading", function(val) {

          if(angular.isDefined(scope.reading)) {
            scope.configureData();
          }
        });

        scope.configureData = function() {

          if(Number(scope.reading) <= 0) {
            scope.shown = "AUTO";
          } else {
            scope.shown = scope.reading + "C/s";
          }
          editValue = scope.shown;
        };


        scope.editAndFocus = function(className) {
          if(scope.shown === "AUTO") {
            scope.shown = editValue = 0;
          } else {
            scope.shown = editValue = String(scope.shown).replace("C/s", "");
          }

        };

        scope.save = function() {
          console.log(scope.shown, editValue);
          if(! isNaN(scope.shown) && Number(scope.shown) < 1000) {
            if(editValue != Number(scope.shown)) {

              scope.reading = (Number(scope.shown).toFixed(1));
              scope.shown = scope.reading + "C/s";


              $timeout(function() {
                ExperimentLoader.changeRampSpeed(scope.$parent).then(function(data) {
                  console.log(data);
                });
              });
            }
            scope.configureData();
            return ;
          }

          scope.configureData();
          var warningMessage = alerts.rampSpeedWarning;
          scope.$parent.showMessage(warningMessage);
        };
      }
    };
  }
]);
