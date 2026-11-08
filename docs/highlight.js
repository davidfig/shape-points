// shows the code in the demo
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('javascript', javascript)

export default function highlight()
{
    var client = new XMLHttpRequest();
    client.open('GET', 'code.js');
    client.onreadystatechange = function()
    {
        if (client.readyState !== 4)
        {
            return;
        }
        var code = document.getElementById('code');
        code.textContent = client.responseText;
        hljs.highlightElement(code);
    };
    client.send();
}

// for eslint
/* globals window, XMLHttpRequest, document */
