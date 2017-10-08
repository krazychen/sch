/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
//		callback = callback || $.noop;
//		loginInfo = loginInfo || {};
//		loginInfo.account = loginInfo.account || '';
//		loginInfo.password = loginInfo.password || '';
//		if (loginInfo.account.length < 5) {
//			return callback('账号最短为 5 个字符');
//		}
//		if (loginInfo.password.length < 6) {
//			return callback('密码最短为 6 个字符');
//		}
//		var users = JSON.parse(localStorage.getItem('$users') || '[]');
//		var authed = users.some(function(user) {		
//		$.ajax({
//	    	url: "http://192.168.31.212:8080/kcfw/a/cms/article/getC",
//	    	jsonp: "callback",
//	    	dataType: "jsonp",				 	
//		    data: {
//		        userName:loginInfo.account ,
//		        pw:loginInfo.password
//		    },					 
//		    // Work with the response
//		    success: function(data){
//              var xs=data['aaa'][0];
//	            
//	            if(xs['login']==true){
//	            	alert(xs['message']);
//	            	return owner.createState(loginInfo.account, callback);
//	            }else{
////	            	alert(xs['login']);
//	            	return callback(xs['message']);
//	            }
//		    },
//          error: function(XMLHttpRequest, textStatus, errorThrown) {
//	            alert('error');
//	            alert(XMLHttpRequest.status);
//	            alert(XMLHttpRequest.readyState);
//	            alert(textStatus);
//	        }
//		});
			
//			return loginInfo.account == user.account && loginInfo.password == user.password;
//		});
//		var authed=true;
////		var authed="";
//		if (authed) {
//			return owner.createState(loginInfo.account, callback);
//		} else {
//			return callback('用户名或密码错误');
//		}
	};
	
	owner.createState2 = function(name) {
		var state = owner.getState();
		state.account = name;
		state.token = "token"+name;
		owner.setState(state);
	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token"+name;
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
	}
}(mui, window.app = {}));

// 获取url中的参数
function getUrlParam (name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if (r!= null) {
        return unescape(r[2]);
     }else{
        return null;
     }
}  