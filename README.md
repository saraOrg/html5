##html5插件集合
**1，一步上传插件**

	<div id="upload"></div>
	<script>
		$('#upload').upload({
			url: "",							//服务器地址
			autoUpload: true,				//是否开启自动上传，默认开启
			width: 100,						//上传域宽度
			height: 30,						//上传域高度
			successTimeout: 3,				//上传成功延迟秒数
			compressImage: false,			//图片是否开始压缩上传
      		uploadDiv: '',					//手动上传按钮所在div的class
			uploadButtonClass: '',			//上传按钮的class
 			uploadButtonText: '开始上传',	//上传按钮的文字，默认是这样
			cancelButtonText: '取消上传',	//取消按钮的文字，默认是这样
 			cancelButtonClass: '',			//取消按钮的class
			onSelected: '',					//选择文件之后的回调函数
			onUploadComplete: '',			//上传完成的回掉函数
			onUploadFailed: '',				//上传失败的回掉函数
			onUploadCancel: ''				//取消上传的回掉函数
		});
	</script>
按照上面的初始化操作之后，就可以使用了，html5的新功能还是很方便的！
有什么要提点的来微博畅聊哈，[@yangbai](http://weibo.com/yangbai1988)
