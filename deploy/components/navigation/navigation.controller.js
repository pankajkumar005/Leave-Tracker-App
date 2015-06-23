'use strict';

angular.module('leaveTrackerAppApp')
  .controller('NavigationCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Leave Tally',
      'link': '#/',
      'class':"fa fa-fw fa-dashboard"
    },{
      'title': 'Upcoming',
      'link': '#/upcoming',
      'class':"fa fa-fw fa-bar-chart-o"
    },{
      'title': 'Histroy',
      'link': '#/history',
      'class':"fa fa-fw fa-table"
    },{
      'title': 'Team Leave',
      'link': '#/teamleave',
      'class':"fa fa-fw fa-table"
    },{
      'title': 'Team WFH',
      'link': '#/wfhlist',
      'class':"fa fa-fw fa-table"
    }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      var oroute = route.substring(1);
      return oroute === $location.path();
    };
  });
