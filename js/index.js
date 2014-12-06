function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
    throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

function runPython() {
  var prog = ace.edit("editor").getValue();

  Sk.externalLibraries = {
    lucy : {
      path : 'lucy/dist/lucy.lang.js',
      dependencies : []
    },
  };
  Sk.commandChain = new KodingSpy.Command.CommandQueue(updateLine);
  Sk.configure({read:builtinRead});

  try {
    eval(Sk.importMainWithBody("<stdin>",false,prog));
    Sk.commandChain.execute();
  }
  catch(e) {
    //console.debug('error', e);
    throw e
  }
}

function updateLine(lineNumber) {
  var editor = ace.edit("editor");
  editor.gotoLine(lineNumber);
}

$(document).ready(function()
{
  var editor = ace.edit("editor");
  var AceRange = ace.require('ace/range').Range;
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/python");
  editor.setFontSize('14pt');
  editor.setHighlightActiveLine(true);

  $.ajax({
    url: 'lucy/dev/lang/level01.txt',
    success: function(data) {
      editor.setValue(data, 1);
      editor.session.addFold("", new AceRange(0,0,1,100));
    }
  });

  var game = new KodingSpy.Game();

});
