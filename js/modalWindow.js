var modalWindow = {
    block: null,
    win: null,

    initBlock: function () {
        block = document.getElementById('blockscreen');

        if (!block) {
            var parent = document.getElementsByTagName('body')[0];
            var obj = parent.firstChild;
            block = document.createElement('div');
            block.id = 'blockscreen';
            parent.insertBefore(block, obj);
            block.onclick = function () {
                modalWindow.close();
            };
        }

        block.style.display = 'inline';
    },

    createModalWindow: function (width, height, html) {
        win = document.getElementById('modalwindow');

        if (!win) {
            var parent = document.getElementsByTagName('body')[0];
            var obj = parent.firstChild;
            win = document.createElement('div');
            win.id = 'modalwindow';
            win.style.padding = '-1px 0 5px 0';
            parent.insertBefore(win, obj);
        }
        win.style.width = width + 'px';
        win.style.height = height + 'px';
        win.style.display = 'inline';

        win.innerHTML = html; //Добавим нужный HTML-текст в наше диалоговое окно

        win.style.left = '50%';
        win.style.top = '50%';

        win.style.marginTop = -(win.offsetHeight / 2) + 'px';
        win.style.marginLeft = -(width / 2) + 'px';

    },

    close: function () {
        document.getElementById('blockscreen').style.display = 'none';
        document.getElementById('modalwindow').style.display = 'none';
    },

    show: function (width, height, html) {
        modalWindow.initBlock();
        modalWindow.createModalWindow(width, height, html);
    },
};