export default {
	data () {
		return {
		  // note: changing this line won't causes changes
		  // with hot-reload because the reloaded component
		  // preserves its current state and we are modifying
		  // its initial state.
		  msg: 'Hello World!',
		  arr: [],
		}
	},
    computed:{
		
	},
	methods:{
		aaa: function(){
			alert('aaa');
			this.$axios.post('/user', {
			    firstName: 'Fred',
			    lastName: 'Flintstone'
			})
			.then(function (response) {
				var data = response.data.context.from;
			    //console.log(response);
			    console.log(data)
			})
			.catch(function (error) {
			    console.log(error);
			    alert('aa')
			});
		},
		testout: function(){
			var _this= this;
			_this.$axios.post('http://127.0.0.1:8080/test', {
			})
			.then(function (response) {
				var data = response.data.context.vacation;
			    //console.log(response);
			    for(var i = 0;i<data.length;i++){
				    data[i].img = 'http://127.0.0.1:8080/vacation-photo/'+data[i].img
				}
			    _this.arr = data;
			    console.log(data);
			})
			.catch(function (error) {
			    console.log(error);
			    alert('aa')
			});
		}
	}

}
