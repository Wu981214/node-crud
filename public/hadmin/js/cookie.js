//增
			 function setCookie(key,value,time,path){
				if(arguments.length==2){
					document.cookie=key+"="+value;
				}
				if(arguments.length==3){
					var mold = typeof(arguments[2]);
					if(mold=="number"){
						var date = new Date();
						date.setDate(date.getDate()+time);
						//console.log(date);
						document.cookie=key+"="+value+";expires="+date;
					}else{
						document.cookie=key+"="+value+";path="+path;
					}
				}
				if(arguments.length==4){
					document.cookie=key+"="+value+";expires="+date+";path="+path;
				}
			} 
		
			
			
			
			 //查
			 function getCookie(name){
				var newArr1=[];
				var str =document.cookie;
				var arr = str.split("; ");
				if(arguments.length>0){
					//console.log(arr);
					for(let i=0;i<arr.length;i++){
						
						var newArr = arr[i].split("=");
						//console.log(newArr);
						if(newArr[0]==name){
							return newArr[1];
						}
					}
				} else{
					for(let i=0;i<arr.length;i++){
							var newArr = arr[i].split("=");
							newArr1.push(newArr);
						}
						return newArr1;
					} 
				} 
				
			//删
		 	function removeCookie(name,path){
				var cookie = getCookie(name);
				if(arguments.length==2){
					console.log("aa");
					var oDate = new Date();
					oDate.setDate(oDate.getDate()-1);
					document.cookie=name+"="+cookie+";expires="+oDate+";path="+path;
				}else{
					setCookie(name,cookie,-1);
				}
			}