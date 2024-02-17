// 获取所有的 li 元素
var liElements = document.querySelectorAll('nav ul li');

// 为每个 li 元素添加点击事件监听器
liElements.forEach(function(li) {
    li.addEventListener('click', function(event) {
        // 获取 li 元素内部的 a 元素
        var aElement = li.querySelector('a');

        // 如果 a 元素存在，那么模拟点击 a 元素
        if (aElement) {
            aElement.click();
        }
    });
});



// 获取所有的.showDropDown元素
var dropdownToggles = document.querySelectorAll('.showDropDown');
// 对每个.showDropDown元素添加点击事件监听器
var IsDropdownShow=false;
var IsHoverDropdownShow=false;

dropdownToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function(event) {
        // 阻止链接的默认行为
        event.preventDefault();

        if(IsDropdownShow){
            dropdownToggles.forEach(function(toggle) {
                var dropdown = toggle.nextElementSibling;
                if (dropdown.style.display !== 'none') {
                    //dropdown.style.display = 'none';
                    dropdown.style.animation="dropdowndowntoup 0.15s cubic-bezier(0.23, 1, 0.32, 1)  forwards";
                    toggle.parentElement.classList.remove("primaryactive");
                    dropdowncontent=dropdown;
                    let hnewPages = document.querySelectorAll('.new-page');
                    // 为每个新页面移除active类
                    hnewPages.forEach(function(newPage) {
                        newPage.classList.remove('active');
                    });
                    IsDropdownShow=false;
                    IsHoverDropdownShow=false;
                }
            });
        }

        // 获取与.showDropDown元素关联的下拉列表
        var dropdown = this.nextElementSibling;
        // 切换下拉列表的显示状态
        dropdown.style.display = 'block';
        IsDropdownShow=true;
        if(dropdown.style.display === 'block'){
            dropdowncontent=null;
        }
        if(!IsHoverDropdownShow || dropdown.classList.contains("rightdropdown")) {
            dropdown.style.animation = "dropdownuptodown 0.15s cubic-bezier(0.23, 1, 0.32, 1)  forwards";
        }
        else{
            dropdown.style.animation = "dropdownuptodown 0s cubic-bezier(0.23, 1, 0.32, 1)  forwards";
        }
        this.parentElement.classList.add('primaryactive');
        // 阻止事件进一步传播
        event.stopPropagation();
    });

    toggle.addEventListener('mouseover', function(event) {
        var dropdown = this.nextElementSibling;
        if(!((IsDropdownShow || dropdown.classList.contains("rightdropdown")) || IsHoverDropdownShow)){
            // 切换下拉列表的显示状态
            dropdown.style.display = 'block';
            dropdown.style.animation="dropdownuptodown 0.15s cubic-bezier(0.23, 1, 0.32, 1)  forwards";
            this.parentElement.classList.add('primaryactive');
            IsHoverDropdownShow=true;

            // 更新 HoverShowDropdown
            HoverShowDropdown = this;
        }
    });
    toggle.addEventListener('mouseout', function(event) {
        // 获取与.showDropDown元素关联的下拉列表
        var dropdown = this.nextElementSibling;
        if((!(IsDropdownShow || dropdown.classList.contains("rightdropdown"))) && IsHoverDropdownShow){
            var pelement = document.elementFromPoint(event.clientX, event.clientY);
            if(pelement){
                var rect = this.getBoundingClientRect();
                if(pelement.classList.contains("dropdown") || pelement.classList.contains("dropdown *") || pelement.classList.contains("showDropDown") || pelement.classList.contains("showDropDown *")){
                    HoverShowDropdown=this;
                    return;
                }
                else if(event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom + 20){
                    HoverShowDropdown=this;
                    return;
                }
            }
            // 切换下拉列表的显示状态
            dropdown.style.display = 'none';
            dropdown.style.animation="dropdowndowntoup 0.15s cubic-bezier(0.23, 1, 0.32, 1)  forwards";
            this.parentElement.classList.remove('primaryactive');
            IsHoverDropdownShow=false;
        }
    });
});
var HoverShowDropdown;
document.addEventListener("mousemove", (event) => {
    if(HoverShowDropdown) {
        // 获取与.showDropDown元素关联的下拉列表
        var dropdown = HoverShowDropdown.nextElementSibling;
        if ((!(IsDropdownShow || dropdown.classList.contains("rightdropdown"))) && IsHoverDropdownShow) {

            var pelement = document.elementFromPoint(event.clientX, event.clientY);
            if (pelement) {
                var rect = HoverShowDropdown.getBoundingClientRect();
                var dropdownRect = dropdown.getBoundingClientRect();
                if (event.clientX >= dropdownRect.left && event.clientX <= dropdownRect.right && event.clientY >= dropdownRect.top && event.clientY <= dropdownRect.bottom) {
                    return;
                }else if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top - 20 && event.clientY <= rect.bottom + 20) {
                    return;
                }
            }
            // 切换下拉列表的显示状态
            dropdown.style.display = 'none';
            dropdown.style.animation = "dropdowndowntoup 0.15s cubic-bezier(0.23, 1, 0.32, 1)  forwards";
            HoverShowDropdown.parentElement.classList.remove('primaryactive');
            IsHoverDropdownShow = false;
        }
    }
});

var dropdowncontent;
// 在文档上添加点击事件监听器，使用事件捕获
document.addEventListener('click', function(event) {
    // 检查点击的元素是否是下拉列表或其触发元素
    var isDropdownContent = event.target.matches('.dropdown, .dropdown *, .showDropDown, .showDropDown *');

    // 如果点击的元素不是下拉列表，隐藏所有的下拉列表
    if (!isDropdownContent) {
        dropdownToggles.forEach(function(toggle) {
            var dropdown = toggle.nextElementSibling;
            if (dropdown.style.display !== 'none') {
                //dropdown.style.display = 'none';
                dropdown.style.animation="dropdowndowntoup 0.15s cubic-bezier(0.23, 1, 0.32, 1) forwards";
                toggle.parentElement.classList.remove("primaryactive");
                dropdowncontent=dropdown;
                let hnewPages = document.querySelectorAll('.new-page');
                // 为每个新页面移除active类
                hnewPages.forEach(function(newPage) {
                    newPage.classList.remove('active');
                });
                IsDropdownShow=false;
                IsHoverDropdownShow=false;
            }
        });
    }

    var isselectContent = event.target.matches('.selectDiv, .selectDiv *');
    if (!isselectContent) {
        document.querySelectorAll('.selectDropDown').forEach(function(selectDiv) {
            if(selectDiv.classList.contains("active")) {
                selectDiv.parentElement.getElementsByClassName("selectBox")[0].click();
            }
        });
    }

}, true); // 注意这里的第三个参数设置为 true，表示使用事件捕获


