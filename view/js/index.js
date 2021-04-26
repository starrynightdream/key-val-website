window.onload = () =>{
    console.log('there')
    let main =  new Vue({
        el:"#main",
        data :{
            name:undefined
        },
        methods :{
            getName(){
                const that = this;
                this.$http.post("/user")
                    .then((res) =>{
                        that.name = res.message;
                        console.log(that.name)
                    });
            }
        },
        activated: ()=>{
            this.getName();
        }
    });
}