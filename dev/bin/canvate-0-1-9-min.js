window.Canvate=function(t){"use strict";if("string"==typeof t&&null==(t=document.getElementById(t)))throw"There is no element with the 'id': "+t;window.check=!0;for(var i=0,e=["ms","moz","webkit","o"],n=0;n<e.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[e[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[n]+"CancelAnimationFrame"]||window[e[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,e){var n=Date.now(),a=Math.max(0,16-(n-i)),s=window.setTimeout(function(){t(n+a)},a);return i=n+a,s}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)});var a,s,l,h,o,r,u,c,m,f,d,g,w,v,p="mouseOver",M="mouseOut",N="mouseUp",x="mouseDown",E="click",C="function",T="canvas",A="2d",y="image/png",I="Anonymous",D="source-over",R="destination-in",L="play",S="playFrom",b="playUntil",Y="playBetween",k=function(t){var i,e,n=0,a=0,s=0,l=0,h=0,o=!1,r=t,u={};this.addEventListener=function(t,e,r){if(null!=t&&""!=t&&typeof e===C){null==(i=u[t])&&(i=u[t]=[]);for(var c=i.length,m=0;m<c;m++)if(e[1]==e&&e[0]==r)return;switch(u[t].push([r,e]),t){case E:n++;break;case p:a++;break;case M:s++;break;case x:l++;break;case N:h++}return o=n+a+s+l+h>0,!0}},this.removeEventListener=function(t,e,r){if(null!=t&&""!=t&&typeof e===C&&null!=(i=u[t]))for(var c=i.length,m=0;m<c;m++)if((e=i[m])[1]==e&&e[0]==r){switch(u[t].splice(m,1),t){case E:n--;break;case p:a--;break;case M:s--;break;case x:l--;break;case N:h--}return o=n+a+s+l+h>0,!0}},this.emit=function(t,n){if(null!=t&&""!=t&&null!=(i=u[t])){(n=null==n||"object"!=typeof n?{}:n).type=t,n.target=r;for(var a=i.length,s=0;s<a;s++)(e=i[s])[1].apply(e[0],[n])}},this.hasMouse=function(){return o}},_=function(t,i,e,n,a,s,l){var h,o,r,u,c,m,f,d,g,w,v,p,M,N,x,E,C,T,A,y,I,D,R,L;return n-i,a-e,C=(f=n*(c=Math.cos(t)))-(d=a*(m=Math.sin(t)))+i,T=(g=n*m)+(w=a*c)+e,A=(M=(v=n+s)*c)-d+i,y=(N=v*m)+w+e,I=M-(x=(p=a+l)*m)+i,D=N+(E=p*c)+e,R=f-x+i,L=g+E+e,{minX:h=Math.min(Math.min(C,A),Math.min(I,R)),minY:o=Math.min(Math.min(T,y),Math.min(D,L)),maxX:r=Math.max(Math.max(C,A),Math.max(I,R)),maxY:u=Math.max(Math.max(T,y),Math.max(D,L)),width:Math.abs(r-h),height:Math.abs(u-o)}},B=0,F={},O={},X={},P={mask:R,slice:"destination-out"},z=function(t){var i=this;this.TEXT_SET="textSet",this.IMAGE_SET="imageSet",this.IMAGE_LOADED="imageLoaded",this.IMAGE_ERROR="imageError",this.CLIP_ADDED="clipAdded",this.CLIP_REMOVED="clipRemoved",this.CYCLE_END="cycleEnd",this.CYCLE_START="cycleStart",this.RENDER="render",this.START="start",this.END="end",this.CENTER="center",this.LEFT="left",this.RIGHT="right",this.TOP="top",this.BOTTOM="bottom",this.MIDDLE="middle";var e="clip"+ ++B;O[e]=this,this.name=e,this.x=0,this.y=0,this.width=0,this.height=0,this.alpha=1,this.scaleX=1,this.scaleY=1,this.rotation=0,this.pivotX=0,this.pivotY=0,this.visible=!0,this.isLoop=!1,this.background=null,this.text,this.interline=1.313,this.fontSize=12,this.font="sans-serif",this.textAlign=this.START,this.textBaseline="top",this.fontColor="black";var n,s,l,h,o,r,u,c,m,f,d,g,w,v,p,M,N,x,E,C,q,G,V,U,W,H,j,J,K,Q,Z,$,tt,it,et,nt,at,st,lt,ht,ot,rt="auto",ut=0,ct=0,mt=60,ft=1,dt=0,gt=0,wt=0,vt=0,pt=new k(this),Mt=document.createElement(T),Nt=Mt.getContext(A),xt=[],Et=[],Ct=null,Tt=null;this.setPosition=function(t,i){!(null==t||isNaN(t))&&(this.x=t),!(null==i||isNaN(i))&&(this.y=i)},this.setSize=function(t,i){var e=null==t||isNaN(t)&&t!=rt,n=null==i||isNaN(i)&&i!=rt;e||n||t==rt&&i==rt||(null==Ct&&null==Tt||(t==rt&&(t=i/Tt*Ct),i==rt&&(i=t/Ct*Tt)),this.width=t,this.height=i)},this.setScale=function(t,i){!(null==t||isNaN(t))&&(this.scaleX=t),!(null==i||isNaN(i))&&(this.scaleY=i)},this.setPivot=function(t,i){!(null==t||isNaN(t))&&(this.pivotX=t),!(null==i||isNaN(i))&&(this.pivotY=i)},this.fitInto=function(t,i,e,n){if(null!=t&&null!=i&&!isNaN(t)&&!isNaN(i)){(null==e||isNaN(e))&&(e=0),(null==n||isNaN(n))&&(n=0);var a=Math.min(t/Ct,i/Tt),s=Ct*a,l=Tt*a;this.setSize(Math.floor(s),rt);var h=Math.floor((t-s)/2),o=Math.floor((i-l)/2);this.x=h+this.pivotX*s+e,this.y=o+this.pivotY*l+n}},this.setAutoWidth=function(){this.setSize(rt,this.height)},this.setAutoHeight=function(){this.setSize(this.width,rt)},this.crop=function(t,e,a,s,l,h){t=null==t?dt:t,e=null==e?gt:e,a=null==a?wt:a,s=null==s?vt:s;i.width=null,i.height=null,wt=null,vt=null;var o=document.createElement(T);o.width=a,o.height=s,l=null==l||isNaN(l)?a:l,h=null==h||isNaN(h)?s:h,o.getContext(A).drawImage(n,t,e,a,s,0,0,l,h);var r=document.createElement("img");r.crossOrigin=I,r.src=o.toDataURL(y),this.setImage(o),this.setSize(l,h)},this.setViewPort=function(t,i){null==t||null==i||isNaN(t)||isNaN(i)||(h=t,o=i)},this.getViewPortX=function(){return h=width},this.setViewPortY=function(){return o=height},this.removeViewPort=function(){h=null,o=null},this.setImage=function(t){null!=t&&((n=t).crossOrigin=I,Ct=t.width,Tt=t.height,this.width=null==this.width||0==this.width?Ct:this.width,this.height=null==this.height||0==this.height?Tt:this.height,(s=document.createElement(T)).width=this.width,s.height=this.height,(l=s.getContext(A)).drawImage(t,0,0,Ct,Tt),this.setSize(this.width,this.height),wt=null==wt||0==wt?Ct:wt,vt=null==vt||0==vt?Tt:vt,this.setCycle(dt,gt,wt,vt),It(i.IMAGE_SET,{image:t}))},this.setImageById=function(t){var i=document.getElementById(t);if(i.crossOrigin=I,null==i)throw"There is no element with the id: "+t;return setImage(i),i},this.loadImage=function(t,e){s=null,Ct=null,Tt=null;var n=new Image;n.onload=function(){i.setImage(n),It(i.IMAGE_LOADED,{image:n,src:t})},n.onerror=function(e){It(i.IMAGE_ERROR,{src:t})};var a=e?"?"+(new Date).getTime():"";n.crossOrigin=I,n.src=t+a},this.setMask=function(t,i){null!=t&&(X[t.getId()]=this,_typeMask=P[i]||P.mask,r=t)},this.removeMask=function(){_typeMask=D,null!=r&&(X[r.getId()]=null,r=null)},this.isMask=function(){return X[e]},this.setBackground=function(t){this.background=t},this.setRect=function(t,e,n){if(null!=t&&null!=e&&!isNaN(t)&&!isNaN(e)){i.width=null,i.height=null,wt=null,vt=null;var a=document.createElement(T);a.width=t,a.height=e;var s=a.getContext(A);s.fillStyle=n,s.fillRect(0,0,t,e);var l=document.createElement("img");l.crossOrigin=I,l.src=a.toDataURL(y),this.setImage(a)}},this.setText=function(t,e,n,a){this.text=t,this.fontSize=null==e?this.fontSize:12,this.font=null==n?this.font:n,this.fontColor=null==a?this.fontColor:a,It(i.TEXT_SET,{text:this.text})},this.getId=function(){return e},this.getNewClip=function(t){return new z(t)},this.addNewClip=function(t){var i=new z(t);return this.addClip(i),i},this.getClipAt=function(t){return xt[t]},this.addClip=function(t){null!=t&&t!=this&&this.addClipAt(t,xt.length)},this.addClipAt=function(t,e){if(null!=t&&t!=this&&!isNaN(e)){var n=t.getParent();null!=n&&n.removeClip(t),xt.splice(e,0,t),F[t.getId()]=this,It(i.CLIP_ADDED,{parent:n})}},this.removeClip=function(t){if(null!=t&&t!=this)for(var i=xt.length,e=0;e<i;e++)if(xt[e]==t)return this.removeClipAt(e)},this.removeClipAt=function(t){if(!isNaN(t||t<0||!(t<xt.length))){var e=xt.splice(t,1)[0],n=F[e.getId()];return F[e.getId()]=null,It(i.CLIP_REMOVED,{parent:n}),e}},this.removeAllClips=function(){for(;xt.length>0;)this.removeClipAt(0)},this.getTotalClip=function(){return xt.length},this.setDepth=function(t,i){if(null!=t&&t!=this&&!isNaN(i)){i=Math.max(i,0);for(var e=xt.length,n=0;n<e;n++)xt[n]==t&&xt.splice(i,0,xt.splice(n,1)[0])}},this.swapClips=function(t,i){if(null!=t&&null!=i){for(var e,n,a,s=xt.length;--s>-1;)t==(a=xt[s])&&(e=s),i==a&&(n=s);if(null!=e&&null!=n){var l=xt[e],h=xt[n];xt[e]=h,xt[n]=l}}},this.toFront=function(t){null!=t&&this.setDepth(t,xt.length-1)},this.toBack=function(t){null!=t&&this.setDepth(t,0)},this.getParent=function(){return F[e]},this.getClipByProp=function(t,i){return getClipListByProp(t,i)[0]},this.getClipListByProp=function(t,i){for(var e=xt.length,n=[],a=0;a<e;a++){var s;(s=xt[a])[t]==i&&n.push[s]}return n},this.setCycle=function(t,i,e,a,h,o,r){if(p=dt=null==t||isNaN(t)?dt:t,M=gt=null==i||isNaN(i)?gt:i,N=wt=null==e||isNaN(e)?wt:e,x=vt=null==a||isNaN(a)?vt:a,o=null==o||isNaN(o)?0:o,r=null==r||isNaN(r)?0:r,null==h||isNaN(h)){var u=Math.floor(n.width/N),c=Math.floor(n.height/x);h=ft=u*c}var m;for(0==ft&&(ft=1),(s=document.createElement(T)).width=N*ft,s.height=x,l=s.getContext(A),Et.length=0,E=0;E<ft;E++)if(m=N*E,Et.push({x:m,y:0,width:N,height:x}),l.drawImage(n,p,M,N,x,m,0,N,x),(p+=N)>=Ct&&(p=0,M+=x,gt>Tt))throw new Error("The total frames is out of bound");1<ft&&this.setSize(N,rt)};var At=function(t){ut=ct>=t?-1:1,d=t},yt=function(t){if(isNaN(t))throw new Error("The frame must be an integer and is: "+t);return C=(C=(C=t-1)<0?0:C)>=Et.length?Et.length-1:C};this.play=function(){var t=g;w=Date.now(),C=Et.length-1,v=L,f=0,At(C),It(i.CYCLE_START,{frame:t,action:v})},this.playFrom=function(t){var e=g;w=Date.now(),C=yt(t),g=C+1,ct=C,f=C,v=S,At(Et.length-1),It(i.CYCLE_START,{frame:e,action:v})},this.playUntil=function(t){var e=g;w=Date.now(),C=yt(t),f=ct,v=b,At(C),It(i.CYCLE_START,{frame:e,action:v})},this.playBetween=function(t,e){var n=g;w=Date.now(),q=yt(t),G=yt(e),ct=q,f=q,g=q+1,v=Y,At(G),It(i.CYCLE_START,{frame:n,action:v})},this.stop=function(){var t=g;w=Date.now(),g=(C=ct)+1,d=C,v="stop",g=null,v=null,It(i.CYCLE_START,{frame:t,action:v})},this.stopAt=function(t){var e=g;w=Date.now(),C=yt(t),g=C+1,ct=Math.max(Math.min(C,Et.length),0),d=C,v="stopAt",g=null,v=null,It(i.CYCLE_START,{frame:e,action:v})},this.nextFrame=function(){if(ct>=Et.length-1){if(!this.isLoop)return;ct=0}var t=g;w=Date.now(),C=Math.max(Math.min(ct+1,Et.length),0),g=C+1,ct=C,d=C,v="nextFrame",It(i.CYCLE_START,{frame:t,action:v})},this.prevFrame=function(){if(0==ct){if(!this.isLoop)return;ct=Et.length-1}var t=g;w=Date.now(),C=Math.max(Math.min(ct-1,Et.length),0),g=C+1,ct=C,d=C,v="prevFrame",It(i.CYCLE_START,{frame:t,action:v})},this.getTotalFrames=function(){return ft},this.getCurrentFrame=function(){return g},this.setFrameRate=function(t){null==t||isNaN(t)||(mt=t)},this.getFrameRate=function(){return mt},this.emitMouseEvent=function(t,e,n){a==this&&It(t,{x:e-i.x,y:n-i.y})},this.hasMouse=function(){return m},this.addEventListener=function(t,i,e){pt.addEventListener(t,i,e),m=pt.hasMouse()},this.removeEventListener=function(t,i,e){pt.removeEventListener(t,i,e),m=pt.hasMouse()},this.hasButton=function(){return _hasButton},this.debug=function(){};var It=function(t,i){pt.emit(t,i)},Dt=function(t,i,e){if(t.length>i){var n=t.slice(0,i).lastIndexOf(" "),a=t.slice(0,i).lastIndexOf("-");if((h=Math.max(n,a))>0){var s=t.slice(0,h+(a==h?1:0)),l=t.slice(h+1);return Nt.fillText(s,0,e),void Dt(l,i,e+=c)}var h;n=t.indexOf("-"),a=t.indexOf(" ");if((h=-1==n||-1==a?Math.max(n,a):Math.min(n,a))>0){s=t.slice(0,h+(a==h?0:1)),l=t.slice(h+1);return Nt.fillText(s,0,e),void Dt(l,i,e+=c)}}return Nt.fillText(t,0,e),t};this.render=function(t,e,n,a,l){if(0==xt.length&&null==s||0==this.visible||this.isMask()&&!l)return{};U=Et[V=ct];try{dt=U.x,gt=U.y,wt=U.width,vt=U.height}catch(t){this.name}if(g=V+1,(W=Date.now())-w>=1e3/mt)if(w=W,ct!=d)ct+=ut,ct=Math.max(0,ct);else if(0!=ut){if(this.isLoop)switch(v){case Y:case b:case S:ct=f;break;case L:ct=0}else ut=0;null!=v&&It(i.CYCLE_END,{frame:g,action:v})}var p,M,N,x,E;H=this.x,j=this.y,lt=this.scaleX,ht=this.scaleY,J=this.width*lt,K=this.height*ht,it=this.pivotX*J*lt,et=this.pivotY*K*ht,Q=dt,Z=gt,$=wt,tt=vt,st=this.rotation*Math.PI/180;var C=[];(function(){var l,f,d;p=null,M=null,N=null,x=null,null!=s&&(E=_(0,H,j,-it,-et,J,K),p=E.minX,M=E.minY,N=E.maxX,x=E.maxY),null!=s?(l=J/Ct,f=K/Tt,l=isNaN(l)?1:l,f=isNaN(f)?1:f):(l=1,f=1),l*=lt,f*=ht,u=null;var g=H-it,w=j-et,v=xt.length;for(V=0;V<v;V++)at=xt[V],ot=at.render(t,e,n-i.x,a-i.y,!1),null!=(nt=ot.inner)&&(d=ot.bounds,C.push({canvas:ot.inner,x:d.minX,y:d.minY}),Boolean(ot.clipMouse)&&(u=ot.clipMouse),null!=p?(p=Math.min((d.minX+g)*l,p),M=Math.min((d.minY+w)*f,M),N=Math.max((d.maxX+g)*l,N),x=Math.max((d.maxY+w)*f,x)):(p=(d.minX+g)*l,M=(d.minY+w)*f,N=(d.maxX+g)*l,x=(d.maxY+w)*f));var T=Math.abs(N-p),A=Math.abs(x-M);E=_(st,H,j,-(H-p),-(j-M),T,A),p=E.minX,M=E.minY,N=E.maxX,x=E.maxY,Mt.width=null!=h?h:E.width,Mt.height=null!=o?o:E.height,Nt.save(),Nt.globalAlpha=i.alpha;var y,I,L,S,b,Y,k=lt<0?-Mt.width:0,B=ht<0?-Mt.height:0,F=.5+H-p+k<<0,O=.5+j-M+B<<0;if(Nt.translate(F,O),Nt.rotate(st),lt=lt<0?-1:1,ht=ht<0?-1:1,Nt.scale(lt,ht),null!=i.background&&(Nt.fillStyle=i.background,Nt.fillRect(0,0,Mt.width,Mt.height)),null!=s?(Q=.5+Q<<0,Z=.5+Z<<0,$=.5+$<<0,tt=.5+tt<<0,it=.5+it<<0,et=.5+et<<0,J=.5+J<<0,K=.5+K<<0,Nt.drawImage(s,Q,Z,$,tt,-it,-et,J,K)):(i.width=T,i.height=A,Ct=T,Tt=A,$=T,tt=A),null!=i.text){Nt.textAlign=i.textAlign,Nt.textBaseline=i.textBaseline,Nt.fillStyle=i.fontColor,Nt.font=i.fontSize+"px "+i.font;for(var X=i.width,P=0,z="M";P<X;)P=Math.round(Nt.measureText(z).width),z+="M";c=i.interline*i.fontSize,Dt(i.text,Math.max(z.length,1),0)}v=C.length;for(var q=0;q<v;q++)null!=(Y=C[q])&&(y=Y.canvas,I=.5+(Y.x-it)*l<<0,L=.5+(Y.y-et)*f<<0,S=.5+y.width*l<<0,b=.5+y.height*f<<0,Nt.drawImage(Y.canvas,I,L,S,b));if(m){var G=Nt.getImageData(n-p,a-M,1,1).data;G[3]>0&&(u=i)}null!=(at=r)&&(ot=at.render(t,e,n-p,a-M,!0),null!=(nt=ot.inner)&&(I=(d=ot.bounds).minX,L=d.minY,I=.5+(I-it)*l<<0,L=.5+(L-et)*f<<0,S=.5+nt.width*l<<0,b=.5+nt.height*f<<0,Nt.globalCompositeOperation=R,Nt.drawImage(nt,I,L,S,b),0==Nt.getImageData(n-p,a-M,1,1).data[3]&&(u=null),Nt.globalCompositeOperation=D)),Nt.restore()})(),Mt.id=i.name;var T={inner:Mt,clipMouse:u,bounds:E,x:p,y:M};return It(i.RENDER,{}),i.debug(Mt,i.name),T},this.setImage(t)},q=t,G=q.getContext(A),V=function(){},U=function(){void 0!=l&&void 0!=h&&(d="default",Boolean(m)&&m.hasMouse()?(d="pointer",m!=c&&(W(),c=m,a=m,m.emitMouseEvent(p),a=null)):W(),q.style.cursor=d)},W=function(t){Boolean(c)&&c.hasMouse()&&(a=c,c.emitMouseEvent(M,l,h),t&&c.emitMouseEvent(N,l,h),c=null,m=null,a=null)},H=function(){m=null,q.width=f.width,q.height=f.height,s.width=f.width,s.height=f.height,w=f.render(q.width,q.height,l,h,!1),g=w.inner,Boolean(g)&&(G.drawImage(g,w.x,w.y),null!=(v=w.clipMouse)&&(m=v)),V(),requestAnimationFrame(H)};return function(){q.width=q.width,q.height=q.height,s=q.cloneNode(),s.getContext(A),s.width=q.width,s.height=q.height,(f=new z).name="canvateStage",f.setImage(q),q.onmousemove=function(t){t.preventDefault(),u=q.getBoundingClientRect(),o=t.clientX,r=t.clientY,l=(o-u.left)*(q.width/u.width),h=(r-u.top)*(q.width/u.width),V=U},q.onclick=function(t){t.preventDefault(),Boolean(m)&&m.hasMouse()&&(a=m,m.emitMouseEvent(E,l,h),a=null)},q.onmousedown=function(t){t.preventDefault(),Boolean(m)&&m.hasMouse()&&(a=m,m.emitMouseEvent(x,l,h),a=null)},q.onmouseup=function(t){t.preventDefault(),Boolean(m)&&m.hasMouse()&&(a=m,m.emitMouseEvent(N,l,h),a=null)},window.onmouseleave=function(t){console.log("WINDOW LEFT!!")},document.onmouseleave=q.onmouseleave=function(t){W(!0),V=function(){}};new k(q);H()}(),f};