document.getElementById('sun-icon').addEventListener('animationend', function() {
    if(dropdowncontent.style.display !== 'none'){
        dropdowncontent.style.display = 'none';
    }
});


document.getElementById('menu-button').addEventListener('click', function() {
    var mmenu = document.getElementById('mmenu');
    var mmenuback = document.getElementById('mmenuback');
    mmenu.classList.toggle('show');
    mmenuback.style.display = mmenuback.style.display === 'none' ? 'block' : 'none';
    document.getElementById("menu-button").className= mmenuback.style.display === 'none' ? 'menu-button button btn-white' : 'menu-button button btn-primary';
    document.body.style.overflow = mmenuback.style.display === 'none' ? 'auto' : 'hidden';
});

// 获取SVG横杠
let topBar = document.querySelector('#menu-button svg path:nth-child(1)');
let middleBar = document.querySelector('#menu-button svg path:nth-child(2)');
let bottomBar = document.querySelector('#menu-button svg path:nth-child(3)');

// 获取菜单按钮
let menuButton = document.getElementById('menu-button');

// 监听菜单按钮的点击事件
menuButton.addEventListener('click', function() {
    // 当mmenu打开时
    if (document.getElementById('mmenu').classList.contains('show')) {
        // 添加旋转动画
        bottomBar.style.animation = 'rotateInTop 0.5s forwards';
        topBar.style.animation = 'rotateInBottom 0.5s forwards';

        // 添加消失动画
        middleBar.style.animation = 'fadeOut 0.5s forwards';
    } else {
        // 添加旋转动画
        bottomBar.style.animation = 'rotateOutTop 0.5s forwards';
        topBar.style.animation = 'rotateOutBottom 0.5s forwards';

        // 移除消失动画
        middleBar.style.animation = '';
    }
});


document.getElementById('expand-button').addEventListener('click', function() {
    var leftSidebar = document.getElementById('left-sidebar');
    var sidebarButtons = document.querySelectorAll('.sidebar-button');
    if (leftSidebar.classList.contains('expanded')) {
        leftSidebar.classList.remove('expanded');
        document.getElementById("expandIcon").classList.remove("expanded");
        sidebarButtons.forEach(function(button) {
            button.classList.remove('expanded');
        });
    } else {
        leftSidebar.classList.add('expanded');
        document.getElementById("expandIcon").classList.toggle("expanded");
        sidebarButtons.forEach(function(button) {
            button.classList.add('expanded');
        });
    }
});

// 获取右键菜单和菜单项
var contextMenu = document.getElementById('context-menu');
var menuItems = document.querySelectorAll('.context-menu-item');

var SelectedText="";
var SelectedLink="";

// 添加右键点击事件监听器
window.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    if(contextMenu.style.display == 'block'){
        focusedLink="";
        focusedInput="";
        contextMenu.classList.remove("contextshow");
        setTimeout(function() { contextMenu.style.display = 'none'; }, 150);
        return;
    }
    var contextItem=3;
    // 设置右键菜单的位置并显示它
    contextMenu.style.top = e.pageY + 'px';
    contextMenu.style.left = e.pageX + 'px';
    if(focusedLink===""){
        document.getElementById("LinkContextMenu").style.display="none";
    }
    else{
        document.getElementById("LinkContextMenu").style.display="block";
        SelectedLink=focusedLink;
        contextItem += 3;
    }

    if(window.getSelection().toString()===""){
        document.getElementById("TextContextMenu").style.display="none";
    }
    else{
        document.getElementById("TextContextMenu").style.display="block";
        SelectedText=window.getSelection().toString();
        contextItem+=3;
    }

    if(focusedInput===""){
        document.getElementById("InputContextMenu").style.display="none";
    }
    else{
        document.getElementById("InputContextMenu").style.display="block";
        contextItem+=2;
    }

    var contextMenuHeight = contextItem * 30; // 计算右键菜单的高度
    var viewportHeight = window.innerHeight; // 获取视口的高度
    var viewportWidth = window.innerWidth; // 获取视口的高度
    var clickPositionFromBottom = viewportHeight - e.pageY; // 计算鼠标点击的位置离视口底部的距离

    // 如果鼠标点击的位置离视口底部的距离小于右键菜单的高度，那么就让右键菜单向上弹出
    if (clickPositionFromBottom < contextMenuHeight) {
        contextMenu.style.top = (e.pageY - contextMenuHeight) + 'px';
    }

    if (viewportWidth-e.pageX < 150) {
        contextMenu.style.left = (e.pageX - 150) + 'px';
    }

    if(viewportHeight<(2*contextMenuHeight) && ( clickPositionFromBottom<=contextMenuHeight && e.pageY<=contextMenuHeight)){
        document.documentElement.style.setProperty("--context-menu-height", (viewportHeight-2)+"px");
        contextMenu.style.top="0px";
    }
    else{
        document.documentElement.style.setProperty("--context-menu-height", contextItem*30 + 'px');
    }

    if(viewportWidth<300 && ( viewportWidth-(viewportWidth-e.pageX)<=150 && viewportWidth-e.pageX<=150)){
        contextMenu.style.left="0";
    }


    contextMenu.style.display = 'block';
    setTimeout(function() { contextMenu.classList.toggle("contextshow") }, 20);
});

// 添加菜单项的点击事件监听器
menuItems.forEach(function(menuItem) {
    menuItem.addEventListener('click', function() {

    });
});

// 当用户点击其他地方时，隐藏右键菜单
window.addEventListener('click', function() {
    focusedLink="";
    focusedInput="";
    contextMenu.classList.remove("contextshow");
    setTimeout(function() { contextMenu.style.display = 'none'; }, 150);
});
var LinkTarget="_self";
function OpenLinkOnNewTab(){
    var TheLink=document.getElementById(SelectedLink);
    if(TheLink.tagName.toUpperCase()==="BUTTON"){
        LinkTarget="_blank";
        TheLink.click();
        setTimeout(function() { LinkTarget="_self"; }, 50);
    }
    else if(TheLink.tagName.toUpperCase()==="A"){
        window.open(TheLink.href,"_blank");
    }
}

