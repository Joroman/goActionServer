angular.module('myApp', ['ui.router','ngResource','nvd3',"chart.js",'ngDialog'])
    .config(['$stateProvider','$urlRouterProvider','ChartJsProvider',function($stateProvider, $urlRouterProvider,ChartJsProvider) {

     // Configure all line charts
    ChartJsProvider.setOptions('line', {
      chartColors: ['#5cb85c','#FF7E67'],
      responsive: true
    });

    // route for the home page
        $stateProvider
            .state('app', {
                url:'/',
                views:{
                    'header':{
                        templateUrl:'views/header.html',
                         controller  : 'HeaderController'
                    },
                    'content':{
                        templateUrl :'views/home.html',
                        controller  :'HeaderController'
                    }
                }
            })
            .state('app.activeActions',{
                url:'active',
                views:{
                    'content@':{
                        templateUrl :'views/active_actions.html',
                        controller  :'ActionsController'
                    }
                }
            })

            .state ('app.getStartAction',{
                url:'getStart',
                views:{
                    'content@':{
                        templateUrl :'views/getstart_action.html',
                        controller  :'GetStartController'
                    }
                }
            })

            .state('app.editAction',{
                url:'defined/:id',
                views:{
                    'content@':{
                        templateUrl :'views/edit_action.html',
                        controller  :'EditActionController'
                    }
                }
            })
            .state('app.editPros',{
                url:'prospection/:id',
                views:{
                    'content@':{
                        templateUrl :'views/edit_pros.html',
                        controller  :'EditActionController'
                    }
                }
            })
            .state('app.editReq',{
                url:'request/:id',
                views:{
                    'content@':{
                        templateUrl :'views/edit_req.html',
                        controller  :'EditActionController'
                    }
                }
            })
            .state('app.editRes',{
                url:'respond:id',
                views:{
                    'content@':{
                        templateUrl :'views/edit_res.html',
                        controller  :'EditActionController'
                    }
                }
            })

          .state('app.closeActions',{
                url:'close',
                views:{
                    'content@':{
                        templateUrl :'views/close_actions.html',
                        controller  :'CloseActionController'
                    }
                }
            })

            .state('app.closeActions.detail',{
                url:'detail:id',
                views:{
                    'content@':{
                        templateUrl :'views/close_detail.html',
                        controller  :'CloseDetailController'
                    }
                }
            })


            .state('app.clients',{
                url:'clients',
                views:{
                    'content@':{
                        templateUrl :'views/clients.html',
                        controller  :'ClientsController'
                    }
                }
            })
            .state('app.clients.contacts',{
                url:'contacts:id',
                views:{
                    'content@':{
                        templateUrl :'views/contacts.html',
                        controller  :'ContactsController'
                    }
                }
            })
            .state('app.sales',{
                url:'sales',
                views:{
                    'content@':{
                        templateUrl:'views/sales.html',
                        controller:'SalesControllerDonut'
                    }
                }
            })
        ;

        $urlRouterProvider.otherwise('/');
    }]);

