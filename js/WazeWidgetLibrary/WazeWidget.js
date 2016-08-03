
(function($) {

    $.fn.WazeWidget = function(options) {

            //adding all parameters to settings object
            var settings = $.extend({
                //Default Parameters
                Modal: "",
                InputPlaceHolder: "",
                Lat: "",
                Long: "",
                GoogleAPIKey: "",
                IframeWidth: "300",
                IframeHeight: "400",
                View: "Normal"

            }, options);
            
            loadCSS();
            continueLoadingResources(settings);
            

        } //$.fn.WazeWidget

    }(jQuery));


var htmlContentToInject='';
var currentLat='';
var currentLng='';
var prefixContent='';
var suffixContent='';
var latW='';
var lngW='';
var IframeWidth="300";
var IframeHeight="300";
var settingsView="";

function showPosition(position) {
    currentLat=position.coords.latitude;
    currentLng=position.coords.longitude;

    if ( flagInitialWW==0 ) prefixContent = '<img id="loadImgCA" src="'+scriptPathWW+'/ajax-loader.gif"> <div id="WWIframeContainer">';
    htmlContentToInject = '<iframe id="wazeIframeCA" src="https://embed.waze.com/iframe?zoom=12&lat='+latW+'&lon='+lngW+'&pin=1" width="'+IframeWidth+'" height="'+IframeHeight+'" frameBorder="0" ></iframe><a class="WWImageBottomLink" data-tip="Open in Waze" href="https://www.waze.com/livemap?zoom=17&lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&from_lat='+position.coords.latitude+'&from_lon='+position.coords.longitude+'&to_lat='+latW+'&to_lon='+lngW+'&at_req=0&at_text=Now"><img id="WazeGoButtonImage" src="'+scriptPathWW+'/WazeGoButton.png"></a>';
    if ( flagInitialWW==0 ) suffixContent = '</div>';
    if ( flagInitialWW==0 ) htmlContentToInject = prefixContent + htmlContentToInject + suffixContent;
    initializeContentDropdown();
}

function withoutPosition(error){

     if ( flagInitialWW==0 ) prefixContent = '<img id="loadImgCA" src="'+scriptPathWW+'/ajax-loader.gif"> <div id="WWIframeContainer">';
    htmlContentToInject = '<iframe id="wazeIframeCA" src="https://embed.waze.com/iframe?zoom=12&lat='+latW+'&lon='+lngW+'&pin=1" width="'+IframeWidth+'" height="'+IframeHeight+'" frameBorder="0" ></iframe><a class="WWImageBottomLink" data-tip="Open in Waze" href="https://www.waze.com/livemap?zoom=17&lat='+latW+'&lon='+lngW+'"><img id="WazeGoButtonImage" src="'+scriptPathWW+'/WazeGoButton.png"></a>';
    if ( flagInitialWW==0 ) suffixContent += '</div>';
    if ( flagInitialWW==0 ) htmlContentToInject = prefixContent + htmlContentToInject + suffixContent;
    initializeContentDropdown();
}


var flagInitialWW=0;
function setLocation( lat, lng ){

    latW=lat;
    lngW=lng;

    if ( detectMobileWW == "true" ){
        if ( flagInitialWW==0 ) prefixContent = '<img id="loadImgCA" src="'+scriptPathWW+'/ajax-loader.gif"> <div id="WWIframeContainer">';
        htmlContentToInject = '<iframe id="wazeIframeCA" src="https://embed.waze.com/iframe?zoom=12&lat='+lat+'&lon='+lng+'&pin=1" width="'+IframeWidth+'" height="'+IframeHeight+'" frameBorder="0" ></iframe><a class="WWImageBottomLink" data-tip="Open in Waze" href="waze://?ll='+lat+','+lng+'&navigate=yes"><img id="WazeGoButtonImage" src="'+scriptPathWW+'/WazeGoButton.png"></a>';
        if ( flagInitialWW==0 ) suffixContent = '</div>';
        if ( flagInitialWW==0 ) htmlContentToInject = prefixContent + htmlContentToInject + suffixContent;
        initializeContentDropdown();
    }
    else {//if desktop
        if (navigator.geolocation) { //if it has user actual coordinates it will open waze with directions options
            navigator.geolocation.getCurrentPosition(showPosition, withoutPosition);
            
        } 

    }
}
function initializeContentDropdown(){

    if ( flagInitialWW==0 ){

        $("#loadImgCA").css("visibility","visible");
        $("#WazeWidget").append( htmlContentToInject );
        $('#wazeIframeCA').on('load', function(){
            $("#loadImgCA").css("visibility","hidden");
        });
        flagInitialWW=1;
        applyCompactCssDropdown();
    }else{

        $("#loadImgCA").css("visibility","visible");
        $("#WWIframeContainer").html( htmlContentToInject );
        $('#wazeIframeCA').on('load', function(){
            $("#loadImgCA").css("visibility","hidden");
        });
        applyCompactCssDropdown();

    }
}

