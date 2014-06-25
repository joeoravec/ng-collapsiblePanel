var app = angular.module('app', []);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
});

app.directive('collapsibleSection', [function () {
    return {
        restrict: "E",
        template: [
            '<div class="collSectionContainer" style="clear:both;">',
            '<div class="collSectionCaptionWrapper">',
            '<div class="collSectionCaption">',
            '<span class="iconArrow" ng-class="(isOpen==true) ? \'arrowUp\' : \'arrowDown\'"></span>{{header}}',
            '</div>',
            '</div>',
            '<div class="collSection {{classname}}" ng-style="{ display: isOpen ? \'block\' : \'none\' }" ng-transclude>',
            '</div></div>'].join(''),
        replace: true,
        transclude: true,
        scope: {
            header: "@",
            classname: "@",
            initState: "@"
        },
        link: function (scope, element, attrs) {
            scope.isOpen = scope.initState === "open" ? true : false;
            element.find('.collSectionCaption').bind('click', function() {
                var $collapsibleSection = element.find('.collSection');

                //$('span.iconArrow', $this).toggleClass('arrowUp arrowDown');

                $collapsibleSection.slideToggle(function () {
                    if ($collapsibleSection.is(':visible')) {
                        $collapsibleSection.css('height', 'auto');
                    }
                    scope.isOpen = !scope.isOpen;
                    scope.$apply();
                });
            });
        }
    };
}]);