angular.module('myApp')

    .controller('ActionsController',['$scope','actionsService','clientsService',function($scope, actionsService,clientsService) {

    //GET ALL ACTIONS OPERATION
        actionsService.getActions().query(
            function(res){
                $scope.actions=res;
                sort();
            },function(err){
                console.log("aqui es.");
                $scope.message='Error'+err.status+ ""+err.statusText;
        });

    //DEFINE VARIBLES
        $scope.titleDef     ="Defined Actions";
        $scope.actionsDef   =[];
        $scope.titlePros    ="Prospect Actions";
        $scope.actionsPro   =[];
        $scope.titleReq     ="Request Acitons";
        $scope.actionsReq   =[];
        $scope.titleRes     ="Response Actions";
        $scope.actionsRes   =[];

        //table Header
        $scope.table_header     =["Create Action","Action Name","Client","Finish Date","Detail"];

        $scope.table_header_pros=["Action Name",'Client','Contact','Objective','Meeting','Detail'];

        $scope.table_header_req=['Action Name','Client','Contact','Service/Product','Estimate Budget','Date Response','Detail'];

        $scope.table_header_res=['Client', 'Offer Name', 'Offer Document','Offer budget', 'Offer margin', 'Send Date','Detail'];


        //to manage ng show
        $scope.def=true;
        $scope.def_color='panel-success';
        $scope.pros=false;
        $scope.pros_color='panel-info';
        $scope.req=false;
        $scope.req_color='panel-info';
        $scope.res=false;
        $scope.res_color='panel-info';


        //SORT FUNCTION

        var sort= function(){
              angular.forEach($scope.actions, function(action){
                  //ACTIVE ACTIONS DEFINED ACTIONS
                    if (action.feedback==null && action.response==null && action.request==null && action.prospection==null){
                              $scope.actionsDef.push(action);
                    }
                // ACTIVE ACTIONS PORSPECTION ACTIONS
                    if (action.feedback==null && action.response==null && action.request==null && action.prospection!=null){
                            $scope.actionsPro.push(action);
                    }
                // ACTIVE ACTIONS REQUEST ACTION
                    if (action.feedback==null && action.response==null && action.request!=null && action.prospection!=null){
                            $scope.actionsReq.push(action);
                    }
                //ACTIVE ACTIONS RESPONSE ACTION
                    if (action.feedback==null && action.response!=null && action.request!=null && action.prospection!=null){
                            $scope.actionsRes.push(action);
                    }

              });
                //Guardamos la contidad de actions de cada collection
                $scope.num_def  =$scope.actionsDef.length;
                $scope.num_pros =$scope.actionsPro.length;
                $scope.num_req  =$scope.actionsReq.length;
                $scope.num_res  =$scope.actionsRes.length;

            };

    // SHOW FUNCTIONS
        $scope.changeToDefined  =function(){
            $scope.def=true;
            $scope.def_color='panel-success';
            $scope.pros=false;
            $scope.pros_color='panel-info';
            $scope.req=false;
            $scope.req_color='panel-info';
            $scope.res=false;
            $scope.res_color='panel-info';
        };
        $scope.changeToProspect =function(){
            $scope.def=false;
            $scope.def_color='panel-info';
            $scope.pros=true;
            $scope.pros_color='panel-success';
            $scope.req=false;
            $scope.req_color='panel-info';
            $scope.res=false;
            $scope.res_color='panel-info';
        };
        $scope.changeToRequest  =function(){
            $scope.def=false;
            $scope.def_color='panel-info';
            $scope.pros=false;
            $scope.pros_color='panel-info';
            $scope.req=true;
            $scope.req_color='panel-success';
            $scope.res=false;
            $scope.res_color='panel-info';
        };
        $scope.changeToResponse =function(){
            $scope.def=false;
            $scope.def_color='panel-info';
            $scope.pros=false;
            $scope.pros_color='panel-info';
            $scope.req=false;
            $scope.req_color='panel-info';
            $scope.res=true;
            $scope.res_color='panel-success';
        };


    }])

    .controller('CloseActionController',['$scope','actionsService','$state',function($scope,actionsService,$state){

        $scope.table_header_win =["Date Sale","Client","Contact","Import","Marign",'Details'];

        $scope.table_header_lose= ["Close Date", "Client", "Contact","Details"];

        var listClose           =[];
        $scope.actionsLoseYear  =[];
        $scope.actionsWinYear   =[];
        $scope.year             = new Date().getFullYear();
        $scope.data             = new Array(2);
        $scope.data             = createArrayData($scope.data);


        actionsService.getActions().query().$promise
            .then(function(res){
                //list action close
                listClose=setActionsClose(res);

                //list action close for year
                listClose=sortActionsDate(listClose);
                $scope.numActionClose= listClose.length;

                //list action close win or lose
                setActionsWIN_LOSE(listClose);

                //number action lose and win the specific year


                //set $scope.data for a chart representation
                setDataChart($scope.actionsWinYear,true);
                setDataChart($scope.actionsLoseYear,false);

                console.log('SORT');
                console.log($scope.actionsWinYear);
                console.log($scope.actionsLoseYear);
            },
            function(res){
                 $scope.message = "Error: "+response.status + " " + response.statusText;
        });


        //getActionsClose
        function setActionsClose(list_actions){
            var list_close= [];
            for(var x=0; x<list_actions.length;x++){
                 if(list_actions[x].feedback!= null){
                     list_close.push(list_actions[x]);
                 }
            }
            return list_close;
        }

        //get actions close of the corresponding year
          function sortActionsDate(action_list){
            var list=[];
            console.log("AÑO :" +$scope.year);
            console.log(action_list);

            for (var x = 0; x< action_list.length; x++){
                if($scope.year === new Date(action_list[x].feedback.project_start_date).getFullYear()){
                    list.push(action_list[x]);
                    console.log("entro");
                }
            }
            console.log(list);
            return(list);
        }



        //get action list win or lose
        function setActionsWIN_LOSE(list_close){
            var list_action_type    =[];
            $scope.actionsLoseYear  =[];
            $scope.actionsWinYear   =[];

            if(list_close.length>0){
                for(var x=0;x<list_close.length;x++){

                    if (list_close[x].feedback.offer_win === true){
                       $scope.actionsWinYear.push(list_close[x]);
                    }else{
                        $scope.actionsLoseYear.push(list_close[x]);
                    }
                }
                $scope.numActionsWin  = $scope.actionsWinYear.length;
                $scope.numActionsLose  = $scope.actionsLoseYear.length;
            }else{
                $scope.numActionsWin  = 0;
                $scope.numActionsLose  = 0;
            }
        }



        //WHEN YOU CHANGE THE YEAR I HAVE TO RE BUILD THE GRAPH.
        $scope.newYear= function(){
               actionsService.getActions().query().$promise
                    .then(function(res){

                        $scope.year= new Date($scope.year).getFullYear();

                         //list action close
                        listClose=setActionsClose(res);

                        //list action close for year

                        listClose=sortActionsDate(listClose);
                         $scope.numActionClose= listClose.length;

                        //list action close win or lose
                        setActionsWIN_LOSE(listClose);

                        //set $scope.data for a chart representation
                        setDataChart($scope.actionsWinYear,true);
                        setDataChart($scope.actionsLoseYear,false);

                        console.log('SORT 2');
                        console.log($scope.actionsWinYear);
                        console.log($scope.actionsLoseYear);
                    },
                    function(res){
                         $scope.message = "Error: "+response.status + " " + response.statusText;
                });

        };

        //GRAPH SHOWS THE NUMNER OF ACTIONS CLOSE (WIN AND LOSE)

        function createArrayData(array){
            for (var x=0; x<2;x++){
                array[x] = new Array(12);
            }

            return array;
        }

        //Set $scope.data[][] array for the chart
        function setDataChart (listActions,type){

            var t;

            if(type == true){
                t=0;
            }else{
                t=1;
            }

            for ( var month =0 ;month<12;month++){
                var count=0;
                for (var x=0; x< listActions.length;x++ ){
                    if(month === new Date (listActions[x].feedback.project_start_date).getMonth()){
                        count++;
                    }
                }
                $scope.data[t][month]=count;
            }

            console.log ("data ....");
            console.log ($scope.data);
        }

        //CHART OBJECT CHART.JS TO SET IN ORDER TO SHOW THE GRAPH

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","Dicember"];
        $scope.series = ['Actions Win', 'Actions Lose'];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };


        //go to detail close action
        $scope.detail = function (action){
            $state.go('app.closeActions.detail',{id:action._id});
        };


    }])

    .controller('CloseDetailController',['$scope','actionsService','$stateParams',function($scope,actionsService,$stateParams){

        //GET the id action with $stateParams
        if(!$stateParams.id)$scope.id=0;
        else $scope.id=$stateParams.id;


        //GET operation
        actionsService.getActions().get({id:$scope.id},function(res){
                $scope.action=res;

                console.log($scope.action);
        });



    }])


    .controller('GetStartController',['$scope','$state','actionsService','clientsService',function($scope,$state,actionsService,clientsService){

      $scope.action={name:"",description:"",_client: "",end_date:new Date(),start_date:new Date(),client_name:""};
      $scope.getStart=true;

        $scope.save =function(){
            console.log("action");
            console.log($scope.action);
            actionsService.getActions().post($scope.action,
                function(res){
                  $state.go('app');
            });
        };

        $scope.clients=clientsService.getClients().query(function(res){
            $scope.clients=res;
            if($scope.clients.length>0)
              $scope.getStart=true;
            if($scope.clients.lenght<0)
              $scope.getStart=false;
        });



        //get all the clients and present to the modal
        $scope.getClients = function(){
            clientsService.getClients().query(function(res){
                $scope.clients=res;

                if($scope.clients.length>0)
                  $scope.getStart=true;
            });

          //Take the client selected form the modal
          $scope.clientChose = function(client){
              $scope.client=client;
              $scope.action.client_name=client.company_name;
              $scope.action._client=client._id;
          };

        };

    }])

    .controller('EditActionController',['$state','$scope','actionsService','panelService','$stateParams','salesService','clientsService',
                                        function($state,$scope,actionsService,panelService,$stateParams,salesService,clientsService){

        $scope.show_act     = true;
        $scope.show_edit    = false;
        $scope.show_create  = false;
        $scope.show_close   = false;




    //GET the current state
         $scope.name_state   = $state.current.name;

    //GET the id action with $stateParams
        if(!$stateParams.id)$scope.id=0;
        else $scope.id=$stateParams.id;


        console.log($scope.id);
        console.log($stateParams);


    //PANELS INFO
        var panels =panelService.getPanels();


    //SHOW METHODS
        $scope.show = function(){
            $scope.show_act     =false;
            $scope.show_edit    =true;
            $scope.show_create  =false;
            $scope.show_close   =false;

        };
        $scope.showClose=function(){
            $scope.show_act     =false;
            $scope.show_edit    =false;
            $scope.show_create  =false;
            $scope.show_close   =true;
        };
        $scope.show1= function(){
            $scope.show_act     =true;
            $scope.show_edit    =false;
            $scope.show_create  =false;
            $scope.show_close   =false;
        };
        $scope.show2= function(){
            $scope.show_act     =false;
            $scope.show_edit    =false;
            $scope.show_create  =true;
            $scope.show_close   =false;
        };


    //SEE THE STATE TO CONFIGURE DE PANELS
        if($scope.name_state=="app.editAction")
        {
            $scope.panels           =panels.slice(0,2);
            $scope.panels[0].color  ='panel-info';
            $scope.panels[0].show   = $scope.show1;
            $scope.panels[1].color  ='panel-success';
            $scope.panels[1].show   = $scope.show2;
            $scope.textButton       ='Edit Defined';
        }
        if($scope.name_state=="app.editPros")
        {
            $scope.panels           =panels.slice(0,3);
            $scope.panels[0].color  ='panel-info';
            $scope.panels[0].show   = $scope.show1;
            $scope.panels[1].color  ='panel-info';
            $scope.panels[1].show   = $scope.show1;
            $scope.panels[2].color  ='panel-success';
            $scope.panels[2].show   = $scope.show2;
            $scope.textButton       ='Edit Prospect';
        }
        if($scope.name_state=="app.editReq")
        {
            $scope.panels           =panels;
            $scope.panels[0].color='panel-info';
            $scope.panels[0].show   = $scope.show1;
            $scope.panels[1].color='panel-info';
            $scope.panels[1].show   = $scope.show1;
            $scope.panels[2].color='panel-info';
            $scope.panels[2].show   = $scope.show1;
            $scope.panels[3].color='panel-success';
            $scope.panels[3].show   = $scope.show2;
            $scope.textButton       ='Edit Request';
        }
        if($scope.name_state=="app.editRes")
        {
            $scope.panels           =panels;
            $scope.panels[0].color  ='panel-info';
            $scope.panels[0].show   = $scope.show1;
            $scope.panels[1].color  ='panel-info';
            $scope.panels[1].show   = $scope.show1;
            $scope.panels[2].color  ='panel-info';
            $scope.panels[2].show   = $scope.show1;
            $scope.panels[3].color  ='panel-info';
            $scope.panels[3].show   = $scope.show1;
            $scope.textButton       ='Edit Response';

         }

    //GET operation
        actionsService.getActions().get({id:$scope.id},function(res){
                $scope.action=res;
                console.log($scope.action);
                $scope.action= setDate($scope.action);

                console.log("action with date");
                console.log($scope.action);
        });

    //PUT operation
        $scope.update = function(){
           actionsService.getActions().update({id:$scope.id},$scope.action);
        };

    //DELET AND POST operations
        $scope.saveNew = function(){
            actionsService.getActions().delete({id:$scope.id},
            function(){
                actionsService.getActions().post($scope.action,
                function(){
                    if($scope.name_state=="app.editAction")
                        {$state.go('app.editPros',{id:$scope.id});}
                    if($scope.name_state=="app.editPros")
                        {$state.go('app.editReq',{id:$scope.id});}
                    if($scope.name_state=="app.editReq")
                         {$state.go('app.editRes',{id:$scope.id});}
                    if($scope.name_state=="app.editRes")
                         {$state.go('app.closeActions');}
                });
            });
        };

        //CLOSE ACTION
        $scope.close = function(){

            if($scope.name_state!="app.editRes"){
                $scope.action.feedback.offer_win=false;
                $scope.action.feedback.project_start_date=new Date();
            }else{
                if($scope.action.feedback.offer_win=="false"){
                      $scope.action.feedback.project_start_date=new Date();
                }
            }
            actionsService.getActions().delete({id:$scope.id},function(){
                actionsService.getActions().post($scope.action, function(response){
                    if(response.feedback.offer_win === true){
                        console.log("entre para grabar sales");
                        saveSale(response);
                        $state.go('app.closeActions');
                    }else{
                        $state.go('app.closeActions');
                    }

                });

            });
        };

        function saveSale(action){
           var sale ={};
            sale.contact        =action.prospection.contact;
            sale._action        =action._id;
            sale.project_price  =action.response.offer_budget;
            sale.project_margin =action.response.offer_margin;
            sale.sales_date     =action.feedback.project_start_date;

            clientsService.getClients().get({id:action._client},function(res){

                sale._client= res.company_name;
                console.log('apunto del post sales');
                console.log(res);
                console.log(sale);
                salesService.getSales().post(sale,function(res){
                    console.log(res);
                    $state.go('app.closeActions');
                });

            });

        }


        function setDate (action){
            if($scope.name_state=="app.editAction"){
                $scope.action.start_date    = new Date (action.start_date);
                $scope.action.end_date      = new Date (action.end_date);
            }

            if($scope.name_state=="app.editPros"){
                $scope.action.start_date    = new Date (action.start_date);
                $scope.action.end_date      = new Date (action.end_date);
                $scope.action.prospection.meeting_date = new Date(action.prospection.meeting_date);
            }

            if($scope.name_state=="app.editReq"){
                $scope.action.start_date    = new Date (action.start_date);
                $scope.action.end_date      = new Date (action.end_date);
                $scope.action.prospection.meeting_date  = new Date(action.prospection.meeting_date);
                $scope.action.request.response_date     = new Date (action.request.response_date);
            }

            if($scope.name_state=="app.editRes"){
                $scope.action.start_date    = new Date (action.start_date);
                $scope.action.end_date      = new Date (action.end_date);
                $scope.action.prospection.meeting_date  = new Date(action.prospection.meeting_date);
                $scope.action.request.response_date     = new Date (action.request.response_date);
                $scope.action.response.date_send        = new Date(action.response.date_send);
                $scope.action.feedback  ={};
                $scope.action.feedback.offer_win        ="false";
                console.log( $scope.action.feedback.offer_win);

            }


            return action;
        }

        $scope.getContacts = function(){

             clientsService.getClients().get({id:$scope.action._client},function(res){
                $scope.client=res;
            });
        };
        $scope.contactChose = function(contact){
            $scope.action.prospection={};
            $scope.action.prospection.contact= contact.name + " " + contact.category+" "+ contact.phone + " " + contact.email;
        };

    }])

    .controller('ClientsController',['$scope','clientsService',function($scope,clientsService){
       $scope.client={
                    _id:"0",
            company_name  :"",
            direction     :"",
            city          :"",
            country       :"",
            phone         :"",
            email         :"",
            contacts:[]
            };
        //GET CLIENTS
        clientsService.getClients().query(
            function(res){
                $scope.clients=res;
                  console.log($scope.clients);

        });

        console.log($scope.clients);

        // POST NEW CLIENT
        $scope.createClient = function(){

            clientsService.getClients().save($scope.client);
            //update the clien list with the new client
            $scope.returnClients();
        };

        //UPDATE CLIENT
        $scope.updateClient = function(id){
            clientsService.getClients().update({id:id},$scope.client, function(){
                clientsService.getClients().query(function(res){
                   $scope.clients=res;
                });
            });
        };

        //CHOSE CLIENT
        $scope.choseClient = function(client){

            var id = $scope.clients.indexOf(client);

             $scope.client = $scope.clients[id];

         };

        //RETURN CLIENT
        $scope.returnClients = function(){

            //update the clien list with the new client
            clientsService.getClients().query(function(res){
                $scope.clients=res;
                $scope.client={};
            });

         };


        // FALTA DELETE NEW CLIENT

       $scope.deleteClient = function(){
           clientsService.getClients().delete({id:$scope.client._id},function(){
               clientsService.getClients().query(function(res){
                   $scope.clients=res;
                   $scope.client={};
               });
           });

       };

    }])

    .controller('ContactsController',['$scope','clientsService','$stateParams',function($scope,clientsService,$stateParams){

        //TAKE THE ID OF THE CLIENT
        if(!$stateParams.id)$scope.id=0;
        else $scope.id=$stateParams.id;

        //GET THE CLIENT
           $scope.client=clientsService.getClients().get({id:$scope.id})
               .$promise.then(
                function(res){
                    $scope.client=res;
                    },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );

        //GET CLIENT
        $scope.getClient = function(){

        $scope.client=clientsService.getClients().get({id:$scope.id})
                .$promise.then(
                    function(res){
                        $scope.client=res;
                        },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                );
        };

        console.log('CLIENT CONTACTS');
        console.log($scope.client);

        //UPDATE CLIENT PUT operation
        $scope.updateClientContact = function(){
            console.log('UPDATE COntact Client');
            console.log($scope.client);

            clientsService.getClients().update({id:$scope.id},$scope.client);
        };

        //DELETE CONTACT
        $scope.deleteContact    = function(){
            if($scope.contact!=null){
                var index=$scope.client.contacts.indexOf($scope.contact);
                console.log("CONTACTA");console.log($scope.contact);
                console.log("CLIENT"); console.log($scope.client);
                console.log(index);

                if(index != -1){
                    $scope.client.contacts.splice(index,1);
                    //put operation

                    console.log($scope.id);
                    clientsService.getClients().update({id:$scope.id},$scope.client);
                }

            }

        };

        //NEW CONTACT (1 DELETE deleteCliente and POST createNewClientContact with the contact)
        $scope.newContact = function(){
            //si el cliente no tiene ningun contacto crear array contact para despues realizar el push de su primer contacto.
            if($scope.client.contacts==null){$scope.client.contacts=[];}

            $scope.client.contacts.push($scope.contact);

            clientsService.getClients().delete({id:$scope.id},function(){
                clientsService.getClients().save($scope.client,function(res){
                    $scope.client=res;
                });
            });
        };

        $scope.takeContact=function(contact){
            $scope.contact=contact;
        };

    }])

    .controller('SalesControllerDonut',['$scope','salesService','clientsService',function($scope,salesService,clientsService){

    $scope.data = [];
    $scope.year= new Date();
        //GET SALES
        salesService.getSales().query().$promise.then(
                function(response){
                    var clientsList = takeClients(response);
                    joinSalesClient(response, clientsList);
                       console.log("OLLLLLLLEEEEEEEEEEEE");
                    },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
        );

         var takeClients = function(sales){
            var list=[];
             if(sales.length>0){
                 for(var x =0; x< sales.length; x++){
                     if(list.indexOf(sales[x]._client)==-1){
                         list.push(sales[x]._client);
                     }

                 }
            }
            console.log("lista clientes");
            console.log(list);
            return list;
        };


        var joinSalesClient = function(sales, clients) {
            for(var i=0; i<clients.length;i++){
                var v=0;

                for(var x=0; x<sales.length;x++){


                    if(clients[i].indexOf(sales[x]._client) != -1 )
                    {
                        if($scope.year.getFullYear() === new Date(sales[x].sales_date).getFullYear()){
                        console.log($scope.year.getFullYear());
                        console.log(new Date(sales[x].sales_date).getFullYear());

                            v=v+sales[x].project_price;
                            console.log(v);
                        }
                    }
                }
                if(v>0){
                    console.log(clients[i]);
                    $scope.data.push({key:clients[i],y:v});
                }

            }


        };


        //GRÁFICO DONUT
        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 350,
                donut: true,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,

                pie: {
                    startAngle: function(d) { return d.startAngle -Math.PI },
                    endAngle: function(d) { return d.endAngle -Math.PI }
                },
                duration: 500,
                legend: {
                    margin: {
                        top: 10,
                        right: 50,
                        bottom: 10,
                        left: 0
                    }
                }
            }
        };


    }])

    .controller('SalesAreaCharController',['$scope','salesService',function($scope,salesService){

        var clientsList=[];
        $scope.year= new Date();
        $scope.yearText = $scope.year.getFullYear();

        //get sales
        salesService.getSales().query().$promise.then(
        function(response){
            var salesClientListSort;
            console.log('sales:::');
            console.log (response);
            clientsList         =takeClients(response);
            salesClientListSort =joinSalesClient(response, clientsList);
            $scope.data=generate(salesClientListSort);
        },
        function(respond){
             $scope.message = "Error: "+response.status + " " + response.statusText;
        });


        //take a list of clients from del sales array.
        //indexOf() -1 element not found
        var takeClients = function(sales){
            var list=[];
             console.log("lista clientes0000");
             if(sales.length>0){
                  console.log("lista clientes1111");
                 for(var x =0; x< sales.length; x++){
                     if(list.indexOf(sales[x]._client)==-1){
                         list.push(sales[x]._client);
                     }
                 }
            }
            console.log("lista clientes22222");
            console.log(list);
            return list;
        };

        //1. I have to group the diferent object sale with its client name
        //2. summ all the sales of the client
        //3. sort array
        //saleClientListSort (clientname,totalsales,array [sales]);
        var joinSalesClient = function(sales, listClients){
            var salesClientListSort=[];
            var salesClientList  =[];
            var project_price   = 0;
            var salesList       =[];

            if(listClients.length>0){
                for(var x=0; x < listClients.length; x++ ){
                    //borramos para volver a guardar
                    project_price=0;
                    salesList =[];

                    for (var y=0; y < sales.length ; y++){

                        if(listClients[x] === sales[y]._client && $scope.year.getFullYear() === new Date(sales[y].sales_date).getFullYear()){

                            project_price = project_price + sales[y].project_price;
                            salesList.push(sales[y]);

                        }
                    }

                    salesClientList.push({client:listClients[x],totalSales:project_price,salesObject:salesList});
                }
            //array sort higher sales.
              // var  salesClientListSort = salesClientList.sort((a,b)=> Number (b.totalSales) - Number(a.totalSales));
                 salesClientListSort = salesClientList.sort(function(a,b){return b.totalSales - a.totalSales;});
            }
            console.log('SalesClientList:');
            console.log(salesClientList);

            return salesClientListSort;
        };
        // Sales grahpic the x is time y have to agrup the sales for month
        function generate(salesClientListSort){
         // data = [{key:nombre cliente, color:#hfha, values:[{x:mes,y:sales_moth}]}] x el array es de 12 como los meses
        //  {key:salesClientListSort[0].client, color:'#bcbd22',values:values0}
            var data    = [];
            var colors  = ["#bcbd22","#1f77b4","#5cb85c","#FF7E67","#f0ad4e"];
            var top5    = 0;

            if(salesClientListSort.length!=-1){
                 top5=salesClientListSort.length;
            }
            if(top5 > 5){
                top5=5;
            }
            //top 5
            for(var y=0; y<top5; y++){
            var value=[];
            var saleslist =salesClientListSort[y].salesObject;

                for (var m=0; m<=11;){
                var monthSales=0;
                    for (var x=0; x< saleslist.length;x++){
                        console.log(new Date (saleslist[x].sales_date).getMonth());

                        if( m === new Date (saleslist[x].sales_date).getMonth()){
                            monthSales= monthSales + saleslist[x].project_price;
                        }
                    }
                    m++;
                    value.push({x:m,y:monthSales});
                }
                data[y]= {key:salesClientListSort[y].client,color:colors[y],values:value};

            }
             console.log(data);
            return data;
        }

        $scope.getSales = function(){

            $scope.year= new Date($scope.yearText);
            console.log ("entroo" + $scope.year);
            salesService.getSales().query().$promise.then(
                function(response){
                    var salesClientListSort;
                    console.log('sales:::');
                    console.log (response);
                    clientsList         =takeClients(response);
                    salesClientListSort =joinSalesClient(response, clientsList);
                    $scope.data=generate(salesClientListSort);
                },
                function(respond){
                     $scope.message = "Error: "+response.status + " " + response.statusText;
            });

        };


        //top 5 clients
        $scope.options = {
            chart: {
                type: 'multiBarChart',
                height: 450,
                margin : {
                    top: 50,
                    right: 20,
                    bottom: 45,
                    left: 80
                },
                clipEdge: true,
                //staggerLabels: true,
                duration: 500,
                stacked: true,
                xAxis: {
                    axisLabel: 'Month',
                    showMaxMin: false,
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Sales',
                    axisLabelDistance: -20,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                }
            }
        };


    }])

    .controller('SalesControllerLineChart',['$scope','salesService',function($scope,salesService){
         //$scope.data=[{key:ventas,values:[x:mes,y:suma ventas mes]}]
        $scope.data=[];
        $scope.date=new Date();
        $scope.dateText= $scope.date.getFullYear();

        //get sales
        salesService.getSales().query().$promise.then(
            function(response){
             $scope.data=setDataSaleMonth(response);
            },
            function(response){
                 $scope.message = "Error: "+response.status + " " + response.statusText;
            });

        // moth sales
        var setDataSaleMonth = function(sales){
            var char_data =[];
            var chart_value=[];
            for (var m=0; m <=11;){
            var sales_month=0;
                for (var y=0; y<sales.length; y++){
                    if(m === new Date(sales[y].sales_date).getMonth() && $scope.date.getFullYear() === new Date(sales[y].sales_date).getFullYear()){
                        sales_month= sales_month + sales[y].project_price;
                    }
                }
               m++;
            chart_value.push({x:m,y:sales_month});
           }
             char_data.push({key:'Sales', "color":'#5cb85c',values:chart_value});
            return char_data;
        };

        $scope.changeYear = function(){
            //get sales year

            salesService.getSales().query().$promise.then(
                function(response){
                $scope.date= new Date($scope.dateText);
                $scope.data=setDataSaleMonth(response);
                },
                function(response){
                     $scope.message = "Error: "+response.status + " " + response.statusText;
                });
        };


        $scope.options = {
            chart: {
                type: 'multiBarChart',
                height: 400,
                margin : {
                    top: 50,
                    right: 20,
                    bottom: 45,
                    left: 80
                },
                clipEdge: true,
                //staggerLabels: true,
                duration: 500,
                stacked: true,
                xAxis: {
                    axisLabel: 'Month',
                    showMaxMin: false,
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Sales',
                    axisLabelDistance: -20,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                }
            }
        };

        //$scope.data=[{key:ventas,values:[x:mes,y:suma ventas mes]}]

    }])

    .controller('SalesChartController',['$scope','salesService',function($scope,salesService){

        $scope.year         = new Date().getFullYear();

        //CHART OBJECT CHART.JS TO SET IN ORDER TO SHOW THE GRAPH
        $scope.labels       = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","Dicember"];
        $scope.data         = new Array(2);
        $scope.data         = createArrayData($scope.data);
        $scope.series       = [];
        $scope.onClick      = function (points, evt) {
            console.log(points, evt);
        };

        //get sales
        salesService.getSales().query().$promise.then(
            function(res){
              $scope.data =setDataSaleMonth(res);
            },function(res){
                $scope.message = "Error: "+response.status + " " + response.statusText;
            });



        //set de sales of the selected year and de year befaore
        var setDataSaleMonth = function(sales_list){
            var sales           = new Array(2);
            sales               = createArrayData($scope.data);
            var year_sales      = new Date();
            year_sales.setFullYear($scope.year);

            for (var i=0; i<2;i++){

                for (var m=0; m <=11;m++){

                    var sales_month=0;
                    for (var y=0; y<sales_list.length; y++){
                        if(m === new Date(sales_list[y].sales_date).getMonth() && year_sales.getFullYear() === new Date(sales_list[y].sales_date).getFullYear()){
                            sales_month= sales_month + sales_list[y].project_price;
                        }
                    }
                    sales[i][m]=sales_month;
               }
                $scope.series.push(year_sales.getFullYear().toString());
                year_sales.setFullYear(year_sales.getFullYear()-1);
            }
            return sales;
        };

        //create a array matrix 2x12
         function createArrayData(array){
            for (var x=0; x<2;x++){
                array[x] = new Array(12);
            }

            return array;
        }

        $scope.changeYear = function(){
              //get sales
        salesService.getSales().query().$promise.then(
            function(res){
              $scope.data =setDataSaleMonth(res);
            },function(res){
                $scope.message = "Error: "+response.status + " " + response.statusText;
            });

        };
    }])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';

    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }

    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };

    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };

    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });

    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });

    $scope.stateis = function(curstate) {
       return $state.is(curstate);
    };

}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

    $scope.loginData = $localStorage.getObject('userinfo','{}');

    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };

    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };

}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

    $scope.register={};
    $scope.loginData={};

    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);

        ngDialog.close();

    };
}])
;

