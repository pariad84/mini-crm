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
            list : { render : 'function(data) { return fn.element.create({ tagName: "button", ' +
                'text: "Delete", event: { click: function(e) { e.stopPropagation(); ' +
                'fn.data.delete({ key: "' + resourceKey + '", id: data.id }); ' +
                'e.target.closest(".__page").refresh(); } } }); }' },
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

    var contactResource = {
        key : 'contact',
        columns : [
            { name : 'name', label : 'Name', list : { type : 'text' }, form : { type : 'text' } },
            { name : 'email', label : 'Email', list : { type : 'text' }, form : { type : 'text' } },
            { name : 'phone', label : 'Phone', form : { type : 'text' } },
            { name : 'accountId', label : 'Account', list : { type : 'text' }, form : { type : 'select', resource : { key : 'account', label : 'name' } } },
        ],
    };
    contactResource.columns.push(deleteColumn('contact'));

    function contactDatas() {
        return fn.data.select({ key : 'contact' }).map(function(row) {
            return Object.assign({ id : row.id }, row.data);
        });
    }

    if (fn.data.select({ key : 'contact' }).length === 0) {
        var accounts = fn.data.select({ key : 'account' });
        var acme = accounts[0], globex = accounts[1], initech = accounts[2];
        fn.data.insert({ key : 'contact', data : { name : 'Jane Doe', email : 'jane@acme.example', phone : '555-0101', accountId : acme.id } });
        fn.data.insert({ key : 'contact', data : { name : 'John Roe', email : 'john@globex.example', phone : '555-0102', accountId : globex.id } });
        fn.data.insert({ key : 'contact', data : { name : 'Alice Smith', email : 'alice@initech.example', phone : '555-0103', accountId : initech.id } });
    }

    var stageResource = {
        key : 'stage',
        columns : [
            { name : 'name', label : 'Name', list : { type : 'text' }, form : { type : 'text' } },
        ],
    };
    stageResource.columns.push(deleteColumn('stage'));

    function stageDatas() {
        return fn.data.select({ key : 'stage' }).map(function(row) {
            return Object.assign({ id : row.id }, row.data);
        });
    }

    if (fn.data.select({ key : 'stage' }).length === 0) {
        fn.data.insert({ key : 'stage', data : { name : 'Lead' } });
        fn.data.insert({ key : 'stage', data : { name : 'Qualified' } });
        fn.data.insert({ key : 'stage', data : { name : 'Proposal' } });
        fn.data.insert({ key : 'stage', data : { name : 'Won' } });
        fn.data.insert({ key : 'stage', data : { name : 'Lost' } });
    }

    var dealResource = {
        key : 'deal',
        columns : [
            { name : 'name', label : 'Name', list : { type : 'text' }, form : { type : 'text' } },
            { name : 'accountId', label : 'Account', list : { type : 'text' }, form : { type : 'select', resource : { key : 'account', label : 'name' } } },
            { name : 'contactId', label : 'Contact', list : { type : 'text' }, form : { type : 'select', resource : { key : 'contact', label : 'name' } } },
            { name : 'amount', label : 'Amount', list : { type : 'text' }, form : { type : 'text' } },
            { name : 'stageId', label : 'Stage', list : { type : 'text' }, form : { type : 'select', resource : { key : 'stage', label : 'name' } } },
            { name : 'closeDate', label : 'Close Date', list : { type : 'text' }, form : { type : 'text' } },
            { name : 'notes', label : 'Notes', form : { type : 'textarea' } },
        ],
    };
    dealResource.columns.push(deleteColumn('deal'));

    function dealDatas() {
        return fn.data.select({ key : 'deal' }).map(function(row) {
            return Object.assign({ id : row.id }, row.data);
        });
    }

    if (fn.data.select({ key : 'deal' }).length === 0) {
        var dealAccounts = fn.data.select({ key : 'account' });
        var dealContacts = fn.data.select({ key : 'contact' });
        var dealStages = fn.data.select({ key : 'stage' });
        var acmeAcct = dealAccounts[0], globexAcct = dealAccounts[1], initechAcct = dealAccounts[2];
        var janeContact = dealContacts[0], johnContact = dealContacts[1], aliceContact = dealContacts[2];
        var leadStage = dealStages[0], qualifiedStage = dealStages[1], proposalStage = dealStages[2];
        fn.data.insert({ key : 'deal', data : { name : 'Acme Expansion', accountId : acmeAcct.id, contactId : janeContact.id, amount : '45000', stageId : proposalStage.id, closeDate : '2026-09-15', notes : 'Expanding into two new plants.' } });
        fn.data.insert({ key : 'deal', data : { name : 'Globex Renewal', accountId : globexAcct.id, contactId : johnContact.id, amount : '18000', stageId : qualifiedStage.id, closeDate : '2026-10-01', notes : 'Annual contract renewal.' } });
        fn.data.insert({ key : 'deal', data : { name : 'Initech Pilot', accountId : initechAcct.id, contactId : aliceContact.id, amount : '9000', stageId : leadStage.id, closeDate : '2026-11-20', notes : 'Pilot for the new analytics module.' } });
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
        name : 'contacts-page',
        layout : function() {
            var page = fn.element.create({ tagName : 'div', attribute : { class : '__page' }, style : { padding : '24px' } });
            fn.element.create({ tagName : 'h1', text : 'Contacts', parent : page });
            page.appendChild(newButton({ text : '+ New Contact', title : 'New Contact', resource : contactResource, caller : page }));
            var listContainer = fn.element.create({ tagName : 'div', parent : page });
            page.refresh = function() {
                Array.from(listContainer.children).forEach(function(c) { c.remove(); });
                fn.component.create({ name : 'list', resource : contactResource, datas : contactDatas(), caller : page, parent : listContainer });
            };
            page.refresh();
            return page;
        }
    });

    fn.component.layout.set({
        name : 'deals-page',
        layout : function() {
            var page = fn.element.create({ tagName : 'div', attribute : { class : '__page' }, style : { padding : '24px' } });
            fn.element.create({ tagName : 'h1', text : 'Deals', parent : page });
            page.appendChild(newButton({ text : '+ New Deal', title : 'New Deal', resource : dealResource, caller : page }));
            var listContainer = fn.element.create({ tagName : 'div', parent : page });
            page.refresh = function() {
                Array.from(listContainer.children).forEach(function(c) { c.remove(); });
                fn.component.create({ name : 'list', resource : dealResource, datas : dealDatas(), caller : page, parent : listContainer });
            };
            page.refresh();
            return page;
        }
    });

    fn.component.layout.set({
        name : 'stages-page',
        layout : function() {
            var page = fn.element.create({ tagName : 'div', attribute : { class : '__page' }, style : { padding : '24px' } });
            fn.element.create({ tagName : 'h1', text : 'Stages', parent : page });
            page.appendChild(newButton({ text : '+ New Stage', title : 'New Stage', resource : stageResource, caller : page }));
            var listContainer = fn.element.create({ tagName : 'div', parent : page });
            page.refresh = function() {
                Array.from(listContainer.children).forEach(function(c) { c.remove(); });
                fn.component.create({ name : 'list', resource : stageResource, datas : stageDatas(), caller : page, parent : listContainer });
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
            { href : '#/contacts', text : 'Contacts' },
            { href : '#/deals', text : 'Deals' },
            { href : '#/stages', text : 'Stages' },
        ],
        parent : document.body,
    });

    fn.component.create({
        name : 'router',
        routes : {
            '#/' : 'home-page',
            '#/accounts' : 'accounts-page',
            '#/contacts' : 'contacts-page',
            '#/deals' : 'deals-page',
            '#/stages' : 'stages-page',
        },
        parent : document.body,
    });
})();