function OpenLinkOnNewWindow(){
    var TheLink=document.getElementById(SelectedLink);
    if(TheLink.tagName.toUpperCase()==="BUTTON"){
        var ReadyToOpenLink=(TheLink.onclick.toString().substring(TheLink.onclick.toString().indexOf("'") + 1,TheLink.onclick.toString().indexOf("'",TheLink.onclick.toString().indexOf("'") + 1)));
        window.open(ReadyToOpenLink,'New Window','toolbar=yes,resizable=yes,location=yes,status=yes');
    }
    else if(TheLink.tagName.toUpperCase()==="A"){
        window.open(TheLink.href,'New Window','toolbar=yes,resizable=yes,location=yes,status=yes');
    }
}

function CopyLink(){
    var TheLink=document.getElementById(SelectedLink);
    if(TheLink.tagName.toUpperCase()==="BUTTON"){
        var ReadyToOpenLink=(TheLink.onclick.toString().substring(TheLink.onclick.toString().indexOf("'") + 1,TheLink.onclick.toString().indexOf("'",TheLink.onclick.toString().indexOf("'") + 1)));
        navigator.clipboard.writeText(ReadyToOpenLink).then(() => {
            alert("复制成功！")
        }).catch((err)=>{
            alert("复制失败！")
        })
    }
    else if(TheLink.tagName.toUpperCase()==="A"){
        navigator.clipboard.writeText(TheLink.href).then(() => {
        }).catch((err)=>{
            console.log("Failed to copy!");
        })
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.button-card');
    buttons.forEach(function(button) {
        var aura = document.createElement('div');
        aura.className = 'aura';
        button.appendChild(aura);

        button.addEventListener('mousemove', function(e) {
            var rect = button.getBoundingClientRect();
            aura.style.left = e.clientX - rect.left - 1 + 'px';
            aura.style.top = e.clientY - rect.top - 1 + 'px';
            if (e.buttons !== 1) { // 如果鼠标没有被按下
                aura.style.opacity = '1';
            }
        });

        button.addEventListener('mouseout', function(e) {
            if (e.buttons !== 1) { // 如果鼠标没有被按下
                aura.style.opacity = '0';
                aura.classList.remove('clicked');
                aura.classList.add('unclicked');
            }
        });

        button.addEventListener('mousedown', function() {
            aura.classList.remove('unclicked');
            aura.classList.add('clicked');
            aura.style.opacity = '1';
        });

        button.addEventListener('mouseup', function(e) {
            var rect = button.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                // 如果鼠标在按钮内
                aura.classList.remove('clicked');
                aura.classList.add('unclicked');
            } else {
                // 如果鼠标不在按钮内
                aura.style.opacity = '0';
                aura.classList.remove('clicked');
                aura.classList.add('unclicked');
            }
        });
    });

    // 添加全局的 mouseup 事件监听器
    document.addEventListener('mouseup', function(e) {
        var buttons = document.querySelectorAll('.button-card');
        buttons.forEach(function(button) {
            var aura = button.querySelector('.aura');
            var rect = button.getBoundingClientRect();
            if (!(e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom)) {
                // 如果鼠标不在按钮内
                aura.style.opacity = '0';
                aura.classList.remove('clicked');
                aura.classList.add('unclicked');
            }
        });
    });
});

document.getElementById('theme-switcher').addEventListener('click', function() {
    var sunIcon = document.getElementById('sun-icon');
    var moonIcon = document.getElementById('moon-icon');
    var isDarkMode = window.getComputedStyle(sunIcon).opacity === '1';

    sunIcon.style.opacity = isDarkMode ? '0' : '1';
    moonIcon.style.opacity = isDarkMode ? '1' : '0';

    // 立即更改 display 属性
    sunIcon.style.display = isDarkMode ? 'none' : 'block';
    moonIcon.style.display = isDarkMode ? 'block' : 'none';

    // 切换图标的颜色
    sunIcon.classList.toggle('dark-mode');
    moonIcon.classList.toggle('dark-mode');

    document.documentElement.style.setProperty('--main-text-color', isDarkMode ? '#fff' : '#000');
    document.documentElement.style.setProperty('--main-text', isDarkMode ? '255,255,255' : '0,0,0');
    document.documentElement.style.setProperty('--main-background', isDarkMode ? '0,0,0' : '255,255,255');
    document.documentElement.style.setProperty('--hover-color', isDarkMode ? '#393A3B' : 'rgb(228, 230, 233)');
    setCookie('theme', isDarkMode ? 'dark' : 'light', 30);
});

// 添加 transitionend 事件监听器
document.getElementById('sun-icon').addEventListener('transitionend', function() {
    this.style.display = this.style.opacity === '0' ? 'none' : 'block';
});

document.getElementById('moon-icon').addEventListener('transitionend', function() {
    this.style.display = this.style.opacity === '0' ? 'none' : 'block';
});

