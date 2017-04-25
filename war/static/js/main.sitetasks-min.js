function addTaskAndRefresh(webCrawlerId,siteId){if(siteId!=null){jsonrpc.siteTasksService.query(function(result,exception,profile){if(exception||result==null){return}var jsonData=eval("("+result+")");addSiteJsonData(jsonData);createSiteTaskNode(webCrawlerId,jsonData.id,jsonData.name);bindEvent()},webCrawlerId,siteId)}}var siteTask={v:{jsonData:null,webCrawlerId:null,siteId:null},fn:{init:function(a){siteTask.v.jsonData=siteJsonData;siteTask.v.webCrawlerId=webCrawlerId;siteTask.v.siteId=siteId;this.hideAdvancedSettings(a);siteTask.fn.initSlider(a,0);fillQueue(a,"queueName",true,"sync_count",function(){fillQueue(a,"deployQueueName",true,"sync_count")});if(a=="siteEditForm"){fillUrlCheck(a,"urlCheckId",true,"sync_count")}else{$("#"+a).find("#urlCheckId").prop("disabled",true);$("#"+a).find("#urlCheckId").addClass("gray");$("#"+a).find("#urlCheckId").parent().find(".configBox").addClass("configBox-disabled").removeClass("configBox")}fillHttpRequest(a,"httpRequestId",true,"sync_count");fillCustomPlugin("1",a,"urlfetchPluginId",true,"sync_count");fillSite(a,"urlOriginSiteId",true);if(siteId!=null&&siteId!=""&&siteId!="undefined"){$("#"+a).find("select[id=urlOriginSiteId] option[value='"+siteId+"']").remove()}$("#"+a).find("select[id=updateMode]").change(function(){var b=$(this).val();if(b!=null&&b=="1"){$("#"+a).find("#isRepeat").prop("checked",true).prop("disabled",true);$("#"+a).find("#isLoop").prop("checked",true).prop("disabled",true);$("#"+a).find("#isRepeatData").prop("checked",false).prop("disabled",true);$("#"+a).find("#isNotSaveRepeatData").prop("checked",true).prop("disabled",true)}else{if(b!=null&&b=="2"){$("#"+a).find("#isRepeat").prop("checked",true).prop("disabled",true);$("#"+a).find("#isLoop").prop("checked",true).prop("disabled",true);$("#"+a).find("#isRepeatData").prop("checked",true).prop("disabled",true);$("#"+a).find("#isNotSaveRepeatData").prop("checked",true).prop("disabled",true)}else{$("#"+a).find("#isRepeat").prop("checked",false).prop("disabled",false);$("#"+a).find("#isLoop").prop("checked",false).prop("disabled",false);$("#"+a).find("#isRepeatData").prop("checked",false).prop("disabled",false);$("#"+a).find("#isNotSaveRepeatData").prop("checked",false).prop("disabled",false)}}});$("#"+a).find("input[id=autoInterval]").change(function(){if(this.checked){$("#"+a).find(".intervalN").hide();$("#"+a).find(".intervalY").show()}else{$("#"+a).find(".intervalN").show();$("#"+a).find(".intervalY").hide()}})},initSlider:function(b,a){$("#"+b).find("#delaySlider").slider({range:"min",min:0,max:60,value:a,slide:function(c,d){$("#"+b).find("#delay").val(d.value)}});$("#"+b).find("#delay").val($("#"+b).find("#delaySlider").slider("value"))},hideAdvancedSettings:function(a){$("#"+a).find("#advanced-settings-expander").val(nc.i18n("res.advanced.display.block"));$("#"+a).find("#advanced-settings-expander").unbind("click");$("#"+a).find("#advanced-settings-expander").click(function(){siteTask.fn.showAdvancedSettings(a)});$("#"+a).find(".advanced-settings").each(function(){$(this).css({display:"none"})})},showAdvancedSettings:function(a){$("#"+a).find("#advanced-settings-expander").val(nc.i18n("res.advanced.display.none"));$("#"+a).find("#advanced-settings-expander").unbind("click");$("#"+a).find("#advanced-settings-expander").click(function(){siteTask.fn.hideAdvancedSettings(a)});$("#"+a).find(".advanced-settings").each(function(){$(this).css({display:""})})},chooseShow:function(b,a){var e=b.checked;var d="none";if(e){d="block"}var c=$(b).closest("form");var f=c.attr("id");$("#"+f).find("#"+a).css({display:d})},create:function(F){var G=$("#"+F).find("#name").val();var h=$("#"+F).find("#url").val();var y=$("#"+F).find("#desc").val();var e=$("#"+F).find("#maxSize").val();var z=$("#"+F).find("#expiredDaysUrl").val();var p=$("#"+F).find("#urlCheckId").val();var k=$("#"+F).find("#crawlNumLimit").val();var u=$("#"+F).find("#maxCrawlQueueLimit").val();var a=$("#"+F).find("#urlCheckRegex").val();var g=$("#"+F).find("#skipRows").val();var f=getCheckbox(F,"newDataInEndPage");var l=getCheckbox(F,"isAuto");var B=getCheckbox(F,"isRepeat");var w=getCheckbox(F,"isRepeatData");var E=getCheckbox(F,"isLoop");var n=getCheckbox(F,"isMerge");var m=getCheckbox(F,"isReverse");var C=getCheckbox(F,"isRealtimeCrawl");var r=getCheckbox(F,"isNotSaveData");var v=getCheckbox(F,"isNotSaveRepeatData");var q=$("#"+F).find("#urlfetchPluginId").val();var d=$("#"+F).find("#httpRequestId").val();var c=$("#"+F).find("#queueName").val();var t=$("#"+F).find("#deployQueueName").val();var i=$("#"+F).find("#urlOriginSiteId").val();var x=$("#"+F).find("#updateMode").val();var b=$("#"+F).find("#sessionMode").val();var D=$("#"+F).find("#delay").val();var j=$("#"+F).find("input[id=autoInterval]").is(":checked");var A=$("#"+F).find("#interval").val();var o=$("#"+F).find("#intervalMin").val();var s=$("#"+F).find("#intervalMax").val();if(!IsURL(h)){showInfo(nc.i18n("res.site.url.invalid"));return}showLoading($("#"+F));jsonrpc.siteTasksService.create(function(H,I,J){removeLoading($("#"+F));if(I){return}var K=H;if(!isNum(K)){showInfo(nc.i18n("res.create.failure"));return}siteTask.fn.addJson(F,K);createSiteTaskNode(siteTask.v.webCrawlerId,K,G);bindEvent();updateSelect(K,G,"nestedSiteId");showInfo(nc.i18n("res.create.success"))},siteTask.v.webCrawlerId,G,h,y,e,l,B,w,E,n,m,z,C,k,a,r,v,q,d,c,t,i,u,x,p,b,D,j,A,o,s,f,g)},edit:function(e){var f=siteTask.v.jsonData;for(var c in f){if(isNaN(c)){continue}if(f[c]["id"]!=siteTask.v.siteId){continue}$("#"+e).find("#id").val(f[c]["id"]);$("#"+e).find("#name").val(f[c]["name"]);$("#"+e).find("#url").val(f[c]["url"]);$("#"+e).find("#desc").val(f[c]["desc"]);$("#"+e).find("#maxSize").val(f[c]["maxSize"]);$("#"+e).find("#skipRows").val(f[c]["skipRows"]);$("#"+e).find("#expiredDaysUrl").val(f[c]["expiredDaysUrl"]==null?"0":f[c]["expiredDaysUrl"]);$("#"+e).find("#urlCheckId").val(f[c]["urlCheckId"]);$("#"+e).find("#crawlNumLimit").val(f[c]["crawlNumLimit"]==null?"0":f[c]["crawlNumLimit"]);$("#"+e).find("#maxCrawlQueueLimit").val(f[c]["maxCrawlQueueLimit"]==null?"0":f[c]["maxCrawlQueueLimit"]);$("#"+e).find("#urlCheckRegex").val(f[c]["urlCheckRegex"]==null?"":f[c]["urlCheckRegex"]);selectCheckbox(e,"newDataInEndPage",f[c]["newDataInEndPage"]);selectCheckbox(e,"isAuto",f[c]["isAuto"]);selectCheckbox(e,"isRepeat",f[c]["isRepeat"]);selectCheckbox(e,"isRepeatData",f[c]["isRepeatData"]);selectCheckbox(e,"isLoop",f[c]["isLoop"]);selectCheckbox(e,"isMerge",f[c]["isMerge"]);selectCheckbox(e,"isRealtimeCrawl",f[c]["isRealtimeCrawl"]);selectCheckbox(e,"isReverse",f[c]["isReverse"]);selectCheckbox(e,"isNotSaveData",f[c]["isNotSaveData"]);selectCheckbox(e,"isNotSaveRepeatData",f[c]["isNotSaveRepeatData"]);$("#"+e).find("#httpRequestId").val(f[c]["httpRequestId"]);$("#"+e).find("#urlfetchPluginId").val(f[c]["urlfetchPluginId"]);$("#"+e).find("#sessionMode").val(f[c]["sessionMode"]);$("#"+e).find("#urlOriginSiteId").val(f[c]["urlOriginSiteId"]);$("#"+e).find("#updateMode").val(f[c]["updateMode"]);if(f[c]["updateMode"]!=null&&f[c]["updateMode"]!=""){$("#"+e).find("#updateMode").change()}var b=f[c]["delay"];siteTask.fn.initSlider(e,b);var d=f[c]["queueName"];if(d==null||d==""){d="R5"}$("#"+e).find("#queueName").val(d);var a=f[c]["deployQueueName"];if(a==null||a==""){a="R4"}$("#"+e).find("#deployQueueName").val(a);if(f[c]["autoInterval"]!=null){$("#"+e).find("input[id=autoInterval]").prop("checked",f[c]["autoInterval"]);$("#"+e).find("input[id=autoInterval]").change();$("#"+e).find("#interval").val(f[c]["interval"]);$("#"+e).find("#intervalMin").val(f[c]["intervalMin"]);$("#"+e).find("#intervalMax").val(f[c]["intervalMax"])}return}},update:function(G){var u=$("#"+G).find("#id").val();if(u==null||u.length==0){showInfo(nc.i18n("res.site.select"));return}var H=$("#"+G).find("#name").val();var h=$("#"+G).find("#url").val();var z=$("#"+G).find("#desc").val();var e=$("#"+G).find("#maxSize").val();var g=$("#"+G).find("#skipRows").val();var A=$("#"+G).find("#expiredDaysUrl").val();var p=$("#"+G).find("#urlCheckId").val();var k=$("#"+G).find("#crawlNumLimit").val();var v=$("#"+G).find("#maxCrawlQueueLimit").val();var a=$("#"+G).find("#urlCheckRegex").val();var f=getCheckbox(G,"newDataInEndPage");var l=getCheckbox(G,"isAuto");var C=getCheckbox(G,"isRepeat");var x=getCheckbox(G,"isRepeatData");var F=getCheckbox(G,"isLoop");var n=getCheckbox(G,"isMerge");var m=getCheckbox(G,"isReverse");var D=getCheckbox(G,"isRealtimeCrawl");var r=getCheckbox(G,"isNotSaveData");var w=getCheckbox(G,"isNotSaveRepeatData");var d=$("#"+G).find("#httpRequestId").val();var q=$("#"+G).find("#urlfetchPluginId").val();var c=$("#"+G).find("#queueName").val();var t=$("#"+G).find("#deployQueueName").val();var i=$("#"+G).find("#urlOriginSiteId").val();var y=$("#"+G).find("#updateMode").val();var b=$("#"+G).find("#sessionMode").val();var E=$("#"+G).find("#delay").val();var j=$("#"+G).find("input[id=autoInterval]").is(":checked");var B=$("#"+G).find("#interval").val();var o=$("#"+G).find("#intervalMin").val();var s=$("#"+G).find("#intervalMax").val();showLoading($("#"+G));jsonrpc.siteTasksService.update(function(I,J,K){removeLoading($("#"+G));if(J){return}var L=I;if(L){siteTask.fn.updateJson(G);updateSiteTaskNode(siteTask.v.webCrawlerId,u,H);updateSelect(u,H,"nestedSiteId");siteTask.fn.updateOtherRules(u);showInfo(nc.i18n("res.update.success"))}else{showInfo(nc.i18n("res.update.failure"))}},siteTask.v.webCrawlerId,u,H,h,z,e,l,C,x,F,n,m,A,D,k,a,r,w,q,d,c,t,i,v,y,p,b,E,j,B,o,s,f,g)},updateOtherRules:function(c){var b=siteTask.v.jsonData;for(var a in b){if(isNaN(a)){continue}if(b[a]["id"]==c){$("#crawlRulesTable").find("#crawlUrl").val(b[a]["url"]);if(!(b[a]["isLoop"]=="Y"&&b[a]["isMerge"]=="Y")){$("#crawlRulesTable").find(".mergeRules").css("display","none")}break}}},addJson:function(b,c){var a={id:c,name:$("#"+b).find("#name").val(),url:$("#"+b).find("#url").val(),desc:$("#"+b).find("#desc").val(),maxSize:$("#"+b).find("#maxSize").val(),skipRows:$("#"+b).find("#skipRows").val(),expiredDaysUrl:$("#"+b).find("#expiredDaysUrl").val(),urlCheckId:$("#"+b).find("#urlCheckId").val(),crawlNumLimit:$("#"+b).find("#crawlNumLimit").val(),maxCrawlQueueLimit:$("#"+b).find("#maxCrawlQueueLimit").val(),urlCheckRegex:$("#"+b).find("#urlCheckRegex").val(),newDataInEndPage:getCheckbox(b,"newDataInEndPage"),isAuto:getCheckbox(b,"isAuto"),isRepeat:getCheckbox(b,"isRepeat"),isRepeatData:getCheckbox(b,"isRepeatData"),isLoop:getCheckbox(b,"isLoop"),isMerge:getCheckbox(b,"isMerge"),isReverse:getCheckbox(b,"isReverse"),isRealtimeCrawl:getCheckbox(b,"isRealtimeCrawl"),isNotSaveData:getCheckbox(b,"isNotSaveData"),isNotSaveRepeatData:getCheckbox(b,"isNotSaveRepeatData"),httpRequestId:$("#"+b).find("#httpRequestId").val(),queueName:$("#"+b).find("#queueName").val(),deployQueueName:$("#"+b).find("#deployQueueName").val(),urlfetchPluginId:$("#"+b).find("#urlfetchPluginId").val(),urlOriginSiteId:$("#"+b).find("#urlOriginSiteId").val(),sessionMode:$("#"+b).find("#sessionMode").val(),delay:$("#"+b).find("#delay").val(),updateMode:$("#"+b).find("#updateMode").val(),autoInterval:$("#"+b).find("input[id=autoInterval]").is(":checked"),interval:$("#"+b).find("#interval").val(),intervalMin:$("#"+b).find("#intervalMin").val(),intervalMax:$("#"+b).find("#intervalMax").val()};addSiteJsonData(a)},updateJson:function(b){var d=$("#id").val();var c=siteTask.v.jsonData;for(var a in c){if(isNaN(a)){continue}if(c[a]["id"]!=siteTask.v.siteId){continue}c[a]["name"]=$("#"+b).find("#name").val();c[a]["url"]=$("#"+b).find("#url").val();c[a]["desc"]=$("#"+b).find("#desc").val();c[a]["maxSize"]=$("#"+b).find("#maxSize").val();c[a]["skipRows"]=$("#"+b).find("#skipRows").val();c[a]["expiredDaysUrl"]=$("#"+b).find("#expiredDaysUrl").val();c[a]["urlCheckId"]=$("#"+b).find("#urlCheckId").val();c[a]["crawlNumLimit"]=$("#"+b).find("#crawlNumLimit").val();c[a]["maxCrawlQueueLimit"]=$("#"+b).find("#maxCrawlQueueLimit").val();c[a]["urlCheckRegex"]=$("#"+b).find("#urlCheckRegex").val();c[a]["newDataInEndPage"]=getCheckbox(b,"newDataInEndPage");c[a]["isAuto"]=getCheckbox(b,"isAuto");c[a]["isRepeat"]=getCheckbox(b,"isRepeat");c[a]["isRepeatData"]=getCheckbox(b,"isRepeatData");c[a]["isLoop"]=getCheckbox(b,"isLoop");c[a]["isMerge"]=getCheckbox(b,"isMerge");c[a]["isReverse"]=getCheckbox(b,"isReverse");c[a]["isRealtimeCrawl"]=getCheckbox(b,"isRealtimeCrawl");c[a]["isNotSaveData"]=getCheckbox(b,"isNotSaveData");c[a]["isNotSaveRepeatData"]=getCheckbox(b,"isNotSaveRepeatData");c[a]["httpRequestId"]=$("#"+b).find("#httpRequestId").val();c[a]["queueName"]=$("#"+b).find("#queueName").val();c[a]["deployQueueName"]=$("#"+b).find("#deployQueueName").val();c[a]["urlfetchPluginId"]=$("#"+b).find("#urlfetchPluginId").val();c[a]["urlOriginSiteId"]=$("#"+b).find("#urlOriginSiteId").val();c[a]["updateMode"]=$("#"+b).find("#updateMode").val();c[a]["sessionMode"]=$("#"+b).find("#sessionMode").val();c[a]["delay"]=$("#"+b).find("#delay").val();c[a]["autoInterval"]=$("#"+b).find("input[id=autoInterval]").is(":checked"),c[a]["interval"]=$("#"+b).find("#interval").val(),c[a]["intervalMin"]=$("#"+b).find("#intervalMin").val(),c[a]["intervalMax"]=$("#"+b).find("#intervalMax").val();return}},remove:function(a){var b=$("#"+a).find("#id").val();if(b==null||b.length==0){showInfo(nc.i18n("res.site.select"));return}if(!confirm(nc.i18n("res.remove.confirm"))){return}showLoading($("#"+a));jsonrpc.siteTasksService.removeCheck(function(c,d,e){var f=c;if(f!="success"){if(!confirm(nc.i18n("res.remove.confirm2",f))){removeLoading($("#"+a));return}}jsonrpc.siteTasksService.remove(function(g,h,i){removeLoading($("#"+a));if(h){return}f=g;if(f){removeSiteTaskNode(siteTask.v.webCrawlerId,b);removeSelectForm(a,b,"nestedSiteId");removeSelectForm("deployForm",b,"siteIdByURL");removeSelectForm("jsDependForm",b,"siteId");removeSelectForm("siteCreateForm",b,"urlOriginSiteId");removeSelectForm("urlCheckForm",b,"urlOriginSiteId");showInfo(nc.i18n("res.remove.success"))}else{showInfo(nc.i18n("res.remove.failure"))}},siteTask.v.webCrawlerId,b)},siteTask.v.webCrawlerId,b)},resetCache:function(a){var b=$("#"+a).find("#id").val();if(b==null||b.length==0){showInfo(nc.i18n("res.site.select"));return}jsonrpc.siteTasksService.resetCache(function(c,d,e){if(d){return}var f=c;if(f){showInfo(nc.i18n("res.reset.mem.success"))}else{showInfo(f)}},siteTask.v.webCrawlerId,b)},autoCrawl:function(){if(siteTask.v.siteId==null){showInfo(nc.i18n("res.site.select"));return}jsonrpc.siteCrawlTestService.crawlData(function(a,b,c){if(b){return}var d=a;if(d!=undefined){showInfo(d)}},siteTask.v.webCrawlerId,siteTask.v.siteId)}}};