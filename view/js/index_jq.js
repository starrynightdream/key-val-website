function toIndex() {
    window.location.href = '/';
}
function toKeyVal() {
    window.location.href = '/sas';
}
function toLogin() {
    window.location.href = '/lar';
}

$(function() {

    $.post('/user', 
    {},
    function (data){
        document.getElementById('name')
            .innerHTML = ('<h1>Welcome  ' + (data.message ? data.message: '无名') + '</h1>');
    });
});