// 在页面加载时设置 sun-icon 的 display 属性为 'block'
window.onload = function() {
    var SlowTimeOut=setTimeout(function () {
        showSnackbar('当前网络速度似乎较慢，请耐心等待。','info');
    },10000);


    document.getElementById('sun-icon').style.display = 'block';

    var fontSelectorValue = getCookie('fontSelector');
    var themeSelectorValue = getCookie('themeSelector');
    var sizeSelectorValue = getCookie('sizeSelector');

    if (fontSelectorValue) {
        fontSelector.value = fontSelectorValue;
        fontSelector.dispatchEvent(new Event('change'));
    }
    if (themeSelectorValue) {
        themeSelector.value = themeSelectorValue;
        themeSelector.dispatchEvent(new Event('change'));
    }
    if (sizeSelectorValue) {
        document.getElementById('size-selector').value = sizeSelectorValue;
        document.getElementById('size-selector').dispatchEvent(new Event('change'));
    }

    let fontStyle = getCookie('fontStyle');
    let textAlign = getCookie('textAlign');
    let shortcut = getCookie('shortcut');

    if (fontStyle) {
        fontStyleSelector.value = fontStyle;
        fontStyleSelector.dispatchEvent(new Event('change'));
    }
    if (textAlign) {
        textAlignSelector.value = textAlign;
        textAlignSelector.dispatchEvent(new Event('change'));
    }
    if (shortcut) {
        shortcutSelector.value = shortcut;
        shortcutSelector.dispatchEvent(new Event('change'));
    }

    // 获取拥有 DefaultSelection 类的按钮
    var defaultButton = document.querySelectorAll('.DefaultSelection');
    defaultButton.forEach(function (defbutton){
        // 模拟点击事件
        if (defbutton) {
            defbutton.click();
        }
    });

    var theme = getCookie('theme') || 'light';  // 如果cookie中没有用户的选择，使用默认的白色模式

    var sunIcon = document.getElementById('sun-icon');
    var moonIcon = document.getElementById('moon-icon');

    var isDarkMode = theme === 'dark';

    sunIcon.style.opacity = isDarkMode ? '0' : '1';
    moonIcon.style.opacity = isDarkMode ? '1' : '0';

    // 立即更改 display 属性
    sunIcon.style.display = isDarkMode ? 'none' : 'block';
    moonIcon.style.display = isDarkMode ? 'block' : 'none';

    // 切换图标的颜色
    sunIcon.classList.toggle('dark-mode', isDarkMode);
    moonIcon.classList.toggle('dark-mode', isDarkMode);

    document.documentElement.style.setProperty('--main-text-color', isDarkMode ? '#fff' : '#000');
    document.documentElement.style.setProperty('--main-text', isDarkMode ? '255,255,255' : '0,0,0');
    document.documentElement.style.setProperty('--main-background', isDarkMode ? '0,0,0' : '255,255,255');
    document.documentElement.style.setProperty('--hover-color', isDarkMode ? '#393A3B' : 'rgb(228, 230, 233)');


    var onpanels = document.querySelectorAll('.collapse-panel');
    onpanels.forEach(panel => {
        panel.querySelector('.panel-body').style.display="none";
    });
    setTimeout(function() {document.getElementById("topLoading").style.display="none";},5);
    clearTimeout(SlowTimeOut);
};

/*document.querySelectorAll('.rightbuttons button').forEach(button => {
    button.addEventListener('click', () => {
        const dropdown = button.querySelector('.dropdown');
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });
});*/

// 获取所有的触发按钮
let switchAccountButtons = document.querySelectorAll('.new-page-button');
// 获取所有的新页面
let newPages = document.querySelectorAll('.new-page');
// 获取所有的返回按钮
let backButtons = document.querySelectorAll('.back-button');

// 为每个触发按钮添加事件监听器
switchAccountButtons.forEach(function(button, index) {
    button.addEventListener('click', function() {
        // 获取对应的新页面
        let newPage = newPages[index];
        // 添加active类，使新页面滑入
        newPage.classList.add('active');
    });
});

// 为每个返回按钮添加事件监听器
backButtons.forEach(function(button, index) {
    button.addEventListener('click', function() {
        // 获取对应的新页面
        let newPage = newPages[index];
        // 移除active类，使新页面滑出
        newPage.classList.remove('active');
    });
});

document.querySelectorAll('.modal-trigger').forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        document.getElementById('modal-background').style.display="block";
        setTimeout(function() { document.getElementById('modal-background').classList.toggle('active'); }, 20);
        var elements = document.getElementsByClassName("modal");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].id===modalId) {
                elements[i].style.display="block";
                elements[i].classList.toggle('active');
            }
            else {
                if(elements[i].classList.contains("active"))
                {
                    elements[i].classList.remove('active');
                }
                elements[i].style.display="none";
            }
        }

    });
});

document.getElementById('modal-background').addEventListener('click', e => {
    if (e.target === e.currentTarget) {
        const modal = e.currentTarget.querySelector('.modal.active.modal-dismissible');
        if (modal) {
            modal.classList.remove('active');
            e.currentTarget.classList.remove('active');
            setTimeout(function() { document.getElementById('modal-background').style.display="none"; }, 150);

        }
    }
});

document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => {
        CloseModal(button);
    });
});

function CloseModal(button){
    const modal = button.closest('.modal');
    modal.classList.remove('active');
    document.getElementById('modal-background').classList.remove('active');
    setTimeout(function() { document.getElementById('modal-background').style.display="none"; }, 150);
}

// 创建一个映射，将font-family名称映射到更友好的名称
let fontNameMapping = {
    "Inter": "Inter(默认)",
    "HanSansCN": "思源黑体",
    "XheiIntel": "Xhei Intel",
    "OpenSans": "OpenSans",
    "JBMono": "JetBrains Mono",
};