detectMobileWW = detectMobile();
function detectMobile(){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return "true";
    } else {
        return "false";
    }    
}

function loadCSS() {
    var pathToFileCSS=scriptPathWW+'/WazeWidget.css';
    loadjscssfile(pathToFileCSS, "css");
}

var scriptPath = function () {
    var scripts = document.getElementsByTagName('SCRIPT');
    var path = '';
    if(scripts && scripts.length>0) {
        for(var i in scripts) {
            if(scripts[i].src && scripts[i].src.match(/\/WazeWidget\.js$/)) {
                path = scripts[i].src.replace(/(.*)\/WazeWidget\.js$/, '$1');
                break;
            }
        }
    }
    return path;
};
var scriptPathWW = scriptPath();

function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    } else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}


function continueLoadingResources(settings){

    if (settings.IframeWidth != "300")
        IframeWidth = settings.IframeWidth;
    if (settings.IframeHeight != "300")
        IframeHeight = settings.IframeHeight;

    $("#WazeWidget").css("width",settings.IframeWidth);

    settingsView = settings.View;


    if (settings.Modal == "Dropdown"){

        

        function DropDown(el) {
            this.dd = el;
            this.placeholder = this.dd.children('span');
            this.opts = this.dd.find('ul.dropdownWW > li');
            this.val = '';
            this.index = -1;
            this.initEvents();
        }
        DropDown.prototype = {
            initEvents : function() {
                var obj = this;

                obj.dd.on('click', function(event){
                    $(this).toggleClass('active');
                    return false;
                });

                obj.opts.on('click',function(){
                    var opt = $(this);
                    obj.val = opt.text();
                    obj.index = opt.index();
                    obj.placeholder.text(obj.val);
                });
            },
            getValue : function() {
                return this.val;
            },
            getIndex : function() {
                return this.index;
            }
        }

        $(function() {
            var dd = new DropDown( $('#WazeWidgetDiv') );
            $(document).click(function() {
                // all dropdowns
                $('.wrapper-dropdown-3').removeClass('active');
            });
        });

        $("#WazeWidgetDiv ul li a:first").trigger("onclick");//trigger first option to be selected

        if (settings.View == "Compact"){
            applyCompactCssDropdown();
        }//setting.view

    }else   
    if (settings.Modal == "FreeInput"){

        settingsLat=settings.Lat;
        settingsLong=settings.Long;
        settingsInputPlaceHolder=settings.InputPlaceHolder;

        if (settings.View == "Compact"){

            applyCompactCssFreeInput();
           
        }//setting.view


        if (settings.GoogleAPIKey == "")
            GoogleAPIKeyUrl = "https://maps.googleapis.com/maps/api/js?libraries=places";
        else
            GoogleAPIKeyUrl = "https://maps.googleapis.com/maps/api/js?libraries=places&key="+settings.GoogleAPIKey;
            
        $.when($.getScript( GoogleAPIKeyUrl ))
        .then(function() {
            

            if ( detectMobileWW == "true" ){
                $("#WazeWidget").append('<input id="fromInputWW" name="grFrom" class="wd100" placeholder="'+settings.InputPlaceHolder+'" type="text" name="lastname" ><img id="loadImgCA" src="'+scriptPathWW+'/ajax-loader.gif" ><div id="wrapper-demo-iframe-contain"> <iframe id="wazeIframeCA" src="https://embed.waze.com/iframe?zoom=12&lat='+settings.Lat+'&lon='+settings.Long+'&pin=1" width="'+IframeWidth+'" height="'+IframeHeight+'" frameBorder="0" ></iframe><a class="WWImageBottomLink" data-tip="Open in Waze" href="waze://?ll='+settings.Lat+','+settings.Long+'&navigate=yes"><img id="WazeGoButtonImage" src="'+scriptPathWW+'/WazeGoButton.png"></a></div>'); 
                continueLoadingResourcesFirstTime();
            }else{
             if (navigator.geolocation)  //if it has user actual coordinates it will open waze with directions options
                navigator.geolocation.getCurrentPosition(showPositionFreeInputFirstTime, withoutPositionFreeInputFirstTime);

            } 


            
        });//load script 


        

    }else
    if (settings.Modal == "SimpleLocation"){


        settingsLat=settings.Lat;
        settingsLong=settings.Long;

        
        
        if ( detectMobileWW == "true" ){
            $("#WazeWidget").html('<img id="loadImgCA" src="'+scriptPathWW+'/ajax-loader.gif" ><div id="wrapper-demo-iframe-contain"> <iframe id="wazeIframeCA" src="https://embed.waze.com/iframe?zoom=12&lat='+settings.Lat+'&lon='+settings.Long+'&pin=1" width="'+IframeWidth+'" height="'+IframeHeight+'" frameBorder="0" ></iframe><a class="WWImageBottomLink" data-tip="Open in Waze" href="waze://?ll='+settings.Lat+','+settings.Long+'&navigate=yes"><img id="WazeGoButtonImage" src="'+scriptPathWW+'/WazeGoButton.png"></a></div>'); 
            $('#wazeIframeCA').on('load', function(){
                $("#loadImgCA").css("visibility","hidden");
            });
        }else{
         if (navigator.geolocation)  //if it has user actual coordinates it will open waze with directions options
            navigator.geolocation.getCurrentPosition(showPositionSimpleLocation, withoutPositionSimpleLocation);
        } 


    }   
    
}//end continueLoadingResources

