/*!
 * JSVEE - JavaScript Visual Execution Environment Library
 * (c) Teemu Sirkiä and Aalto University, 2014 
 * Licensed under MIT license 
 * 
 * Compiled at: 2015-02-17 14:46
 */
'use strict';(function($){if(window.JSVEE===undefined){return}JSVEE.handlers.global=function(ready,area,element,params){if(element.hasClass("jsvee-operator")){if(element.attr("data-type")=="n"){ready();return}if(element.attr("data-type")=="p"&&element.attr("data-name")=="int"){ready(JSVEE.utils.ui.findOrCreateValue(area,Math.floor(element.find(".jsvee-value").first().text()),"int"));
return}else{if(element.attr("data-type")=="p"&&element.attr("data-name")=="double"){ready(JSVEE.utils.ui.findOrCreateValue(area,(+element.find(".jsvee-value").first().text()).toFixed(1),"double"));return}else{if(element.attr("data-type")=="r"){var result=eval(element.text()+params[0].text());ready(JSVEE.utils.ui.findOrCreateValue(area,result,params[0].attr("data-type")));return}}}var p1=(params[0].attr("data-type")=="str"||params[0].attr("data-type")=="char")?'"'+params[0].text()+'"':params[0].text();
var p2=(params[1].attr("data-type")=="str"||params[1].attr("data-type")=="char")?'"'+params[1].text()+'"':params[1].text();if(params[0].attr("data-type")=="bool"){p1=p1.toLowerCase()}if(params[1].attr("data-type")=="bool"){p2=p2.toLowerCase()}var op=element.text();if(op=="and"){op="&&"}if(op=="or"){op="||"}var result=eval(p1+" "+op+" "+p2);if(element.text()=="/"&&params[0].attr("data-type")=="int"&&params[1].attr("data-type")=="int"){result=~~result}var dataType=params[0].attr("data-type");if(params[0].attr("data-type")=="String"||params[1].attr("data-type")=="String"){dataType="String"
}if(typeof result==="boolean"){dataType="bool";result=result.toString().charAt(0).toUpperCase()+result.toString().slice(1)}var newElement=JSVEE.utils.ui.findOrCreateValue(area,result,dataType);ready(newElement)}else{if(element.hasClass("jsvee-function")&&(element.attr("data-name")==="System.out.println"||element.attr("data-name")==="System.out.print")||element.attr("data-name")==="println"||element.attr("data-name")==="print"){var str="";$.each(element.find(".jsvee-value"),function(i){if(i>0){str+=" "
}if($(this).attr("data-type")=="bool"){str+=$(this).text().charAt(0).toUpperCase()+$(this).text().slice(1)}else{str+=$(this).text()}});if(element.find(".jsvee-value").first().attr("data-type")==="Rectangle"){var rectangle=JSVEE.utils.ui.findValueById(area,element.find(".jsvee-value").eq(0).attr("data-id"));var val1=rectangle.find(".jsvee-value").eq(0).text();var val2=rectangle.find(".jsvee-value").eq(1).text();var val3=rectangle.find(".jsvee-value").eq(2).text();var val4=rectangle.find(".jsvee-value").eq(3).text();
str="java.awt.Rectangle[x="+val1+",y="+val2+",width="+val3+",height="+val4+"]"}if(element.find(".jsvee-value").first().attr("data-type")==="list"){var arrayList=JSVEE.utils.ui.findValueById(area,element.find(".jsvee-value").eq(0).attr("data-id"));var values=[];arrayList.find(".jsvee-value").each(function(){values.push($(this).text())});str="["+values.join(", ")+"]"}var console=area.find(".jsvee-console");if(element.attr("data-name")==="System.out.println"||element.attr("data-name")==="println"||element.attr("data-name")==="print"){console.text(console.text()+str+"\n")
}else{console.text(console.text()+str)}ready()}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")==="len"){if(!element.find(".jsvee-value").hasClass("jsvee-ref")){var result=element.find(".jsvee-value").first().text().length;var newElement=JSVEE.utils.ui.findOrCreateValue(area,result,"int");ready(newElement)}else{var result=element.find(".jsvee-value").first();var actualElement=JSVEE.utils.ui.findValueById(area,result.attr("data-id"));var newElement=JSVEE.utils.ui.findOrCreateValue(area,actualElement.find(".jsvee-value").length,"int");
ready(newElement)}}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")==="append"&&element.attr("data-class")==="list"){var params=element.find(".jsvee-value");var list=JSVEE.utils.ui.findValueById(area,params.eq(0).attr("data-id"));list.append(params.eq(1).clone());ready()}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")==="toString"&&element.attr("data-class")==="Double"){var result=element.find(".jsvee-value").first().text();var newElement=JSVEE.utils.ui.findOrCreateValue(area,result,"String");
ready(newElement)}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")==="indexOf"&&element.attr("data-class")==="String"){var param=element.find(".jsvee-value").eq(1).text();var result=element.find(".jsvee-value").first().text().indexOf(param);var newElement=JSVEE.utils.ui.findOrCreateValue(area,result,"int");ready(newElement)}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")==="replace"&&element.attr("data-class")==="String"){var param1=element.find(".jsvee-value").eq(0).text();
var param2=element.find(".jsvee-value").eq(1).text();var param3=element.find(".jsvee-value").eq(2).text();var result=param1.replace(param2,param3);var newElement=JSVEE.utils.ui.findOrCreateValue(area,result,"String");ready(newElement)}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")==="Rectangle"&&element.attr("data-class")==="Rectangle"){var params=element.find(".jsvee-value");var rectangle=JSVEE.utils.ui.findValueById(area,params.eq(0).attr("data-id"));var i=1;for(i=1;i<params.length;
i++){var field=rectangle.find(".jsvee-variable").eq(i-1);field.find(".jsvee-value").remove();params.eq(i).clone().appendTo(field)}var newElement=JSVEE.utils.ui.createReference(area,params.eq(0).attr("data-id"));ready(newElement)}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")==="getWidth"&&element.attr("data-class")==="Rectangle"){var params=element.find(".jsvee-value");var rectangle=JSVEE.utils.ui.findValueById(area,params.eq(0).attr("data-id"));var field=rectangle.find(".jsvee-variable").eq(2).find(".jsvee-value").text();
var newElement=JSVEE.utils.ui.findOrCreateValue(area,field+".0","double").clone();ready(newElement)}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")==="getX"&&element.attr("data-class")==="Rectangle"){var params=element.find(".jsvee-value");var rectangle=JSVEE.utils.ui.findValueById(area,params.eq(0).attr("data-id"));var field=rectangle.find(".jsvee-variable").eq(0).find(".jsvee-value").text();var newElement=JSVEE.utils.ui.findOrCreateValue(area,field+".0","double").clone();ready(newElement)
}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")==="getY"&&element.attr("data-class")==="Rectangle"){var params=element.find(".jsvee-value");var rectangle=JSVEE.utils.ui.findValueById(area,params.eq(0).attr("data-id"));var field=rectangle.find(".jsvee-variable").eq(1).find(".jsvee-value").text();var newElement=JSVEE.utils.ui.findOrCreateValue(area,field+".0","double").clone();ready(newElement)}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")==="translate"&&element.attr("data-class")==="Rectangle"){var params=element.find(".jsvee-value");
var rectangle=JSVEE.utils.ui.findValueById(area,params.eq(0).attr("data-id"));var fields=rectangle.find(".jsvee-variable");var dx=+params.eq(1).text();var dy=+params.eq(2).text();var curX=+fields.eq(0).find(".jsvee-value").first().text();var curY=+fields.eq(1).find(".jsvee-value").first().text();var newX=JSVEE.utils.ui.findOrCreateValue(area,curX+dx,"int").clone();var newY=JSVEE.utils.ui.findOrCreateValue(area,curY+dy,"int").clone();fields.eq(0).find(".jsvee-value").first().replaceWith(newX);fields.eq(1).find(".jsvee-value").first().replaceWith(newY);
ready()}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")==="abs"){var param1=element.find(".jsvee-value").eq(0).text();var newElement=JSVEE.utils.ui.findOrCreateValue(area,Math.abs(parseInt(param1,10)),"int");ready(newElement)}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")==="max"){var param1=element.find(".jsvee-value").eq(0).text();var param2=element.find(".jsvee-value").eq(1).text();var newElement=JSVEE.utils.ui.findOrCreateValue(area,Math.max(parseInt(param1,10),parseInt(param2,10)),"int");
ready(newElement)}else{ready()}}}}}}}}}}}}}}};JSVEE.handlers.classes.ArrayList=function(ready,area,element){if(element.hasClass("jsvee-function")&&element.attr("data-name")=="add"){var buffer=area.find('.jsvee-heap .jsvee-instance[data-id="'+element.find(".jsvee-value").eq(0).attr("data-id")+'"]').first();if(element.find(".jsvee-value").length==2){element.find(".jsvee-value").eq(1).clone().appendTo(buffer);ready(JSVEE.utils.ui.findOrCreateValue(this.area,"true","boolean"))}else{if(element.find(".jsvee-value").length==3){var index=+element.find(".jsvee-value").eq(1).text();
buffer.find(".jsvee-value").eq(index).before(element.find(".jsvee-value").eq(2).clone());ready()}}}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")=="size"){var buffer=area.find('.jsvee-heap .jsvee-instance[data-id="'+element.find(".jsvee-value").eq(0).attr("data-id")+'"]').first();ready(JSVEE.utils.ui.findOrCreateValue(this.area,buffer.find(".jsvee-value").length,"int"))}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")=="isEmpty"){var buffer=area.find('.jsvee-heap .jsvee-instance[data-id="'+element.find(".jsvee-value").eq(0).attr("data-id")+'"]').first();
var elemCount=buffer.find(".jsvee-value").length;if(elemCount>0){ready(JSVEE.utils.ui.findOrCreateValue(this.area,"false","boolean"))}else{ready(JSVEE.utils.ui.findOrCreateValue(this.area,"true","boolean"))}}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")=="remove"){var buffer=area.find('.jsvee-heap .jsvee-instance[data-id="'+element.find(".jsvee-value").eq(0).attr("data-id")+'"]').first();if(element.find(".jsvee-value").eq(1).attr("data-type")=="String"){var item=element.find(".jsvee-value").eq(1);
var remove=buffer.find('.jsvee-value[data-value="'+item.attr("data-value")+'"]');remove.remove();ready(remove)}else{if(element.find(".jsvee-value").eq(1).attr("data-type")=="int"){var item=element.find(".jsvee-value").eq(1);var remove=buffer.find(".jsvee-value").eq(+item.attr("data-value"));remove.remove();ready(remove)}}}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")=="set"){var buffer=area.find('.jsvee-heap .jsvee-instance[data-id="'+element.find(".jsvee-value").eq(0).attr("data-id")+'"]').first();
var item=element.find(".jsvee-value").eq(1);var remove=buffer.find(".jsvee-value").eq(+item.attr("data-value"));remove.replaceWith(element.find(".jsvee-value").eq(2));ready(remove)}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")=="get"){var buffer=area.find('.jsvee-heap .jsvee-instance[data-id="'+element.find(".jsvee-value").eq(0).attr("data-id")+'"]').first();var item=element.find(".jsvee-value").eq(1);var value=buffer.find(".jsvee-value").eq(+item.attr("data-value")).clone();
ready(value)}}}}}}};JSVEE.handlers.classes.Integer=function(ready,area,element){if(element.hasClass("jsvee-function")&&element.attr("data-name")=="Integer"){var integer=area.find('.jsvee-heap .jsvee-instance[data-id="'+element.find(".jsvee-value").eq(0).attr("data-id")+'"]').first();element.find(".jsvee-value").eq(1).clone().appendTo(integer);ready(JSVEE.utils.ui.createReference(area,integer.attr("data-id")))}else{if(element.hasClass("jsvee-function")&&element.attr("data-name")=="intValue"){var integer=area.find('.jsvee-heap .jsvee-instance[data-id="'+element.find(".jsvee-value").eq(0).attr("data-id")+'"]').first();
ready(integer.find(".jsvee-value").first().clone())}}};JSVEE.handlers.classes.ArithmeticException=function(ready,area,element){if(element.hasClass("jsvee-function")&&element.attr("data-name")=="getMessage"){ready(JSVEE.utils.ui.findOrCreateValue(area,"/ by zero","String"))}};JSVEE.handlers.truthness=function(element){return element.text()==="true"||element.text()==="True"};JSVEE.handlers.actions.removeElement=function(ready,position,prev){JSVEE.utils.ui.findElement(this.area,position,prev).remove();
ready()};JSVEE.registerAction("removeElement",JSVEE.handlers.actions.removeElement);JSVEE.handlers.actions.createInterface=function(ready,name){var c=JSVEE.utils.ui.createClass(name);c.addClass("jsvee-java-interface");c.attr("title","Interface "+name);this.area.find(".jsvee-classes").append(c);ready(c)};JSVEE.registerAction("createInterface",JSVEE.handlers.actions.createInterface);JSVEE.handlers.actions.raiseError=function(ready,type,description,errorDescription){this.area.find(".jsvee-evaluation-area").first().children().remove();
var val=JSVEE.utils.ui.createValue(type,this.state.idCounter++,type);val.attr("data-description",errorDescription);this.area.find(".jsvee-evaluation-area").first().append(val);JSVEE.utils.ui.setStatusText(this.area,description);ready()};JSVEE.registerAction("raiseError",JSVEE.handlers.actions.raiseError)}(jQuery));