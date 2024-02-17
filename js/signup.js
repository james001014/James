document.addEventListener('DOMContentLoaded', function() {
    var steps = document.querySelectorAll('.step');
    var nextButtons = document.querySelectorAll('.next');
    var backButtons = document.querySelectorAll('.back');

    nextButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            NextStep(index + 1);
            if (CanNext) {
                CanNext=false;
                if(index=== 0 ||index=== 1){
                    steps[index].classList.remove('active');
                    steps[index].classList.add('left');
                    steps[2].classList.remove('right');
                    steps[2].classList.add('active');
                }
                else {
                    steps[index].classList.remove('active');
                    steps[index].classList.add('left');
                    steps[index + 1].classList.remove('right');
                    steps[index + 1].classList.add('active');
                }
            }
        });
    });

    backButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            BackStep(index);
            if(index === 0){
                steps[2].classList.remove('active');
                steps[2].classList.add('right');
                steps[0].classList.remove('left');
                steps[0].classList.add('active');
            }
            steps[index + 1].classList.remove('active');
            steps[index + 1].classList.add('right');
            steps[index].classList.remove('left');
            steps[index].classList.add('active');
        });
    });

    // 初始化
    steps[0].classList.add('right');
    for (var i = 1; i < steps.length; i++) {
        steps[i].classList.add('right');
    }

    // 当 DOM 完全加载后，移除 .step1 的初始状态
    setTimeout(function() {
        steps[0].classList.remove('right');
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
    else if(loadingstep===3){
        ThirdStep();
    }
}

function BackStep(prevstep){
    UserNameInputChange();
    EmailInputChange();
    PasswordInputChange();
    ConfirmPasswordInputChange();
}

function FirstStep(){
    // 在这里添加用户名验证逻辑
    CanNext=true;
}

function UserNameInputChange(){
    // 在这里添加用户名输入框变化时的逻辑
}

function SecondStep(){
    // 在这里添加电子邮件验证逻辑
}

function EmailInputChange(){
    // 在这里添加电子邮件输入框变化时的逻辑
}

function ThirdStep(){
    // 在这里添加密码验证逻辑
}

function PasswordInputChange(){
    // 在这里添加密码输入框变化时的逻辑
}

function ConfirmPasswordInputChange(){
    // 在这里添加确认密码输入框变化时的逻辑
}

function SignByPhone(){
    var steps = document.querySelectorAll('.step');
    steps[0].classList.remove('active');
    steps[0].classList.add('left');
    steps[1].classList.remove('right');
    steps[1].classList.add('active');
}

function SignByEMail(){
    var steps = document.querySelectorAll('.step');
    steps[1].classList.remove('active');
    steps[1].classList.add('right');
    steps[0].classList.remove('left');
    steps[0].classList.add('active');
}


document.querySelectorAll('.country-dropdown-content a').forEach(function(a) {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        var countryCode = this.dataset.code;
        var countryName = this.querySelector('.flag-icon').outerHTML;
        document.querySelector('.dropbtn').innerHTML = countryName + ' ' + countryCode;
    });
});