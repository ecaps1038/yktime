export default {
	//详情页跳转
	detial(rem,id){
		console.log('详情跳转'+id);
		rem.$axios.post(rem.GLOBAL.baseUrl+'/toDetial', {
		    data: id,
		})
		.then(function (response) {
			var tep = response.data.tep;
		    if(tep == 0){
		    	console.log('详情页请求成功！');
			}
		})
		.catch(function (error) {
		    console.log(error);
		    alert(error)
		});
	},
}