function showPositionSimpleLocation(position){
    $("#WazeWidget").html('<img id="loadImgCA" src="'+scriptPathWW+'/ajax-loader.gif" ><div id="wrapper-demo-iframe-contain"> <iframe id="wazeIframeCA" src="https://embed.waze.com/iframe?zoom=12&lat='+settingsLat+'&lon='+settingsLong+'&pin=1" width="'+IframeWidth+'" height="'+IframeHeight+'" frameBorder="0" ></iframe><a class="WWImageBottomLink" data-tip="Open in Waze" href="https://www.waze.com/livemap?zoom=17&lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&from_lat='+position.coords.latitude+'&from_lon='+position.coords.longitude+'&to_lat='+settingsLat+'&to_lon='+settingsLong+'&at_req=0&at_text=Now"><img id="WazeGoButtonImage" src="'+scriptPathWW+'/WazeGoButton.png"></a></div>');
    $('#wazeIframeCA').on('load', function(){
        $("#loadImgCA").css("visibility","hidden");
    });
}
function withoutPositionSimpleLocation(error){
    $("#WazeWidget").html('<img id="loadImgCA" src="'+scriptPathWW+'/ajax-loader.gif" ><div id="wrapper-demo-iframe-contain"> <iframe id="wazeIframeCA" src="https://embed.waze.com/iframe?zoom=12&lat='+settingsLat+'&lon='+settingsLong+'&pin=1" width="'+IframeWidth+'" height="'+IframeHeight+'" frameBorder="0" ></iframe><a class="WWImageBottomLink" data-tip="Open in Waze" href="https://www.waze.com/livemap?zoom=17&lat='+settingsLat+'&lon='+settingsLong+'"><img id="WazeGoButtonImage" src="'+scriptPathWW+'/WazeGoButton.png"></a></div>');
    $('#wazeIframeCA').on('load', function(){
        $("#loadImgCA").css("visibility","hidden");
    });
}


