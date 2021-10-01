/*! (C) 2020 Conviva, Inc. All rights reserved. Confidential and proprietary. */
!function(a,b){if("function"==typeof define&&define.amd?define(b):"object"==typeof exports&&(module.exports=b()),void 0!==a)if(void 0===a.Conviva){if(void 0!==a.ConvivaModule)return
;if(a.ConvivaModuleLoading)return;a.ConvivaModuleLoading=!0,a.ConvivaModule=b(),delete a.ConvivaModuleLoading}else{if(void 0!==a.Conviva.AdProxyMonitor)return;if(a.ConvivaModuleLoading)return
;var c=b();a.ConvivaModuleLoading=!0,a.Conviva.AdProxyMonitor=c.AdProxyMonitor,a.Conviva.Impl.GoogleImaProxy=c.Impl.GoogleImaProxy,delete a.ConvivaModuleLoading}}(this,function(){var a={}
;return function(){"use strict";!function(){a.AdProxyMonitor={_adProxyMonitor:null,release:function(){null!=this._adProxyMonitor&&this._adProxyMonitor.cleanup()},initConvivaDropIn:function(b,c,d,e){
var f="No Ad Manager proxy initialized";if(null!==b)return this._adProxyMonitor=new a.Impl.GoogleImaProxy(b,c,d,e),this._adProxyMonitor;throw new Error(f)}};a.Impl=a.Impl||{}
;var b=a.Impl.GoogleImaProxy=function(a,c,d,e){this.isAdBreakEnabled=!0,this.convivaAdAnalytics=null,this.registerAdsLoaderListeners=function(){var a={}
;if(a[e.Constants.FRAMEWORK_NAME]="Google IMA SDK","undefied"==typeof google||null==google)throw new Error("Google IMA SDK is not accessible");a[e.Constants.FRAMEWORK_VERSION]=""+google.ima.VERSION,
this.convivaAdAnalytics.setAdPlayerInfo(a),void 0!=this.adsLoader&&(this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,this.adsManagerLoaded,!1,this),
this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,this.onAdsLoaderError,!1,this))},this.registerAdsManagerListeners=function(){
this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,this.onAdsManagerError,!1,this)
;var a=[google.ima.AdEvent.Type.AD_BREAK_READY,google.ima.AdEvent.Type.AD_CAN_PLAY,google.ima.AdEvent.Type.AD_METADATA,google.ima.AdEvent.Type.ALL_ADS_COMPLETED,google.ima.AdEvent.Type.CLICK,google.ima.AdEvent.Type.COMPLETE,google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,google.ima.AdEvent.Type.DURATION_CHANGE,google.ima.AdEvent.Type.EXPANDED_CHANGED,google.ima.AdEvent.Type.FIRST_QUARTILE,google.ima.AdEvent.Type.IMPRESSION,google.ima.AdEvent.Type.INTERACTION,google.ima.AdEvent.Type.LINEAR_CHANGED,google.ima.AdEvent.Type.LOADED,google.ima.AdEvent.Type.LOG,google.ima.AdEvent.Type.MIDPOINT,google.ima.AdEvent.Type.PAUSED,google.ima.AdEvent.Type.RESUMED,google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED,google.ima.AdEvent.Type.SKIPPED,google.ima.AdEvent.Type.STARTED,google.ima.AdEvent.Type.THIRD_QUARTILE,google.ima.AdEvent.Type.USER_CLOSE,google.ima.AdEvent.Type.VIEWABLE_IMPRESSION,google.ima.AdEvent.Type.VOLUME_CHANGED,google.ima.AdEvent.Type.VOLUME_MUTED,google.ima.AdError.Type.AD_LOAD,google.ima.AdError.Type.AD_PLAY,google.ima.AdEvent.Type.AD_BUFFERING,google.ima.AdEvent.Type.AD_PROGRESS]
;for(var b in a)this.adsManager.addEventListener(a[b],this.onAdEvent,!1,this)},this.adsManagerLoaded=function(a){this.adsManager=a.getAdsManager(this.adManagerInfo[e.Constants.IMASDK_CONTENT_PLAYER]),
this.registerAdsManagerListeners()},this.onContentPauseRequested=function(a){if(this.allAdsCompleted=!1,this.contentPauseRequested=!0,
null!=this.convivaAdAnalytics&&(this.currentPodIndex=a.getAd().getAdPodInfo().getPodIndex(),this.isAdBreakEnabled)){this.podDuration=a.getAd().getAdPodInfo().getMaxDuration(),
0===this.currentPodIndex?this.podPosition="Pre-roll":-1===this.currentPodIndex?this.podPosition="Post-roll":this.podPosition="Mid-roll";var b={};b[e.Constants.POD_POSITION]=this.podPosition,
b[e.Constants.POD_DURATION]=this.podDuration,b[e.Constants.POD_INDEX]=this.podIndex,this.convivaAdAnalytics.reportAdBreakStarted(e.Constants.AdType.CLIENT_SIDE,e.Constants.AdPlayer.CONTENT,b),
this.podStartSent=!0}},this.onContentResumeRequested=function(a){this.allAdsCompleted=!1,
null!=this.convivaAdAnalytics&&this.isAdBreakEnabled&&this.podStartSent&&(this.convivaAdAnalytics.reportAdBreakEnded(),this.podStartSent=!1,this.podIndex++,this.podPosition=null),
this.contentPauseRequested=!1},this.onAdEvent=function(a){a.type==google.ima.AdEvent.Type.LOADED&&!0===a.getAd().isLinear()&&0==this.adManagerInfo[e.Constants.AD_PRELOAD_FEATURE]?(this.onAdStart(a),
this.convivaAdAnalytics.reportAdMetric(e.Constants.Playback.PLAYER_STATE,e.Constants.PlayerState.BUFFERING)):a.type==google.ima.AdEvent.Type.STARTED&&!0===a.getAd().isLinear()?this.onAdStart(a):a.type==google.ima.AdEvent.Type.RESUMED&&!0===a.getAd().isLinear()?null!=this.convivaAdAnalytics&&this.convivaAdAnalytics.reportAdMetric(e.Constants.Playback.PLAYER_STATE,e.Constants.PlayerState.PLAYING):a.type==google.ima.AdEvent.Type.PAUSED&&!0===a.getAd().isLinear()?null!=this.convivaAdAnalytics&&this.convivaAdAnalytics.reportAdMetric(e.Constants.Playback.PLAYER_STATE,e.Constants.PlayerState.PAUSED):a.type==google.ima.AdEvent.Type.COMPLETE&&!0===a.getAd().isLinear()?null!=this.convivaAdAnalytics&&(this.convivaAdAnalytics.reportAdMetric(e.Constants.Playback.PLAYER_STATE,e.Constants.PlayerState.STOPPED),
this.convivaAdAnalytics.reportAdEnded()):a.type==google.ima.AdEvent.Type.SKIPPED&&!0===a.getAd().isLinear()?null!=this.convivaAdAnalytics&&(this.convivaAdAnalytics.reportAdMetric(e.Constants.Playback.PLAYER_STATE,e.Constants.PlayerState.STOPPED),
this.convivaAdAnalytics.reportAdSkipped()):a.type==google.ima.AdEvent.Type.ALL_ADS_COMPLETED?this.allAdsCompleted=!0:a.type==google.ima.AdEvent.Type.LOG?this.onAdLogError(a):a.type==google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED?this.onContentPauseRequested(a):a.type==google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED?this.onContentResumeRequested(a):a.type==google.ima.AdEvent.Type.AD_BUFFERING?null!=this.convivaAdAnalytics&&this.convivaAdAnalytics.reportAdMetric(e.Constants.Playback.PLAYER_STATE,e.Constants.PlayerState.BUFFERING):a.type==google.ima.AdEvent.Type.AD_PROGRESS&&null!=this.convivaAdAnalytics&&this.convivaAdAnalytics.reportAdMetric(e.Constants.Playback.PLAYER_STATE,e.Constants.PlayerState.PLAYING)
},this.onAdStart=function(a){if(null!=this.convivaAdAnalytics){var b=this.getConvivaAdMetadata(a.getAd());this.convivaAdAnalytics.reportAdStarted(b),
this.convivaAdAnalytics.reportAdMetric(e.Constants.Playback.RESOLUTION,a.getAd().getVastMediaWidth(),a.getAd().getVastMediaHeight()),
this.convivaAdAnalytics.reportAdMetric(e.Constants.Playback.BITRATE,a.getAd().getVastMediaBitrate())}},this.onAdsLoaderError=function(a){var b=a.getError();this.reportAdFailed(b,"Ads Loader Error")},
this.onAdsManagerError=function(a){var b=a.getError();this.handleAdError(b)},this.onAdLogError=function(a){var b=a.getAdData();b.adError},this.getConvivaAdMetadata=function(a){var c={}
;c[e.Constants.MODULE_NAME]="Google IMA",c[e.Constants.MODULE_VERSION]=b.version,c[e.Constants.ASSET_NAME]=a.getTitle(),c[e.Constants.STREAM_URL]=a.getMediaUrl(),
c[e.Constants.DURATION]=a.getDuration(),c[e.Constants.IS_LIVE]=e.Constants.StreamType.VOD;var d,f,g;if(a.getWrapperAdIds()&&0!==a.getWrapperAdIds().length){var h=a.getWrapperAdIds().length
;d=a.getWrapperAdSystems()[h-1],f=a.getWrapperAdIds()[h-1],g=a.getWrapperCreativeIds()[h-1]}else d=a.getAdSystem(),f=a.getAdId(),g=a.getCreativeId();var i,j=a.getAdPodInfo().getPodIndex()
;return i=0===j?"Pre-roll":-1===j?"Post-roll":"Mid-roll",c["c3.ad.id"]=""+a.getAdId(),c["c3.ad.creativeId"]=""+a.getCreativeId(),c["c3.ad.technology"]="Client Side",
c["c3.ad.system"]=""+a.getAdSystem(),c["c3.ad.sequence"]=""+a.getAdPodInfo().getAdPosition(),c["c3.ad.mediaFileApiFramework"]=""+a.getApiFramework(),c["c3.ad.advertiser"]=""+a.getAdvertiserName(),
c["c3.ad.position"]=i,c["c3.ad.adManagerName"]="Google IMA SDK",c["c3.ad.adManagerVersion"]=""+google.ima.VERSION,c["c3.ad.firstAdSystem"]=""+d,c["c3.ad.firstAdId"]=""+f,
c["c3.ad.firstCreativeId"]=""+g,
c["c3.ad.univAdIdReg"]=void 0===a.getUniversalAdIds()||0==a.getUniversalAdIds().length||a.getUniversalAdIds().length>0&&void 0===a.getUniversalAdIds()[0].getAdIdRegistry()||a.getUniversalAdIds().length>0&&"unknown"==a.getUniversalAdIds()[0].getAdIdRegistry()?"NA":""+a.getUniversalAdIds()[0].getAdIdRegistry(),
c["c3.ad.univAdIdVal"]=void 0===a.getUniversalAdIds()||0==a.getUniversalAdIds().length||a.getUniversalAdIds().length>0&&void 0===a.getUniversalAdIds()[0].getAdIdValue()||a.getUniversalAdIds().length>0&&"unknown"==a.getUniversalAdIds()[0].getAdIdValue()?"NA":""+a.getUniversalAdIds()[0].getAdIdValue(),
c},this.handleAdError=function(a){if(a){switch(a.getType()){case google.ima.AdError.Type.AD_PLAY:this.handleAdPlayError(a);break;case google.ima.AdError.Type.AD_LOAD:this.handleAdLoadError(a)}}},
this.handleAdPlayError=function(a){this.reportAdFailed(a,"Ad Play Error")},this.handleAdLoadError=function(a){this.reportAdFailed(a,"Ad Load Error")},this.reportAdFailed=function(a,b){var c
;a.getType&&"function"==typeof a.getType&&a.getType()&&(c="Type: "+a.getType()),
a.getType&&"function"==typeof a.getErrorCode&&a.getErrorCode()&&(void 0==c?c="Code: "+a.getErrorCode():c+=", Code: "+a.getErrorCode()),
a.getMessage&&"function"==typeof a.getMessage&&a.getMessage()&&(void 0==c?c="Message: "+a.getMessage():c+=", Message: "+a.getMessage()),void 0==c&&(c=a.toString()||"Ad Request Failed");var d={}
;d[e.Constants.ASSET_NAME]=b,d[e.Constants.IS_LIVE]=e.Constants.StreamType.VOD,d["c3.ad.technology"]="Client Side",d["c3.ad.adManagerName"]="Google IMA SDK",
d["c3.ad.adManagerVersion"]=""+google.ima.VERSION,this.convivaAdAnalytics.reportAdFailed(c,d)},this.adsLoader=a,this.adManagerInfo=c,this.adsManager=null,this.convivaAdAnalytics=d,this.podIndex=1,
this.podPosition=null,this.registerAdsLoaderListeners(),this.currentPodIndex=0,this.cleanup=function(){this.adsLoader=null,this.adManagerInfo=null,this.adsManager=null}};b.version="4.0.3"}()}(),a});