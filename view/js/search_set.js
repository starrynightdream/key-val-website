window.onload = function() {

    let main =  new Vue({
        el:"#main",
        data :{
            name:undefined,
            searchKey: "",
            searchValAns: "",
            key:"",
            value:"",
            isSearch : true,
            errMessage: ""
        },
        methods :{
            toIndex() {
                window.location.href = '/';
            },
            toKeyVal() {
                window.location.href = '/sas';
            },
            toLogin() {
                window.location.href = '/lar';
            },

            search () {

                if (this.searchKey){
                    this.errMessage = "";
                    const that = this;
                    this.$http.post("/search", {
                        'key' : this.searchKey
                    }).then((req) =>{

                        console.log(req.body)
                        if (req.body.code == 1){
                            that.searchValAns = req.body.message;
                        }else {
                            that.errMessage = "查找失败，该键对应值可能不存在";
                        }
                    });
                } else {
                    this.errMessage = "请输入合理的key";
                }
            },
            setKeyVal() {

                if (this.key && this.value){
                    this.errMessage = "";
                    const that = this;
                    this.$http.post("/addkv", {
                        'key' : this.key,
                        'value' :this.value
                    }).then((req) =>{

                        console.log(req.body)
                        if (req.body.code == 1){
                            errMessage = ''
                        }else {
                            that.errMessage = "插入失败";
                        }
                    });
                } else {
                    this.errMessage = "请输入合理的key-val";
                }
            },

            changePlan (){
                this.isSearch = !this.isSearch;
                this.errMessage = "";
            },
        },
        created (){

            const that = this;
            this.$http.post("/user")
                .then((req) =>{

                    if (req.body.message)
                        that.name = req.body.message;
                    else
                        that.name = '无名';
                });
        }
    });
}