var searchLat='';
var searchLng='';
var settingsLat='';
var settingsLong='';

function continueLoadingResourcesFirstTime(){
    
    var input = document.getElementById('fromInputWW');
            
    var autocomplete = new google.maps.places.Autocomplete(input);
    var searchBox = new google.maps.places.SearchBox(input);


    google.maps.event.addListener(searchBox, 'places_changed', function() {
                
        var urlGet="https://maps.googleapis.com/maps/api/geocode/json?address="+$("#fromInputWW").val();
        
        $.get( urlGet, function( data ) {
          

            $("#loadImgCA").show();
            searchLat = data.results[0].geometry.location.lat;
            searchLng = data.results[0].geometry.location.lng;

            if ( detectMobileWW == "true" ){
                $("#wrapper-demo-iframe-contain").html('<iframe id="wazeIframeCA" src="https://embed.waze.com/iframe?zoom=12&lat='+data.results[0].geometry.location.lat+'&lon='+data.results[0].geometry.location.lng+'&pin=1" width="'+IframeWidth+'" height="'+IframeHeight+'" frameBorder="0" ></iframe><a class="WWImageBottomLink" data-tip="Open in Waze" href="waze://?ll='+data.results[0].geometry.location.lat+','+data.results[0].geometry.location.lng+'"><img src="'+scriptPathWW+'/WazeGoButton.png" style="margin-left: 30px;"></a>');    
                applyCompactCssFreeInput();
            }else{
                 if (navigator.geolocation) { //if it has user actual coordinates it will open waze with directions options
                    navigator.geolocation.getCurrentPosition(showPositionFreeInput, withoutPositionFreeInput);
                    
                } 
                
            }
            
            $('#wazeIframeCA').on('load', function(){
                $("#loadImgCA").css("visibility","hidden");
            });

            applyCompactCssFreeInput();

        });//get

    });

    $('#wazeIframeCA').on('load', function(){
        $("#loadImgCA").css("visibility","hidden");
    });

}
function showPositionFreeInputFirstTime(position){
    $("#WazeWidget").append('<input id="fromInputWW" name="grFrom" class="wd100" placeholder="'+settingsInputPlaceHolder+'" type="text" name="lastname"><img id="loadImgCA" src="'+scriptPathWW+'/ajax-loader.gif" ><div id="wrapper-demo-iframe-contain"> <iframe id="wazeIframeCA" src="https://embed.waze.com/iframe?zoom=12&lat='+settingsLat+'&lon='+settingsLong+'&pin=1" width="'+IframeWidth+'" height="'+IframeHeight+'" frameBorder="0" ></iframe><a class="WWImageBottomLink" data-tip="Open in Waze" href="https://www.waze.com/livemap?zoom=17&lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&from_lat='+position.coords.latitude+'&from_lon='+position.coords.longitude+'&to_lat='+settingsLat+'&to_lon='+settingsLong+'&at_req=0&at_text=Now"><img id="WazeGoButtonImage" src="'+scriptPathWW+'/WazeGoButton.png"></a></div>'); 
    continueLoadingResourcesFirstTime();
}
function withoutPositionFreeInputFirstTime(error){
    $("#WazeWidget").append('<input id="fromInputWW" name="grFrom" class="wd100" placeholder="'+settingsInputPlaceHolder+'" type="text" name="lastname"><img id="loadImgCA" src="'+scriptPathWW+'/ajax-loader.gif" ><div id="wrapper-demo-iframe-contain"> <iframe id="wazeIframeCA" src="https://embed.waze.com/iframe?zoom=12&lat='+settingsLat+'&lon='+settingsLong+'&pin=1" width="'+IframeWidth+'" height="'+IframeHeight+'" frameBorder="0" ></iframe><a class="WWImageBottomLink" data-tip="Open in Waze" href="https://www.waze.com/livemap?zoom=17&lat='+settingsLat+'&lon='+settingsLong+'"><img id="WazeGoButtonImage" src="'+scriptPathWW+'/WazeGoButton.png"></a></div>'); 
    continueLoadingResourcesFirstTime();
}

