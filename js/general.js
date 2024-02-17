
// JavaScript
window.onload = function () {
    ChangePageHeight();
}
window.onresize = function () {
    ChangePageHeight();
}

// 获取所有的控件元素
var elements = document.querySelectorAll('input,button,a');
var focusedInput="";
var focusedLink="";
// 对每个控件元素添加事件监听器
elements.forEach(function(element) {
    element.addEventListener('mouseup', function() {
        if(this.tagName.toUpperCase()==="INPUT"){
            focusedInput=this.id;
        }
        else{
            focusedInput="";
        }


        if(this.tagName.toUpperCase()==="BUTTON"){

            if(this.type.toUpperCase()==="SUBMIT"){
                focusedLink=this.id;

            }
            else{
                focusedLink="";
            }
        }
        else if(this.tagName.toUpperCase()==="A"){
            if(this.href!==""){
                focusedLink=this.id;
            }
            else{
                focusedLink="";
            }
        }
        else{
            focusedLink="";
        }
    });
});

function ChangePageHeight() {
    var pageHeight = window.innerHeight;
    if(pageHeight>=450){
        document.documentElement.style.setProperty("--dropdown-height", "350px")
    }
    else{
        document.documentElement.style.setProperty("--dropdown-height", (pageHeight-50) + "px")
    }
}

// 获取所有的按钮元素
var buttons = document.querySelectorAll('.button');
var mousedownTime;

/*// 对每个按钮元素添加事件监听器
buttons.forEach(function(button) {
    button.addEventListener('mousedown', function (e) {
        if (this.disabled) return; // 检查按钮是否被禁用
        // 记录mousedown事件发生的时间
        mousedownTime = new Date().getTime();

        // 创建波纹元素
        var ripple = document.createElement('div');
        ripple.className = 'ripple slow';

        // 计算点击位置
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        // 设置波纹元素的位置和初始大小
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = 0;
        ripple.style.height = 0;

        // 添加波纹元素到按钮中
        this.appendChild(ripple);

        // 开始慢速扩散动画
        requestAnimationFrame(function () {
            ripple.style.width = rect.width + 'px';
            ripple.style.height = rect.width + 'px';
            ripple.style.left = x - rect.width / 2 + 'px';
            ripple.style.top = y - rect.width / 2 + 'px';
        }); // 使用requestAnimationFrame来优化动画

        ripple.addEventListener('transitionend', function () {
            this.remove(); // 动画结束后移除波纹元素
        });
    });

    button.addEventListener('mouseup', function () {
        changeRippleSpeed();
    });

    button.addEventListener('mouseleave', function () {
        changeRippleSpeed();
    });
});

function changeRippleSpeed() {
    // 计算mousedown和mouseup事件之间的时间差
    var mouseupTime = new Date().getTime();
    var timeDiff = mouseupTime - mousedownTime;

    // 找到所有的波纹元素
    var ripples = document.querySelectorAll('.ripple.slow');

    // 改变所有波纹元素的动画速度
    ripples.forEach(function(ripple) {
        if (timeDiff < 200) {
            // 如果用户快速点击了按钮，使用一个较慢的动画
            ripple.className = 'ripple slower';

        } else {
            ripple.className = 'ripple fast';
        }

        // 动画结束后移除波纹元素，并显示反馈信息
        setTimeout(function () {
            ripple.remove();
            console.log('Ripple animation ended.'); // 添加回调函数
        }, 300);
    });
}*/

// 对每个按钮元素添加事件监听器
buttons.forEach(function(button) {
    button.addEventListener('mousedown', function (e) {
        if (this.disabled) return; // 检查按钮是否被禁用
        // 记录mousedown事件发生的时间
        mousedownTime = new Date().getTime();

        // 创建波纹元素
        var ripple = document.createElement('div');
        ripple.className = 'ripple slow';

        // 根据按钮的类别添加相应的波纹类
        if (button.classList.contains('btn-primary')) {
            ripple.classList.add('ripple-primary');
        } else if (button.classList.contains('btn-red')) {
            ripple.classList.add('ripple-primary');
        } else {
            ripple.classList.add('ripple-white');
        }

        // 计算点击位置
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        // 设置波纹元素的位置和初始大小
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = 0;
        ripple.style.height = 0;

        // 添加波纹元素到按钮中
        this.appendChild(ripple);

        // 开始慢速扩散动画
        requestAnimationFrame(function () {
            ripple.style.width = rect.width + 'px';
            ripple.style.height = rect.width + 'px';
            ripple.style.left = x - rect.width / 2 + 'px';
            ripple.style.top = y - rect.width / 2 + 'px';
        }); // 使用requestAnimationFrame来优化动画

        ripple.addEventListener('transitionend', function () {
            this.remove(); // 动画结束后移除波纹元素
        });
    });

    button.addEventListener('mouseup', function () {
        changeRippleSpeed();
    });

    button.addEventListener('mouseleave', function () {
        changeRippleSpeed();
    });
});

function changeRippleSpeed() {
    // 计算mousedown和mouseup事件之间的时间差
    var mouseupTime = new Date().getTime();
    var timeDiff = mouseupTime - mousedownTime;

    // 找到所有的波纹元素
    var ripples = document.querySelectorAll('.ripple.slow');

    // 改变所有波纹元素的动画速度
    ripples.forEach(function (ripple) {
        var rippleColorClass = ripple.classList.contains('ripple-primary') ? 'ripple-primary' : 'ripple-white';
        if (timeDiff < 200) {
            // 如果用户快速点击了按钮，使用一个较慢的动画
            ripple.className = 'ripple slower ' + rippleColorClass;

        } else {
            ripple.className = 'ripple fast ' + rippleColorClass;
        }

        // 动画结束后移除波纹元素，并显示反馈信息
        setTimeout(function () {
            ripple.remove();
            console.log('Ripple animation ended.'); // 添加回调函数
        }, 300);
    });
}


// 获取所有的输入框元素和线条元素
var inputFields = document.querySelectorAll('.input-field');
var lines = document.querySelectorAll('.input-line');

// 对每个输入框元素添加事件监听器
inputFields.forEach(function(input, index) {
    var line = lines[index]; // 获取与输入框关联的线条元素
    var IsInputBlur = 1;

    input.addEventListener('click', function (event) {
        if(IsInputBlur==1) {
            IsInputBlur=0;
            var rect = this.getBoundingClientRect();
            var x = event.clientX - rect.left; // 获取鼠标点击的位置
            line.style.left = x + 'px'; // 设置线的起始位置
            line.style.animation = "input-line 0.2s linear forwards";
            setTimeout(function () {
                if(IsInputBlur==0) {
                    line.style.animation = "none";
                    line.style.left = '0'; // 设置线的起始位置
                    line.style.width = '100%'; // 设置线的起始位置
                }
                else{
                    line.style.animation = "none";
                }
            }, 200);
        }
    });

    input.addEventListener('blur', function () {
        IsInputBlur=1;
        line.style.width = '0';
    });

    input.addEventListener('input', function () {
        var placeholder = this.nextElementSibling;
        if (this.value) {
            placeholder.style.transform = 'translateY(-20px) scale(0.8)';
        } else {
            placeholder.style.transform = '';
        }
    });
});



