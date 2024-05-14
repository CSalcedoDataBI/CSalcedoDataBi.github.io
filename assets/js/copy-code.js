document.addEventListener('DOMContentLoaded', function () {
  var codeBlocks = document.querySelectorAll('pre.highlight');
  codeBlocks.forEach(function (codeBlock) {
    var button = document.createElement('button');
    button.className = 'copy-code-button';
    button.type = 'button';
    button.innerText = 'Copy';

    button.addEventListener('click', function () {
      var code = codeBlock.querySelector('code').innerText.trim();
      navigator.clipboard.writeText(code).then(function () {
        button.innerText = 'Copied!';
        setTimeout(function () {
          button.innerText = 'Copy';
        }, 2000);
      }, function (err) {
        console.error('Failed to copy text: ', err);
      });
    });

    codeBlock.appendChild(button);
  });
});
