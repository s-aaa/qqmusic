document.addEventListener('readystatechange',function(){
	if(document.readyState==="complete"){


		// 音乐库建立
		var yinyueku=[{name:'燕归巢',geshou:'许嵩',duration:'4：54',src:'1.mp3'},{name:'直到那一天',geshou:'刘惜君',duration:'4:29',src:'2.mp3'},{name:'爱与诚',geshou:'古巨基',duration:'3:43',src:'3.mp3'},{name:'Call Me Maybe',geshou:'Carly Rae Jepsen',duration:'3:13',src:'4.mp3'}];
		var playerBar=document.querySelector('.player_bar');
		var playCurrentBar=document.querySelector('.play_current_bar');
		var progressOp=document.querySelector('.progress_op');
		var timeShow=document.querySelector('.time_show');
        var currentsongindex;
        var DANQU=1,SHUNXU=2,LIEBIAO=3,SUIJI=4;
		var currentbofangmoshi=LIEBIAO;
		// 创建列表
		var drawlist=function(){
			var el='';
			for (var i = 0; i < yinyueku.length; i++) {
				el += '<li mid="j0"><strong class="music_name" >'+yinyueku[i].name+'</strong><strong class="singer_name">'+yinyueku[i].geshou+'</strong><strong class="play_time">'+yinyueku[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_0038RM350w8m1V" mid="0038RM350w8m1V"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';
			}
			
			divsonglist.firstElementChild.innerHTML= el;

			var lis=divsonglist.firstElementChild.children;
			for (var i = 0; i < lis.length; i++) {
				lis[i].index=i;
				lis[i].onclick=function(){
					audio.src=yinyueku[this.index].src;
					audio.play();
          currentsongindex=this.index;
					onsongchange();
				}
				lis[i].onmouseover=function(){
					lis[this.index].classList.add('play_hover');

				}
				lis[i].onmouseout=function(){
					lis[this.index].classList.remove('play_hover')
				}
			}
            spansongnum1.innerHTML='<span>'+yinyueku.length+'</span>';
             var dels =document.querySelectorAll('.btn_del');
            for (var i = 0; i < dels.length; i++) {
                dels[i].index=i;
                dels[i].onclick = function(ev){
                    ev.stopPropagation();
                    var newarr=[];
                    for (var j = 0; j < yinyueku.length; j++) {
                        if(yinyueku[this.index] != yinyueku[j]){
                            newarr.push(yinyueku[j]);
                        }
                    }
                    yinyueku = newarr;
                    if(this.index<currentsongindex){
                        this.index-=1;
                        currentsongindex-=1;
                    }
                    drawlist();             
                    if(this.index==currentsongindex){
                        if(this.index==yinyueku.length){
                            audio.src='';
                            uireset();
                        }else{
                            audio.src=yinyueku[currentsongindex].src;
                            audio.play();
                            onsongchange();
                        }
                    }
                    
                }
            }
			
		}
		drawlist();
		// 列表UI样式
		var onsongchange=function(){
			var lis=divsonglist.firstElementChild.children;
			for (var i = 0; i < lis.length; i++) {
				lis[i].classList.remove('play_current')
			}
			lis[currentsongindex].classList.add('play_current');
      console.log(document.querySelector('.music_name'))
      document.querySelector('.musicname').innerHTML=yinyueku[currentsongindex].name;
      document.querySelector('.singername').innerHTML=yinyueku[currentsongindex].geshou;
      document.querySelector('.playdate').innerHTML=yinyueku[currentsongindex].duration;
      document.querySelector('.music_op').style.display='block';
		}
        
        // 时间转换函数
        var zhuanhuan=function(time){
            var min=parseInt(time/60);
            var sec=parseInt(time-min*60);
            if(sec<10){
               return min+":"+"0"+sec;
           }else{
               return min+":"+sec;
           }
       }
       // 进度条
       playerBar.onclick=function(ev){
       	audio.currentTime=ev.offsetX/this.offsetWidth*audio.duration;
       }
       audio.ontimeupdate=function(){
       	var l=this.currentTime/this.duration*100;
       	progressOp.style.left=l+"%";
       	playCurrentBar.style.width=l+'%';
        if(audio.ended){
            if(currentbofangmoshi==DANQU){
                audio.play();
            }else if(currentbofangmoshi==SUIJI){
                randomsong();
            }else if(currentbofangmoshi==LIEBIAO){
                nextsong();
            }else if(currentbofangmoshi==SHUNXU){
                if(currentsongindex==yinyueku.length-1){
                    audio.pause();
                }
                else{
                    nextsong();
                }
                
            }
        }
       }
       var randomsong=function(){
       currentsongindex=Math.floor(Math.random()*yinyueku.length);
       audio.src=yinyueku[currentsongindex].src;
       audio.play();
       onsongchange();
       }
       playerBar.onmouseover=function(ev){
       	timeShow.style.display='block';
       	timeShow.style.left=ev.offsetX-timeShow.offsetWidth/2+"px";
       	
        playerBar.onmousemove=function(){
        	timeShow.style.left=ev.offsetX-timeShow.offsetWidth/2+"px";
        	var time=ev.offsetX/this.offsetWidth*audio.duration;
        	timeShow.innerHTML=zhuanhuan(time);
        }
    }
    progressOp.onclick=function(ev){
        ev.stopPropagation();
    }
    progressOp.onmouseover=function(ev){
        ev.stopPropagation();
    }
    playerBar.onmouseout=function(ev){
        timeShow.style.display="none";
    }



       // 歌曲切换
       
       
       var nextsong=function(){
        if(currentsongindex==undefined){
            return;
        }
       	currentsongindex+=1;
       	currentsongindex=(currentsongindex==yinyueku.length)?0:currentsongindex;
       	audio.src=yinyueku[currentsongindex].src;
       	onsongchange();
       	audio.play();
       }
       var prevsong=function(){
        if(currentsongindex==undefined){
            return;
        }
        currentsongindex-=1;
        currentsongindex=(currentsongindex==-1)?(yinyueku.length-1):currentsongindex;
        audio.src=yinyueku[currentsongindex].src;
        onsongchange();
        audio.play();
       }
       document.querySelector('.next_bt').onclick=nextsong;
       document.querySelector('.prev_bt').onclick=prevsong;

       // 播放方式
       btnPlayway.onclick=function(){
        divselect.style.display="block";
       }
       setbofangmoshi=function(num){
        currentbofangmoshi=num;
        divselect.style.display="none";
        var date={
            1:'cycle_single_bt',
            2:'ordered_bt',
            3:'cycle_bt',
            4:'unordered_bt'
        }
        btnPlayway.className=date[num];
       }




       // 清除
       clear_list.onclick=function(){
        yinyueku=[];
        drawlist();
        uireset();
       }
       var uireset=function(){
        divnulllist.style.display="block";
        document.querySelector('.music_name').innerHTML='<span>我想听的歌</span>';
        document.querySelector('.singer_name').innerHTML='<span>QQ音乐</span>';
        document.querySelector('.music_op').style.display='none';
        document.querySelector('.play_date').style.display='none';
        audio.src='';
        spanplaybar.style.width=0+'%';
        btnplay.className='play_bt';
       }

          

        
       



     // 播放音乐
         btnplay.onclick=function(){
         if(audio.paused){//音乐暂停时
            audio.play();
        }else{
            audio.pause();
        }
      }
        audio.onplay=function(){
         btnplay.classList.remove('play_bt')
         btnplay.classList.add('pause_bt');
         spanvolumeop.style.left=spanvolume.offsetWidth+"%";
         spanvolumebar.style.width=spanvolume.offsetWidth+"%";
        }
        audio.onpause=function(){
         btnplay.classList.remove('pause_bt')
         btnplay.classList.add('play_bt')
        }
		// 音量设置
		spanvolume.onclick=function(ev){
			var v=ev.offsetX/this.offsetWidth;
			audio.volume=v;
		}
		audio.onvolumechange=function(){
			if(audio.volume==0){
				spanmute.className='volume_mute';
			}
			else{
				spanmute.className='volume_icon';
			}
			var r=audio.volume*100;
			spanvolumeop.style.left=r+'%';
			spanvolumebar.style.width=r+'%';
		}
		spanvolumeop.onclick=function(ev){
			ev.stopPropagation();
		}
		spanmute.onclick=(function(){
           var oldvolume
           return function(){
              if(audio.volume!=0){
                 oldvolume=audio.volume;
                 audio.volume=0;
                 spanmute.classList.remove('volume_icon');
                 spanmute.classList.add('volume_mute');
             }else{
                 audio.volume=oldvolume;
                 spanmute.classList.add('volume_icon');
                 spanmute.classList.remove('volume_mute');
             }
         }

     })();

var btnfold=document.querySelector('#btnfold');
btnfold.onclick=function(){
  if (btnfold.getAttribute('title')=='点击收起') {
    divplayer.style.left=-540+'px';
    btnfold.setAttribute('title','点击展开');
    btnfold.style.cssText='background-image:ulr(../img/player_bg.png);background-repeat: no-repeat;background-position: -23px 0';
  }else{
    divplayer.style.left=0+'px';
    btnfold.setAttribute('title','点击收起');
    btnfold.style.cssText='background-image:ulr(../img/player_bg.png);background-repeat: no-repeat;background-position: 0px 0';
  }
}

var divplayframe=document.querySelector('#divplayframe');
spansongnum1.onclick=function(){
   if (spansongnum1.getAttribute('title')=='展开播放列表') {
    divplayframe.style.display='block';
    spansongnum1.setAttribute('title','隐藏播放列表');
    
  }else{
    divplayframe.style.display='none';
    spansongnum1.setAttribute('title','展开播放列表');
  }
}
btnclose.onclick=function(){
  divplayframe.style.display='none';
  spansongnum1.setAttribute('title','展开播放列表');
}

 }
},false)