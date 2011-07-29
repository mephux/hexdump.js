// Hexdump.js 0.1.0
// (c) 2011 Dustin Willis Webber
// Hexdump is freely distributable under the MIT license.
// For all details and documentation:
// http://github.com/mephux/hexdump.js
var Hexdump;
Hexdump=function(){function f(c,b){var a=this;a.hexdump=[];a.hex=!1;a.options={container:b.container||"",width:b.width||16,byteGrouping:b.byteGrouping||0,ascii:b.ascii||!1,lineNumber:b.lineNumber,endian:b.endian||"big",html:b.html,base:b.base||"hexadecimal",nonPrintable:b.nonPrintable||".",style:{lineNumberLeft:b.style.lineNumberLeft||"",lineNumberRight:b.style.lineNumberRight||":",stringLeft:b.style.stringLeft||"|",stringRight:b.style.stringRight||"|",hexLeft:b.style.hexLeft||"",hexRight:b.style.hexRight||"",
hexNull:b.style.hexNull||".",stringNull:b.style.stringNull||" "}};if(a.options.base=="hex")a.hex=!0;else if(a.options.base=="hexadecimal")a.hex=!0;var d=a.options.lineNumber;if(typeof d=="undefined"||d==null)a.options.lineNumber=!0;d=a.options.html;if(typeof d=="undefined"||d==null)a.options.html=!0;if(a.endian!="little")a.endian="big";if(a.options.byteGrouping>c.length)a.options.byteGrouping=c.length;a.options.byteGrouping--;if(a.options.width>c.length)a.options.width=c.length;a.padding={hex:4,dec:5,
bin:8};switch(a.options.base){case "hexadecimal":case "hex":case 16:a.setNullPadding(a.padding.hex);a.baseConvert=function(b){for(;0<b.length;)return a.addPadding(b[0].charCodeAt(0).toString(16),a.padding.hex)};break;case "decimal":case "dec":case 10:a.setNullPadding(a.padding.dec);a.baseConvert=function(b){for(;0<b.length;)return a.addPadding(b[0].charCodeAt(0),a.padding.dec)};break;case "binary":case "bin":case 2:a.setNullPadding(a.padding.bin);a.baseConvert=function(b){for(;0<b.length;){b=b[0].charCodeAt(0);
for(var c="",d=0;d<8;d++)c=b%2+c,b=Math.floor(b/2);return a.addPadding(c,a.padding.bin)}};break;default:a.options.base="hex",a.hex=!0,a.setNullPadding(a.padding.hex),a.baseConvert=function(b){for(;0<b.length;)return a.addPadding(b[0].charCodeAt(0).toString(16),a.padding.hex)}}a.data=c.match(RegExp(".{1,"+this.options.width+"}","g"));a.nullCount=a.options.width-a.data[a.data.length-1].length;a.hexCounter=0;for(d=a.stringCounter=0;d<a.data.length;d++){var e=a.process(a.data[d]);a.hexdump.push({data:e.data,
string:e.string,length:a.data[d].length,missing:a.options.width-a.data[d].length})}a.dump()}f.prototype.dump=function(){this.output="";for(var c=0;c<this.hexdump.length;c++){if(this.options.lineNumber){var b="";b+=this.options.style.lineNumberLeft;for(var a=c*this.options.width,d=8-a.toString().length,e=0;e<d;e++)b+="0";b+=a;b+=this.options.style.lineNumberRight+" ";this.output+=this.options.html?'<span id="line-number">'+b+"</span>":b}b=0;this.output+=this.options.style.hexLeft;for(a=0;a<this.hexdump[c].data.length;a++)b==
this.options.byteGrouping?(this.output+=a==this.hexdump[c].data.length-1?this.hexdump[c].data[a]:this.hexdump[c].data[a]+" ",b=0):(this.output+=this.hexdump[c].data[a],b++);this.output+=this.options.style.hexRight;this.appendString(this.hexdump[c]);this.output+="\n"}document.getElementById(this.options.container).innerHTML=this.output};f.prototype.appendString=function(c){this.output+=" "+this.options.style.stringLeft;this.output+=c.string;this.output+=this.options.style.stringRight};f.prototype.splitNulls=
function(c){var b=[],a="";if(c&&c.length>2)for(var d=0;d<c.length;d++)(d+1)%2==0?(a+=c[d].toString(),b.push(a),a=""):a+=c[d].toString();return b};f.prototype.process=function(c){for(var b=[],a=[],d=0;d<c.length;d++){if(this.options.html){var e=this.baseConvert(c[d]);if(this.hex){e=this.splitNulls(e);for(var f=0;f<e.length;f++)a.push('<span data-hex-id="'+this.hexCounter+'">'+e[f]+"</span>")}else a.push('<span data-hex-id="'+this.hexCounter+'">'+e+"</span>");b.push('<span data-string-id="'+this.hexCounter+
'">'+this.checkForNonPrintable(c[d])+"</span>")}else{e=this.baseConvert(c[d]);if(this.hex){e=this.splitNulls(e);for(f=0;f<e.length;f++)a.push(e[f])}else a.push(e);b.push(this.checkForNonPrintable(c[d]))}this.hexCounter++}d=this.hex?this.options.width*2:this.options.width;if(a.length<d){c=d-a.length;for(d=0;d<c;d++)e="",e=this.options.html?'<span data-hex-null="true">'+this.options.style.hexNull+"</span>":this.options.style.hexNull,a.push(e)}if(b.length<this.options.width){c=this.options.width-b.length;
for(d=0;d<c;d++)e="",e=this.options.html?'<span data-string-null="true">'+this.options.style.stringNull+"</span>":this.options.style.stringNull,b.push(e)}return{data:a,string:b.join("")}};f.prototype.setNullPadding=function(c){var b=this.options.style.hexNull[0];this.options.style.hexNull="";this.hex&&(c/=2);for(var a=0;a<c;a++)this.options.style.hexNull+=b};f.prototype.addPadding=function(c,b){for(var a=c.toString().length,d="",e=0;e<b-a;e++)d+="0";return this.options.endian=="big"?d+c:c+d};f.prototype.checkForNonPrintable=
function(c){var b=c.charCodeAt(0).toString(16);return b==9?".":b==127?".":b.length>2?".":c};return f}();

