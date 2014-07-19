function extractContent(value) {

    var el = document.createElement('div');
    el.innerHTML = value;
    document.body.appendChild(el);

    return  el.innerText.split('\n').join('');
}

console.log(extractContent("<p>Hello</p><a href=\'http://w3c.org\'>W3C</a>"));