// 获取所有在CSS中定义的@font-face规则
let fontFaces = Array.from(document.styleSheets)
    .flatMap(sheet => Array.from(sheet.cssRules))
    .filter(rule => rule instanceof CSSFontFaceRule)
    .map(rule => rule.style.fontFamily.replace(/['"]/g, ''));  // 去除字体名周围的引号


// 获取字体选择器元素
let fontSelector = document.getElementById('font-selector');

// 将所有字体添加到字体选择器中
for (let font of fontFaces) {
    let option = document.createElement('option');
    option.value = font;
    option.textContent = fontNameMapping[font] || font;  // 使用映射获取友好的名称，如果没有映射，则使用原始的font-family名称
    fontSelector.appendChild(option);
}

// 监听字体选择器的change事件
fontSelector.addEventListener('change', function() {
    // 更新页面的字体
    document.documentElement.style.setProperty('--main-font', this.value);
    setCookie('fontSelector', this.value, 14);
});

let themeColors = {
    "blue": {
        "--main-bt-color": "rgb(25, 118, 210)",
        "--main-bt": "25, 118, 210",
        "--hover-bt-color": "#1668B8",
        "--active-bt-color": "#13599e",
        "--light-bt-color": "#70a0cb"
    },
    "green": {
        "--main-bt-color": "rgb(0, 200, 83)",
        "--main-bt": "0, 200, 83",
        "--hover-bt-color": "#008c4a",
        "--active-bt-color": "#00753c",
        "--light-bt-color": "#33cc99"
    },
    "red": {
        "--main-bt-color": "rgb(255, 0, 0)",
        "--main-bt": "255, 0, 0",
        "--hover-bt-color": "#cc0000",
        "--active-bt-color": "#990000",
        "--light-bt-color": "#ff6666"
    },
    "yellow": {
        "--main-bt-color": "rgb(204, 204, 0)",
        "--main-bt": "204, 204, 0",
        "--hover-bt-color": "#919400",
        "--active-bt-color": "#999900",
        "--light-bt-color": "#ffff66"
    },
    "pink": {
        "--main-bt-color": "rgb(255, 105, 180)",
        "--main-bt": "255, 105, 180",
        "--hover-bt-color": "#cc6691",
        "--active-bt-color": "#993366",
        "--light-bt-color": "#ff85b1"
    },
    "brown": {
        "--main-bt-color": "rgb(165, 42, 42)",
        "--main-bt": "165, 42, 42",
        "--hover-bt-color": "#993333",
        "--active-bt-color": "#662222",
        "--light-bt-color": "#a86666"
    },
    "black": {
        "--main-bt-color": "rgb(0, 0, 0)",
        "--main-bt": "0, 0, 0",
        "--hover-bt-color": "#333333",
        "--active-bt-color": "#666666",
        "--light-bt-color": "#999999"
    }
};

let themeSelector = document.getElementById('theme-selector');

themeSelector.innerHTML = `
    <option value="blue">蓝色</option>
    <option value="green">绿色</option>
    <option value="red">红色</option>
    <option value="yellow">黄色</option>
    <option value="pink">粉色</option>
    <option value="brown">棕色</option>
    <option value="black">黑色</option>
    <option value="high-contrast">高对比度</option>
`;

themeSelector.addEventListener('change', function() {
    let theme = this.value;
    let colors = themeColors[theme];
    if(this.value==="high-contrast"){
        if(isHighContrastMode){
            return;
        }
        HighContrastMode();
        return;
    }
    else if(isHighContrastMode){
        HighContrastMode();
    }
    for (let color in colors) {
        document.documentElement.style.setProperty(color, colors[color]);
    }
    setCookie('themeSelector', this.value, 14);
});

let isHighContrastMode = false;

function HighContrastMode() {
    if(isHighContrastMode){
        isHighContrastMode=false;
        document.getElementById("theme-switcher").disabled=false;
        document.documentElement.style.setProperty("--link-color", "#007bff");
        document.documentElement.style.setProperty("--main-bt-color", "rgb(25, 118, 210)");
        document.documentElement.style.setProperty("--main-bt", "25, 118, 210");
        document.documentElement.style.setProperty("--hover-bt-color", "#1668B8");
        document.documentElement.style.setProperty("--active-bt-color", "#13599e");
        document.documentElement.style.setProperty("--light-bt-color", "#70a0cb");
        document.documentElement.style.setProperty("--main-text-color", "#000");
        document.documentElement.style.setProperty("--primary-text-color", "#fff");
        document.documentElement.style.setProperty("--main-text", "0,0,0");
        document.documentElement.style.setProperty("--main-background", "255,255,255");
        document.documentElement.style.setProperty("--border-radius", "4px");
        document.documentElement.style.setProperty("--shadow-color", "#9D9FA1");
        document.documentElement.style.setProperty("--border-color", "rgb(228, 230, 233)");
        document.documentElement.style.setProperty("--hover-color", "rgb(228, 230, 233)");
    }
    else{
        isHighContrastMode=true;
        document.getElementById("theme-switcher").disabled=true;
        document.documentElement.style.setProperty("--link-color", "rgb(255,255,0)");
        document.documentElement.style.setProperty("--main-bt-color", "rgb(255,255,0)");
        document.documentElement.style.setProperty("--main-bt", "255,255,0");
        document.documentElement.style.setProperty("--hover-bt-color", "rgb(255,255,0)");
        document.documentElement.style.setProperty("--active-bt-color", "rgb(255,255,0)");
        document.documentElement.style.setProperty("--light-bt-color", "rgb(255,255,200)");
        document.documentElement.style.setProperty("--main-text-color", "#fff");
        document.documentElement.style.setProperty("--primary-text-color", "#000");
        document.documentElement.style.setProperty("--main-text", "255,255,255");
        document.documentElement.style.setProperty("--main-background", "0,0,0");
        document.documentElement.style.setProperty("--border-radius", "0");
        document.documentElement.style.setProperty("--shadow-color", "rgba(0,0,0,0)");
        document.documentElement.style.setProperty("--border-color", "rgb(255,255,0)");
        document.documentElement.style.setProperty("--hover-color", "rgb(100,100,0)");
    }
}

document.getElementById('size-selector').addEventListener('change', function() {
    // 获取用户选择的等级
    let size = this.value;

    // 根据用户选择的等级，设置根元素的字体大小
    switch (size) {
        case 'small':
            document.documentElement.style.fontSize = '12px';
            document.documentElement.style.setProperty("--dropdownbutton-height", "40px");
            break;
        case 'medium':
            document.documentElement.style.fontSize = '16px';
            document.documentElement.style.setProperty("--dropdownbutton-height", "50px");
            break;
        case 'large':
            document.documentElement.style.fontSize = '20px';
            document.documentElement.style.setProperty("--dropdownbutton-height", "60px");
            break;
        case 'extra-large':
            document.documentElement.style.fontSize = '24px';
            document.documentElement.style.setProperty("--dropdownbutton-height", "70px");
            break;
    }

    // 获取所有的元素
    let allElements = document.querySelectorAll('*');

    // 遍历所有的元素并设置它们的字体大小
    allElements.forEach(function(element) {
        element.style.fontSize = document.documentElement.style.fontSize;
    });
    setCookie('sizeSelector', this.value, 14);
});

// 设置cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// 获取cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// 删除cookie
function eraseCookie(name) {
    document.cookie = name+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// 获取字体样式选择器元素
let fontStyleSelector = document.getElementById('font-style-selector');

// 监听字体样式选择器的change事件
fontStyleSelector.addEventListener('change', function() {
    let value = this.value;
    let body = document.body.style;

    switch (value) {
        case 'bold':
            body.fontWeight = 'bold';
            body.fontStyle = 'normal';
            break;
        case 'italic':
            body.fontWeight = 'normal';
            body.fontStyle = 'italic';
            break;
        case 'bold-italic':
            body.fontWeight = 'bold';
            body.fontStyle = 'italic';
            break;
        default:
            body.fontWeight = 'normal';
            body.fontStyle = 'normal';
            break;
    }

    // 获取所有的元素
    let allElements = document.querySelectorAll('*');

    // 遍历所有的元素并设置它们的字体大小
    allElements.forEach(function(element) {
        if (element.tagName.toLowerCase()!=="b") {
            element.style.fontWeight = body.fontWeight;
            element.style.fontStyle = body.fontStyle;
        }
        else{
            if(body.fontWeight==="bold"){
                element.style.fontWeight = "1000";
                element.style.fontStyle = body.fontStyle;
            }
            else{
                element.style.fontWeight = "bold";
                element.style.fontStyle = body.fontStyle;
            }
        }
    });
    // 将新的字体样式写入cookie
    setCookie('fontStyle', value, 14);
});

// 获取排列方式选择器元素
let textAlignSelector = document.getElementById('text-align-selector');

// 监听排列方式选择器的change事件
textAlignSelector.addEventListener('change', function() {
    document.body.style.textAlign = this.value;
    setCookie('textAlign', this.value, 14);
});

// 获取快捷键选择器元素
let shortcutSelector = document.getElementById('shortcut-selector');

// 监听快捷键选择器的change事件
shortcutSelector.addEventListener('change', function() {
    let value = this.value;

    // 移除所有快捷键
    document.removeEventListener('keydown', handleShortcut);

    // 添加新的快捷键
    if (value !== 'none') {
        document.addEventListener('keydown', handleShortcut);
    }

    setCookie('shortcut', value, 14);
});

// 处理快捷键的函数
function handleShortcut(event) {
    let value = shortcutSelector.value;

    if (event.ctrlKey) {
        switch (value) {
            case 'bold':
                if (event.key === 'b') {
                    document.body.style.fontWeight = document.body.style.fontWeight === 'bold' ? 'normal' : 'bold';
                }
                break;
            case 'italic':
                if (event.key === 'i') {
                    document.body.style.fontStyle = document.body.style.fontStyle === 'italic' ? 'normal' : 'italic';
                }
                break;
            case 'center':
                if (event.key === 'e') {
                    document.body.style.textAlign = document.body.style.textAlign === 'center' ? 'left' : 'center';
                }
                break;
        }
    }
}
var lastMessage = '';
var lastType = '';
var snackbarcount = 1;
var snackbarTimeout;
function showSnackbar(message, type,buttontext = '',operation = null) {
    var outtimeout;
    var defouttimeout;
    var snackbar = document.getElementById('snackbar');
    var snackbarText = document.getElementById('snackbar-text');
    var snackbarIcon = document.getElementById('snackbar-icon');
    var snackbarClose = document.getElementById('snackbar-close');
    var snackbarButton = document.getElementById('snackbar-button');

    if (buttontext && operation) {
        snackbarButton.textContent = buttontext;
        snackbarButton.style.display = 'inline-block';
        snackbarButton.onclick = operation;
    } else {
        snackbarButton.style.display = 'none';
    }

    if (message === lastMessage && type === lastType) {
        snackbarcount++;
        clearTimeout(outtimeout);
        clearTimeout(defouttimeout);
        snackbarText.innerHTML = message;
        document.getElementById("snackbar-number").style.display = "block";
        document.getElementById("snackbar-number").innerHTML = snackbarcount.toString();
        if(snackbarcount>4){
            snackbar.style.backgroundColor = "var(--main-bt-color)";
            setTimeout(function() { snackbar.style.backgroundColor = ""; }, 150);
            if(snackbarcount>99){
                document.getElementById("snackbar-number").innerHTML = "99+";
            }
        }
        setTimeout(function() { document.getElementById("snackbar-number").style.display = "none"; }, 300);
    }else {
        document.getElementById("snackbar-number").style.display = "none";
        snackbarText.innerHTML = message;
        lastMessage = message;
        lastType = type;
        snackbarcount = 1;
        snackbar.style.backgroundColor = "";
    }

    snackbar.className = 'snackbar ' + type;
    snackbar.classList.add("show");
    if (type === 'error') {
        snackbarIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="rgb(244, 67, 54)" viewBox="0 0 16 16">\n' +
            '  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>\n' +
            '</svg>';
    } else if (type === 'warning') {
        snackbarIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="rgb(255, 152, 0)" viewBox="0 0 16 16">\n' +
            '  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>\n' +
            '</svg>';
    } else if (type === 'info') {
        snackbarIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="rgb(33, 150, 243)" viewBox="0 0 16 16">\n' +
            '  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>\n' +
            '</svg>';
    } else if (type==='standard') {
        snackbarIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">\n' +
            '  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>\n' +
            '</svg>';
    }else{
        snackbarIcon.innerHTML = '';
    }
    clearTimeout(snackbarTimeout);
    if (type !== 'error') {
        defouttimeout=setTimeout(function() {
            if (!snackbar.matches(':hover')) {
                snackbar.classList.remove("show");
                lastMessage = null;
                lastType = null;
            }
        }, 10000);
        snackbarTimeout=defouttimeout;
    }

    snackbar.onmouseover = function() {
        if(outtimeout) {
            clearTimeout(outtimeout);
        }
        clearTimeout(defouttimeout);
    };
    snackbar.onmouseleave = function() {
        outtimeout=setTimeout(function() {
            if (!snackbar.matches(':hover')) {
                snackbar.classList.remove("show");
                lastMessage = null;
                lastType = null;
            }
        }, 5000);
    };

    snackbarClose.onclick = function() {
        snackbar.classList.remove("show");
        lastMessage = null;
        lastType = null;
    };
}

// 获取所有包含data-信息的按钮
var buttons = document.querySelectorAll('button[data-info]');

// 为每个按钮添加mouseover和mouseout事件监听器
buttons.forEach(function(button) {
    button.addEventListener('mouseover', function() {
        // 获取按钮的data-信息
        var info = this.getAttribute('data-info');
        // 显示Tooltip
        showTooltip(this, info);
    });

    button.addEventListener('mouseout', function() {
        // 隐藏Tooltip
        var tooltip = document.getElementById('tooltip');
        tooltip.classList.remove('show');
    });
});

function showTooltip(element, message) {
    var tooltip = document.getElementById('tooltip');
    var tooltipText = document.getElementById('tooltip-text');

    tooltipText.textContent = message;

    var rect = element.getBoundingClientRect();

    // 获取tooltip的高度
    var tooltipHeight = tooltip.offsetHeight;

    // 获取页面的高度
    var pageHeight = window.innerHeight;

    // 计算tooltip的底部位置
    var tooltipBottom = rect.bottom + tooltipHeight;

    // 检查tooltip的底部位置是否超过了页面的高度
    if (tooltipBottom > pageHeight) {
        // 如果超过了，就将tooltip放到目标元素的上方
        tooltip.style.top = (rect.top - tooltipHeight - 2) + 'px';
    } else {
        // 否则就放到目标元素的下方
        tooltip.style.top = (rect.bottom + 2) + 'px';
    }

    tooltip.style.left = rect.left + 'px';
    tooltip.classList.add('show');

    element.onmouseleave = function() {
        tooltip.classList.remove('show');
    };
}

// 创建一个按钮


// 当点击按钮时，删除所有相关的cookie
function resetThemeSettings() {
    eraseCookie('theme');
    eraseCookie('fontSelector');
    eraseCookie('themeSelector');
    eraseCookie('sizeSelector');
    eraseCookie('fontStyle');
    eraseCookie('textAlign');
    eraseCookie('shortcut');
    fontSelector.value = 'Inter';
    fontSelector.dispatchEvent(new Event('change'));
    themeSelector.value = 'blue';
    themeSelector.dispatchEvent(new Event('change'));
    document.getElementById('size-selector').value = 'medium';
    document.getElementById('size-selector').dispatchEvent(new Event('change'));
    fontStyleSelector.value = 'normal';
    fontStyleSelector.dispatchEvent(new Event('change'));
    textAlignSelector.value = 'left';
    textAlignSelector.dispatchEvent(new Event('change'));
    shortcutSelector.value = 'none';
    shortcutSelector.dispatchEvent(new Event('change'));
}

var tabbuttonElements = document.querySelectorAll('.tab-button');
// 为每个 li 元素添加点击事件监听器
tabbuttonElements.forEach(function(tabbutton) {
    tabbutton.addEventListener('click', function(event) {
        var dataPanelValue = tabbutton.getAttribute('data-panel');
        var tabsContainer = this.parentElement.parentElement;
        var tabpanelElements = tabsContainer.querySelectorAll('.tabpanel');
        var tabLine = tabsContainer.querySelector('.tab-line'); // 获取对应的 .tab-line 元素
        // 遍历所有的 .tabpanel 元素
        tabpanelElements.forEach(function(tabpanel) {
            if(tabpanel.getAttribute('data-name')===dataPanelValue){
                tabpanel.style.display = 'block';
                var abuttonWidth = tabbutton.offsetWidth;
                var abuttonLeft = tabbutton.offsetLeft;

                // 设置 .tab-line 的宽度和左偏移量，使其位于被点击的 .tab-button 的下方中央
                var tabsmallbuttonwidthline=abuttonWidth*0.2;
                if(tabsmallbuttonwidthline>20){
                    tabLine.style.width = '64px';
                    tabLine.style.left = (abuttonLeft + abuttonWidth / 2 - 32) + 'px';
                }else {
                    tabLine.style.width = (abuttonWidth - tabsmallbuttonwidthline - 16) + 'px';
                    tabLine.style.left = (abuttonLeft + (tabsmallbuttonwidthline / 2) + 8) + 'px';
                }
            }
            else{
                tabpanel.style.display = 'none';
            }
        });
    });
});


// 创建一个函数来设置 tabLine 的宽度和位置
function setTabLine() {
    // 获取所有的 .tab-button 元素
    var tabbuttonElements = document.querySelectorAll('.tab-button');

    // 遍历所有的 .tab-button 元素
    tabbuttonElements.forEach(function(tabbutton) {
        var dataPanelValue = tabbutton.getAttribute('data-panel');
        var tabsContainer = tabbutton.parentElement.parentElement;
        var tabpanelElements = tabsContainer.querySelectorAll('.tabpanel');
        var tabLine = tabsContainer.querySelector('.tab-line'); // 获取对应的 .tab-line 元素

        // 遍历所有的 .tabpanel 元素
        tabpanelElements.forEach(function(tabpanel) {
            if(tabpanel.getAttribute('data-name')===dataPanelValue && tabpanel.style.display === 'block'){
                var abuttonWidth = tabbutton.offsetWidth;
                var abuttonLeft = tabbutton.offsetLeft;

                // 设置 .tab-line 的宽度和左偏移量，使其位于被点击的 .tab-button 的下方中央
                var tabsmallbuttonwidthline=abuttonWidth*0.2;
                if(tabsmallbuttonwidthline>20){
                    tabLine.style.width = '64px';
                    tabLine.style.left = (abuttonLeft + abuttonWidth / 2 - 32) + 'px';
                }else {
                    tabLine.style.width = (abuttonWidth - tabsmallbuttonwidthline - 16) + 'px';
                    tabLine.style.left = (abuttonLeft + (tabsmallbuttonwidthline / 2) + 8) + 'px';
                }
            }
        });
    });
}


// 当窗口大小改变时，重新设置 tabLine 的宽度和位置
window.addEventListener('resize', setTabLine);

// 获取所有的 .checkbox-container 元素
var checkboxContainers = document.querySelectorAll('.checkripple');
var checkboxContainersmouseupTimeOut;
// 为每个 .checkbox-container 元素添加 mousedown 和 mouseup 事件监听器
checkboxContainers.forEach(function(container) {
    container.addEventListener('mousedown', function(event) {
        // 清除之前的定时器
        clearTimeout(checkboxContainersmouseupTimeOut);
        container.getElementsByClassName("checkrippleripple")[0].style.display = 'none';
        // 获取鼠标的位置
        var x = event.clientX - container.getBoundingClientRect().left;
        var y = event.clientY - container.getBoundingClientRect().top;

        // 设置 .checkripple::before 的中心位置
        document.documentElement.style.setProperty('--ripple-x', x + 'px');
        document.documentElement.style.setProperty('--ripple-y', y + 'px');
        container.getElementsByClassName("checkrippleripple")[0].style.display = 'block';
        // 显示 .checkripple::before
    });

    container.addEventListener('mouseup', function(event) {
        checkboxContainersmouseupTimeOut=setTimeout(function() {
            container.getElementsByClassName("checkrippleripple")[0].style.display = 'none';
            },100);

    });
    container.addEventListener('mouseleave', function(event) {
        checkboxContainersmouseupTimeOut=setTimeout(function() {
            container.getElementsByClassName("checkrippleripple")[0].style.display = 'none';
            },100);
    });
});


var radioContainers = document.querySelectorAll('.radioripple');
var radioContainersmouseupTimeOut;
// 为每个 .checkbox-container 元素添加 mousedown 和 mouseup 事件监听器
radioContainers.forEach(function(container) {
    container.addEventListener('mousedown', function(event) {
        // 清除之前的定时器
        clearTimeout(radioContainersmouseupTimeOut);
        container.getElementsByClassName("radiorippleripple")[0].style.display = 'none';
        // 获取鼠标的位置
        var x = event.clientX - container.getBoundingClientRect().left;
        var y = event.clientY - container.getBoundingClientRect().top;

        // 设置 .checkripple::before 的中心位置
        document.documentElement.style.setProperty('--ripple-r-x', x + 'px');
        document.documentElement.style.setProperty('--ripple-r-y', y + 'px');
        // 显示 .checkripple::before
        container.getElementsByClassName("radiorippleripple")[0].style.display = 'block';
    });

    container.addEventListener('mouseup', function(event) {
        radioContainersmouseupTimeOut=setTimeout(function() {
            container.getElementsByClassName("radiorippleripple")[0].style.display = 'none';
        },100);

    });
    container.addEventListener('mouseleave', function(event) {
        radioContainersmouseupTimeOut=setTimeout(function() {
            container.getElementsByClassName("radiorippleripple")[0].style.display = 'none';
        },100);
    });
});

var selectBoxs = document.querySelectorAll('.selectBox');
selectBoxs.forEach(function(selectBox) {
    selectBox.addEventListener('click', function(event) {
        selectDropdown=selectBox.parentElement.getElementsByClassName("selectDropDown")[0];
        if(selectDropdown.style.display!=="block") {
            document.querySelectorAll('.selectDropDown').forEach(function(hideselectDropdown) {
                // 如果其他的 .selectDropDown 元素正在显示，就将它们隐藏
                if(hideselectDropdown.style.display === "block" && hideselectDropdown !== selectDropdown){
                    hideselectDropdown.classList.remove('active');
                    setTimeout(function () {
                        hideselectDropdown.style.display = "none";
                    }, 150);
                    hideselectDropdown.parentElement.getElementsByClassName('selectBox')[0].classList.remove('bluebottom');
                }
            });
            selectDropdown.style.display = "block";
            setTimeout(function () {
                selectDropdown.classList.add('active');
            }, 50);
            selectBox.classList.add('bluebottom');
        }
        else{
            selectDropdown.classList.remove('active');
            setTimeout(function () {
                selectDropdown.style.display = "none";
            }, 150);
            selectBox.classList.remove('bluebottom');
        }
    });
});

var selectOptions = document.querySelectorAll('.selectOption,.selectBox');
var selectripplehidesettimeout;
selectOptions.forEach(function(selectOption) {
    selectOption.addEventListener('mousedown', function(event) {
        // 检查是否已经存在一个 selectripple 元素
        var existingRipple = selectOption.querySelector('.selectripple');
        if (!existingRipple) {
            clearTimeout(selectripplehidesettimeout);
            const aripples = document.querySelectorAll('.selectripple');
            aripples.forEach(function (aripple) {
                aripple.remove();
            });
            // 创建一个新的 div 元素并添加 selectripple 类
            var ripple = document.createElement('div');
            ripple.className = 'selectripple';
            // 获取鼠标点击的位置
            var x = event.clientX - selectOption.getBoundingClientRect().left;
            var y = event.clientY - selectOption.getBoundingClientRect().top;
            ripple.style.width=selectOption.style.width;
            ripple.style.height=selectOption.style.width.toString();
            var width = this.getBoundingClientRect().width;
            // 设置 ripple 元素的位置
            ripple.style.left = (x - width) + 'px';
            ripple.style.top = (y - width) + 'px';
            ripple.style.width = (width * 2) + 'px';
            ripple.style.height = (width * 2) + 'px';
            // 将新的 div 元素添加到 selectOption 的 innerHTML 中
            selectOption.appendChild(ripple);
        }

    });
    selectOption.addEventListener('mouseup', function(event) {
        // 查找并移除 selectripple 元素
        var ripple = this.querySelector('.selectripple');
        if (ripple) {
            selectripplehidesettimeout=setTimeout(function() {
                ripple.remove();
            },100);
        }
    });
    selectOption.addEventListener('mouseleave', function(event) {
        // 查找并移除 selectripple 元素
        var ripple = this.querySelector('.selectripple');
        if (ripple) {
            selectripplehidesettimeout=setTimeout(function() {
                ripple.remove();
            },100);
        }
    });
    selectOption.addEventListener('click', function(event) {
        if(selectOption.classList.contains("selectOption")) {
            // 获取被点击的 selectOption 元素的 data-value 属性值
            var selectedValue = this.getAttribute('data-value');
            // 获取对应的 selectBox 元素
            var selectBox = this.parentElement.previousElementSibling;
            // 设置 selectBox 元素的文本内容为 selectedValue
            selectBox.textContent = this.innerText;
            selectBox.click();
            // 获取对应的 selectDiv 元素
            var selectDiv = selectBox.parentElement;
            // 设置 selectDiv 元素的 value 属性为 selectedValue
            selectDiv.value = selectedValue;
        }
    });
});

// 获取所有的 Collapse 面板
const panels = document.querySelectorAll('.collapse-panel');

// 给每个面板添加点击事件
panels.forEach(panel => {
    const header = panel.querySelector('.panel-header');
    const body = panel.querySelector('.panel-body');

    header.addEventListener('click', () => {
        setTimeout(function() {
            if (body.style.display === 'none') {
                // 如果面板是关闭状态，就展开它
                body.style.display = 'block';
                setTimeout(function() {
                    body.classList.add('active');
                }, 10);
                header.classList.add('active');
            } else {
                body.classList.remove('active');
                // 如果面板是展开状态，就关闭它
                header.classList.remove('active');
                setTimeout(function() {
                    body.style.display = 'none';
                }, 150);
            }
        }, 10);

    });
});

