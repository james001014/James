
document.addEventListener('DOMContentLoaded', function() {
    var steps = document.querySelectorAll('.step');
    var nextButtons = document.querySelectorAll('.next');
    var backButtons = document.querySelectorAll('.back');

    nextButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            NextStep(index + 1);
            while (CanNext) {
                CanNext=false;
                steps[index].classList.remove('active');
                steps[index].classList.add('left');
                steps[index + 1].classList.remove('right');
                steps[index + 1].classList.add('active');
            }
        });
    });

    backButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            BackStep(index);
            steps[index + 1].classList.remove('active');
            steps[index + 1].classList.add('right');
            steps[index].classList.remove('left');
            steps[index].classList.add('active');
        });
    });

    // 初始化
    steps[0].classList.add('right'); // 修改这一行
    for (var i = 1; i < steps.length; i++) {
        steps[i].classList.add('right');
    }

    // 当 DOM 完全加载后，移除 .step1 的初始状态
    setTimeout(function() {
        steps[0].classList.remove('right'); // 修改这一行
        steps[0].classList.add('active');
    }, 500);
});

var CanNext = false;
function NextStep(loadingstep){
    if(loadingstep===1){
        FirstStep();
    }
    else if(loadingstep===2){
        SecondStep();
    }
}

function BackStep(prevstep){
    UserNameInputChange();
    passwordInputChange();

}

function FirstStep(){
    if(document.getElementById("UserNameInput").value === "") {
        document.getElementById("step1Error").innerHTML = "请输入用户名";
        document.getElementById("UserNameInput").style.borderColor = "red";
        document.getElementById("step1Error").style.display = "block";
        return;
    }
    document.getElementById("step1Error").style.display = "none";
    document.getElementById("step2-username-label").innerHTML = document.getElementById("UserNameInput").value;
    CanNext=true;
}

function UserNameInputChange(){
    document.getElementById("UserNameInput").style.borderColor = "black";
    document.getElementById("step1Error").style.display = "none";
}

function SecondStep(){
    if(document.getElementById("passwordInput").value === "") {
        document.getElementById("step2Error").innerHTML = "请输入密码";
        document.getElementById("passwordInput").style.borderColor = "red";
        document.getElementById("step2Error").style.display = "block";
        return;
    }
    else if(document.getElementById("passwordInput").value.length<6||document.getElementById("UserNameInput").value.length<4){
        document.getElementById("step2Error").innerHTML = "用户名或密码错误";
        document.getElementById("passwordInput").style.borderColor = "red";
        document.getElementById("step2Error").style.display = "block";
        document.getElementById("passwordInput").value="";
        return;
    }
    if(IsVerification){
        CanNext=true;
    }
    else {
        document.getElementById("verification").style.display = "block";
        createVerification();
        document.getElementById("step2Error").style.display = "none";
    }
}

function passwordInputChange(){
    document.getElementById("passwordInput").style.borderColor = "black";
    document.getElementById("step2Error").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    var middleimages = document.querySelector('.middleimages');

    middleimages.addEventListener('click', function(event) {
        if (event.target.tagName.toLowerCase() === 'img') {
            event.target.classList.toggle('selected');
        }
    });
});

function randArr(arr) {
    for (var i = 0; i < arr.length; i++) {
        var iRand = parseInt(arr.length * Math.random());
        var temp = arr[i];
        arr[i] = arr[iRand];
        arr[iRand] = temp;
    }
    return arr;
}

// 创建一个映射来保存原始src和加密后的src的关系
var srcMap = {};
// 创建一个映射来保存原始id和加密后的id的关系
var idMap = {};

function createVerification() {
    var verification = document.getElementById('verification');
    var imageTypes=["TrafficLight","Bus","Car","Bicycle","Motorcycle","Truck"];
    var arrNew=[];
    for(var i=0;i<4;i++)
    {
        var _num = Math.floor(Math.random()*imageTypes.length)
        var mm = imageTypes[_num];
        imageTypes.splice(_num,1)
        arrNew.push(mm)
    }
    var numTypes=["1","2","3","4","5"];
    var arrnum=[];
    for(i=0;i<4;i++)
    {
        var _num2 = Math.floor(Math.random()*numTypes.length)
        var mm2 = numTypes[_num2];
        numTypes.splice(_num2,1)
        arrnum.push(mm2)
    }
    var middleimageshtml="";
    document.getElementById("imagesrighttype").innerHTML=arrNew[0];
    var mycars = new Array();
    for (var n=0; n<4; n++){
        for (var m=0; m<4; m++){
            var imgSrc = "image/robot/"+(arrNew[n]+"-"+arrnum[m])+".jpg";
            var imgId = "image"+(n*4+m);
            // 使用MD5加密图片的src和id
            var encryptedSrc = md5(imgSrc);
            var encryptedId = md5(imgId);
            // 在创建图片元素时，使用data-src属性保存原始的未加密的src路径
            mycars[n*4+m]="<img src='"+imgSrc+"' data-src='"+encryptedSrc+"' alt='img' id='"+encryptedId+"'>";
            // 保存原始src和加密后的src的映射
            srcMap[encryptedSrc] = imgSrc;
            // 保存原始id和加密后的id的映射
            idMap[imgId] = encryptedId;
        }
    }
    var name=randArr(mycars);
// for 循环
    for(var newi = 0; newi < name.length; newi++) {
        middleimageshtml+=(name[newi]);
    }
    document.getElementById("middleimages").innerHTML=middleimageshtml;
}
var IsVerification=false;
function Verifyimage(){
    var m=0;
    var n=0;
    for(var i=0; i<=15; i++){
        // 通过映射获取加密后的id
        var encryptedId = idMap["image"+i];
        var element = document.getElementById(encryptedId);
        if(element && element.classList.contains("selected")){
            // 获取加密后的src
            var encryptedSrc = element.getAttribute('data-src');
            // 通过映射获取原始的src
            var str = srcMap[encryptedSrc];
            if(str.indexOf((document.getElementById("imagesrighttype").innerHTML)) !== -1){
                m++;
            }
            n++;
        }
    }
    if(m === n && m !== 0){
        document.getElementById("verification").style.display="none";
        IsVerification=true;
    }
    else{
        document.getElementById("TripWords1").innerHTML="Please try again";
        createVerification();
    }
}
