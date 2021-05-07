function toIndex() {
    window.location.href = '/';
}
function toKeyVal() {
    window.location.href = '/sas';
}
function toLogin() {
    window.location.href = '/lar';
}

function search () {
    var searchKey = $('#searchKey');
    var errMessage = document.getElementById('errMessage');
    if (searchKey.val()) {
        errMessage.innerHTML = '';

        $.post('/search', {
            'key': searchKey.val()
        }, function(data) {

            if (data.code == 1){
                document.getElementById('searchValAns').innerHTML = data.message;
            } else {
                errMessage.innerHTML = "查找失败，该键对应值可能不存在";
            }
        });
    } else {
        errMessage.innerHTML = "请输入合理的key";
    }
}

function setKeyVal () {
    var key = $('#key');
    var value = $('#value');

    var errMessage = document.getElementById('errMessage');
    if (key.val() && value.val()) {
        errMessage.innerHTML = '';
        $.post('/addkv', {
            'key': key.val(),
            'value': value.val()
        }, function(data) {

            if (data.code == 1) {
                errMessage.innerHTML = "设定键值成功";
            } else {
                errMessage.innerHTML = "插入失败";
            }
        });
    } else {
        errMessage.innerHTML = "请输入合理的key-val";
    }
}

var isSearch = false;
function changePlan() {
    isSearch = !isSearch ;
    var errMess = document.getElementById('errMessage');
    errMess.innerHTML = '';
    if (isSearch) {
        $('#search').removeClass('hide');
        $('#add').addClass('hide');
    } else {
        $('#add').removeClass('hide');
        $('#search').addClass('hide');
    }
}

$(function() {
    changePlan();
});