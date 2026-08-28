// mini-theme -- a dark, readable look for MiniCRM, without touching mini.js itself. Wraps
// fn.element.create (mini.js's own "one DOM-builder primitive everything else is built from")
// to merge in a default style per tagName before every element is built, so list/form/popup
// and every app page/button pick it up automatically. An explicit opt.style from the caller
// always wins per-key (it's applied after the defaults), so nothing here overrides anything
// mini.js or app.js already styles on purpose.
(function miniTheme() {
    var fn = window.fn;
    var createElement = fn.element.create;

    var palette = {
        bg : '#14161b',
        border : '#3a3f4b',
        text : '#e8eaed',
        muted : '#9aa0ac',
        accent : '#2a6df4',
    };

    var defaultStyle = {
        table : { width : '100%', borderCollapse : 'collapse', marginTop : '8px' },
        th : { padding : '8px 10px', borderBottom : '1px solid ' + palette.border, color : palette.muted, fontSize : '12px', textTransform : 'uppercase', letterSpacing : '0.03em' },
        td : { padding : '8px 10px', borderBottom : '1px solid ' + palette.border },
        input : { boxSizing : 'border-box', width : '100%', padding : '6px 8px', background : palette.bg, color : palette.text, border : '1px solid ' + palette.border, borderRadius : '4px', font : 'inherit' },
        select : { boxSizing : 'border-box', width : '100%', padding : '6px 8px', background : palette.bg, color : palette.text, border : '1px solid ' + palette.border, borderRadius : '4px', font : 'inherit' },
        textarea : { boxSizing : 'border-box', padding : '6px 8px', background : palette.bg, color : palette.text, border : '1px solid ' + palette.border, borderRadius : '4px', font : 'inherit' },
        button : { padding : '6px 14px', background : palette.accent, color : '#fff', border : 'none', borderRadius : '4px', cursor : 'pointer', font : 'inherit' },
        h1 : { margin : '0 0 16px', fontSize : '22px', fontWeight : '600' },
        p : { color : palette.muted, lineHeight : '1.6' },
    };

    fn.element.create = function(opt = {}) {
        var merged = Object.assign({}, defaultStyle[opt.tagName], opt.style);
        return createElement(Object.assign({}, opt, { style : merged }));
    };
})();
