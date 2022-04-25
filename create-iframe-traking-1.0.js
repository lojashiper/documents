var newIframe = document.createElement('iframe');
newIframe.width = '100%'; newIframe.height = '100%'; newIframe.frameBorder = '0'; newIframe.hspace = '0'; newIframe.vspace = '0';
newIframe.src = 'about:blank'; 
document.querySelector('#rastreio-yampi').appendChild(newIframe);

var getHTML = '<div id="rastreio-yampi"></div>';
var CSS = '<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/lojashiper/documents/traking-1.2.css">';
var JS = '<script src="//cdn.jsdelivr.net/gh/lojashiper/documents/traking-1.2.js"></script>';
var myContent = '<!DOCTYPE html>' + '<html><head><title>Rendered HTML from Pattern</title>' + CSS + '</head><body>' + getHTML + JS + '</body></html>';

newIframe.contentWindow.document.open('text/html', 'replace');
newIframe.contentWindow.document.write(myContent);
newIframe.contentWindow.document.close();
