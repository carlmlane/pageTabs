/**
 * Created by Lane on 3/15/15.
 */
var pageTabs = angular.module('pageTabs', ['ngRoute', 'ui.bootstrap'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'tabset.html',
            controller: 'TabsetCtrl'
        })
            .otherwise({
                redirectTo: '/'
            });
    }]);

pageTabs.controller('TabsetCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        $scope.tabs = [
            {
                "heading": "Tab 1",
                "active": true,
                "template": "tab1.html"
            },
            {
                "heading": "Tab 2",
                "active": false,
                "template": "tab2.html"
            },
            {
                "heading": "Tab 3",
                "active": false,
                "template": "tab3.html"
            },
            //{
            //    "heading": "Tab 4",
            //    "active": false,
            //    "template":"tab4.html"
            //},
            //{
            //    "heading": "Tab 5",
            //    "active": false,
            //    "template":"tab5.html"
            //}
        ];
    }]);

pageTabs.controller('CarouselDemoCtrl', function ($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function () {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: 'http://placekitten.com/' + newWidth + '/300',
            text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
            ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };
    for (var i = 0; i < 4; i++) {
        $scope.addSlide();
    }


});

pageTabs.controller('DropdownCtrl', function ($scope, $log) {
    $scope.items = [
        'The first choice!',
        'And another choice for you.',
        'but wait! A third!'
    ];

    $scope.status = {
        isopen: false
    };

    $scope.toggled = function (open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
});

pageTabs.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

pageTabs.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});