angular.module('myApp')
  .constant("baseURL","http://ec2-35-158-94-35.eu-central-1.compute.amazonaws.com:8080/")

    .service('actionsService',['$resource','baseURL',function($resource,baseURL){
        this.getActions=function(){
           return $resource(baseURL+'actions/:id',null,{
               'update' :{method:'PUT'},
               'post'   :{method:'POST'}
           });
        };

    }])

    .service('panelService',function(){
        this.getPanels = function(){
            var panels=[
                {
                    id:0,
                    icon:'fa fa-comment-o fa-4x',
                    title:'Define Action',
                    text:'This is the first step of the cycle. You have to describe the action that you have in mind and choose the client that you want to make the action. Also put a dead line for all the cycle.',
                    collapse:'collapseOne',
                },
                {
                    id:1,
                    icon:'glyphicon glyphicon-earphone fa-4x',
                    title:'Prospect Action',
                    text:'Prospection is the second step of the cycle. In this phase the objective is to set  a meeting with a client to present our products or services. First of all think about the meeting objective and the strategy. What and why would you like to present or expose the products/services to the client?.¿Why the client would buy your porducts?.... Second you have to chose from the client the concret contact for the action. When you chose the contact you will see all the information you need to concret a meeting. To finish this phase you will have to stablish the meeting with the contact an fullfill  the field (meeting date). If you can arrenge the meeting close the action',
                    collapse:'collapseTwo'
                },
                {
                    id:2,
                    icon:'glyphicon glyphicon-import fa-4x',
                    title:'Request Action',
                    text:'Now you made the meeting with the client. So If the client request some product or service or you have seen an oportunity is time to resum the meeting and after start to prepare the offer. If the client not want anythig now close the action and explain your feelings.',
                    collapse:'collapseThree'
                },
                {
                    id:3,
                    icon:'glyphicon glyphicon-send fa-4x',
                    title:'Response Action',
                    text:'Response, in this phase you have to update information about the concret offer for the client. You update the offer, the budget, the margin ... If finally it is not possbile to develop the offer for any reasons close the action and set the feedback. If you send the offer, the client say to you if you are the winner or not. So you have to close the action and update the information fullfill the fields. If all the process go well and you win a sale you can see in the sales section',
                    collapse:'collapseFour'
                }
            ];
            return  panels;
        };

    })

    .service('clientsService',['$resource','baseURL',function($resource,baseURL){
        this.getClients = function(){
            return $resource(baseURL+'clients/:id',null,{
                'update' :{method:'PUT'}
            });
        };

    }])

    .service('salesService',['$resource','baseURL',function($resource,baseURL){
        this.getSales = function(){
            return $resource(baseURL+'sales/:id',null,{
                'post'   :{method:'POST'}});
        };
    }])

