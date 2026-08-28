// MiniCRM -- a small Salesforce-style CRM (Accounts/Contacts/Deals) built entirely on mini.js,
// laid out as an ordinary multi-page website (nav + hash routing), the same shape as
// mini-framework's Recipe Box example app.
(function miniCrmApp() {
    var fn = window.fn;

    var accountResource = {
        key : 'account',
        columns : [
            { name : 'name', label : 'Name', list : { type : 'text' }, form : { type : 'text' } },
            { name : 'industry', label : 'Industry', list : { type : 'text' }, form : { type : 'text' } },
            { name : 'website', label : 'Website', form : { type : 'text' } },
        ],
    };

    function deleteColumn(resourceKey) {
        return {
            name : 'delete', label : '',
            list : { render : 'function(data) { var b = document.createElement("button"); ' +
                'b.textContent = "Delete"; b.addEventListener("click", function(e) { ' +
                'e.stopPropagation(); fn.data.delete({ key: "' + resourceKey + '", id: data.id }); ' +
                'e.target.closest(".__page").refresh(); }); return b; }' },
        };
    }
    accountResource.columns.push(deleteColumn('account'));

    function accountDatas() {
        return fn.data.select({ key : 'account' }).map(function(row) {
            return Object.assign({ id : row.id }, row.data);
        });
    }

    if (fn.data.select({ key : 'account' }).length === 0) {
        fn.data.insert({ key : 'account', data : { name : 'Acme Corp', industry : 'Manufacturing', website : 'acme.example' } });
        fn.data.insert({ key : 'account', data : { name : 'Globex Inc', industry : 'Retail', website : 'globex.example' } });
        fn.data.insert({ key : 'account', data : { name : 'Initech', industry : 'Software', website : 'initech.example' } });
    }

    function newButton(opt) {
        return fn.element.create({
            tagName : 'button',
            attribute : { type : 'button' },
            text : opt.text,
            style : { padding : '6px 14px', marginBottom : '12px' },
            event : {
                click : function() {
                    fn.component.create({
                        name : 'popup',
                        title : opt.title,
                        caller : opt.caller,
                        render : function(popupEl) {
                            fn.component.create({ name : 'form', resource : opt.resource, data : {}, parent : popupEl.content });
                            fn.component.create({ name : 'save-btn', parent : popupEl.content });
                        },
                    });
                }
            },
        });
    }

    fn.component.layout.set({
        name : 'home-page',
        layout : function() {
            var page = fn.element.create({ tagName : 'div', style : { padding : '24px' } });
            fn.element.create({ tagName : 'h1', text : 'MiniCRM', parent : page });
            fn.element.create({
                tagName : 'p',
                text : 'A small Salesforce-style CRM built entirely on mini.js.',
                parent : page,
            });
            return page;
        }
    });

    fn.component.layout.set({
        name : 'accounts-page',
        layout : function() {
            var page = fn.element.create({ tagName : 'div', attribute : { class : '__page' }, style : { padding : '24px' } });
            fn.element.create({ tagName : 'h1', text : 'Accounts', parent : page });
            page.appendChild(newButton({ text : '+ New Account', title : 'New Account', resource : accountResource, caller : page }));
            var listContainer = fn.element.create({ tagName : 'div', parent : page });
            page.refresh = function() {
                Array.from(listContainer.children).forEach(function(c) { c.remove(); });
                fn.component.create({ name : 'list', resource : accountResource, datas : accountDatas(), caller : page, parent : listContainer });
            };
            page.refresh();
            return page;
        }
    });

    fn.component.layout.set({
        name : 'nav',
        layout : function(opt = {}) {
            var nav = fn.element.create({
                tagName : 'nav',
                style : { display : 'flex', gap : '16px', padding : '16px 24px', borderBottom : '1px solid #3a3f4b' },
            });
            opt.links.forEach(function(link) {
                fn.element.create({
                    tagName : 'a',
                    attribute : { href : link.href },
                    text : link.text,
                    style : { color : '#8ab4f8', textDecoration : 'none' },
                    parent : nav,
                });
            });
            return nav;
        }
    });

    fn.component.layout.set({
        name : 'router',
        layout : function(opt = {}) {
            var container = fn.element.create({ tagName : 'div' });
            function render() {
                Array.from(container.children).forEach(function(c) { c.remove(); });
                var name = opt.routes[location.hash] || opt.routes['#/'];
                fn.component.create({ name : name, parent : container });
            }
            window.addEventListener('hashchange', render);
            render();
            return container;
        }
    });

    fn.component.create({
        name : 'nav',
        links : [
            { href : '#/', text : 'Home' },
            { href : '#/accounts', text : 'Accounts' },
        ],
        parent : document.body,
    });

    fn.component.create({
        name : 'router',
        routes : { '#/' : 'home-page', '#/accounts' : 'accounts-page' },
        parent : document.body,
    });
})();