function showPositionFreeInput(position){
    
    $("#wrapper-demo-iframe-contain").html('<iframe id="wazeIframeCA" src="https://embed.waze.com/iframe?zoom=12&lat='+searchLat+'&lon='+searchLng+'&pin=1" width="'+IframeWidth+'" height="'+IframeHeight+'" frameBorder="0" ></iframe><a class="WWImageBottomLink" data-tip="Open in Waze" href="https://www.waze.com/livemap?zoom=17&lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&from_lat='+position.coords.latitude+'&from_lon='+position.coords.longitude+'&to_lat='+searchLat+'&to_lon='+searchLng+'&at_req=0&at_text=Now"><img id="WazeGoButtonImage" src="'+scriptPathWW+'/WazeGoButton.png"></a>');
    applyCompactCssFreeInput();

}
function withoutPositionFreeInput(error){
    $("#wrapper-demo-iframe-contain").html('<iframe id="wazeIframeCA" src="https://embed.waze.com/iframe?zoom=12&lat='+searchLat+'&lon='+searchLng+'&pin=1" width="'+IframeWidth+'" height="'+IframeHeight+'" frameBorder="0" ></iframe><a class="WWImageBottomLink" data-tip="Open in Waze" href="https://www.waze.com/livemap?zoom=17&lat='+searchLat+'&lon='+searchLng+'"><img id="WazeGoButtonImage" src="'+scriptPathWW+'/WazeGoButton.png"></a>');
    applyCompactCssFreeInput();


}

function applyCompactCssFreeInput() {
    if (settingsView == "Compact"){

        if (!$(".WWImageBottomLink").size()) {
          window.requestAnimationFrame(applyCompactCssFreeInput);
        }else{
             //move element
            $("#fromInputWW").css("position", "absolute");
            $("#fromInputWW").css("top", "20px");
            $("#fromInputWW").css("margin-left", "5px");

            //add background div
            $("#WazeWidget").prepend('<div style="background-color: #93c4d3; width: '+IframeWidth+'px; height: 50px; position: absolute; top: 15px; ">  </div>'); 

            //add class to input
            $( ".WWImageBottomLink" ).addClass( "WWImageBottomLinkCSSClass" );

            //bottom image
            var pathToFileImage=scriptPathWW+'/WazeGoButtonSolo.png';
            $(".WWImageBottomLink img").attr('src', pathToFileImage);
            $(".WWImageBottomLink img").css("width","40px");
            $(".WWImageBottomLink img").css("margin-left","0px");
            $(".WWImageBottomLink img").css("margin-top","19px");
        }
       
    }//setting.view

    
};

function applyCompactCssDropdown() {
    
    if (settingsView == "Compact"){

        if (!$(".WWImageBottomLink").size()) {
          window.requestAnimationFrame(applyCompactCssDropdown);
        }else{
            //move element
            $("#WazeWidgetDiv").css("position", "absolute");
            $("#WazeWidgetDiv").css("top", "20px");
            $("#WazeWidgetDiv").css("margin-left", "5px");

            //add background div
            $("#WazeWidget").prepend('<div style="background-color: #93c4d3; width: '+IframeWidth+'px; height: 50px; position: absolute; top: 15px; ">  </div>'); 

            //add class to input
            $( ".WWImageBottomLink" ).addClass( "WWImageBottomLinkCSSClass" );

            //bottom image
            var pathToFileImage=scriptPathWW+'/WazeGoButtonSolo.png';
            $(".WWImageBottomLink img").attr('src', pathToFileImage);
            $(".WWImageBottomLink img").css("width","40px");
            $(".WWImageBottomLink img").css("margin-left","0px");
            $(".WWImageBottomLink img").css("margin-top","19px");
        }
    }

      
  };



