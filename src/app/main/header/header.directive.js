(function() {
  'use strict';

  angular
    .module('LandApp')
    .directive('laHeader', header);

  /** @ngInject */
  function header() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/main/header/header.html',
      controller: HeaderController,
      controllerAs: 'vmHeader',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function HeaderController($rootScope, $log, $q, $http, $mdDialog) {
      var vm = this;
      vm.selectedItem = null;
      vm.searchText = "";
      vm.toggleLayersPanel = toggleLayersPanel;
      vm.searchTextChange = searchTextChange;
      vm.selectedItemChange = selectedItemChange;
      vm.querySearch = querySearch;
      vm.shareThisMap = shareThisMap;
      /////////
      function toggleLayersPanel () {
        $log.debug('toggleLayersPanel');
        $rootScope.$broadcast('open-layers-panel');
      }

      function searchTextChange(text) {
        $log.debug("search text changed" + text);
      }

      function selectedItemChange(address) {
        $log.debug("address-selected " + JSON.stringify(address));
        $rootScope.$broadcast('address-selected', address);
      }

      // returns a primise as it is async.
      function querySearch(query) {
        $log.debug("Query search:" + query);

        var url = "https://nominatim.openstreetmap.org/search";
        var defer = $q.defer();

        $http.get(url, {params:{format:"json", q:query, countrycodes:"gb"}})
          .then(
            function successCallback(response){
              defer.resolve(response.data);
            },
            function errorCallback(response){
              defer.reject(response);
            }
          );

        return defer.promise;
      }

      // open a dialog with a shareable link
      function shareThisMap() {
        var dialogConfig = $mdDialog
          .alert()
          .title('Share Map: coming soon!')
          .ok('Ok, awesome');
        $mdDialog.show(dialogConfig);
      }

    }
  }

})();