.factory('$localStorage', ['$window', function ($window) {
    return {
        store: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        storeObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    };
}])

.factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog','$state', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog,$state){

    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var authToken = undefined;


  function loadUserCredentials() {
    var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
    if (credentials.username != undefined) {
      useCredentials(credentials);
    }
  }

  function storeUserCredentials(credentials) {
    $localStorage.storeObject(TOKEN_KEY, credentials);
    useCredentials(credentials);
  }

  function useCredentials(credentials) {
    isAuthenticated = true;
    username = credentials.username;
    authToken = credentials.token;

    // Set the token as header for your requests!
    $http.defaults.headers.common['x-access-token'] = authToken;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['x-access-token'] = authToken;
    $localStorage.remove(TOKEN_KEY);
  }

    authFac.login = function(loginData) {

        $resource(baseURL + "users/login")
        .save(loginData,
           function(response) {
              storeUserCredentials({username:loginData.username, token: response.token});
              $rootScope.$broadcast('login:Successful');
              $state.go('app.activeActions');
           },
           function(response){
              isAuthenticated = false;

              var message = '\<div class="ngdialog-message">\<div><h3>Login Unsuccessful</h3></div>' +'<div><p>' +  response.data.err.message + '</p><p>' + response.data.err.name + '</p></div>' +'<div class="ngdialog-buttons">\<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\</div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});
           }

        );

    };

    authFac.logout = function() {
        $resource(baseURL + "users/logout").get(function(response){
        });
        destroyUserCredentials();
    };

    authFac.register = function(registerData) {

        $resource(baseURL + "users/register")
        .save(registerData,
           function(response) {
              authFac.login({username:registerData.username, password:registerData.password});
            if (registerData.rememberMe) {
                $localStorage.storeObject('userinfo',
                    {username:registerData.username, password:registerData.password});
            }

              $rootScope.$broadcast('registration:Successful');
           },
           function(response){
            var message = '\<div class="ngdialog-message">\<div><h3>Registration Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message +
                  '</p><p>' + response.data.err.name + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

           }

        );
    };

    authFac.isAuthenticated = function() {
        return isAuthenticated;
    };

    authFac.getUsername = function() {
        return username;
    };

    loadUserCredentials();

    return authFac;

}])
;
