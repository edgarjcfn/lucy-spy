var SkulptRunning = false;
var TheGame;

var AceLoader = function (level) {
  $.ajax({
    url: 'lucy/dev/game/assets/levels/' + level + '.txt',
    success: function(data) {
      var editor = ace.edit("editor");
      editor.setValue(data, 1);
      editor.session.addFold("", new AceRange(0,0,1,100));
    }
  });
}


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
  Sk.commandChain = new KodingSpy.Command.CommandQueue(onLineExecuted);
  Sk.configure({read:builtinRead});

  try {
    eval(Sk.importMainWithBody("<stdin>",false,prog));
    Sk.commandChain.execute();
  }
  catch(e) {
    //console.debug('error', e);
    SkulptRunning = false;
    throw e
  }
}

function onButtonClicked() {
  var runButton = $('#runButton');
  if (runButton.data('state') == 'Run') {
    runPython();
  } else if (runButton.data('state') == 'Reset') {
    TheGame.state.start('Gameplay', true, false);
    setButtonState('Run');
  }

}

function onLineExecuted(lineNumber) {
  if (lineNumber > 0) {
    var editor = ace.edit("editor");
    editor.gotoLine(lineNumber);
  }

  updateButtonBehaviour();
}

function updateButtonBehaviour() {
  if (SkulptRunning) {
    setButtonState('Reset');
  }
}

function setButtonState(state) {
  var runButton = $('#runButton');

  if (state == 'Reset') {
    if (runButton.data('state') == 'Run') {
      runButton.attr('class', 'btn btn-danger btn-lg');
      runButton.html('Reset');
      runButton.data('state', 'Reset');
    }
  }
  else if (state == 'Run') {
    runButton.attr('class', 'btn btn-success btn-lg');
    runButton.html('Run');
    runButton.data('state', 'Run');
  }
}

$(document).ready(function()
{
  var editor = ace.edit("editor");
  var AceRange = ace.require('ace/range').Range;
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/python");
  editor.setFontSize('14pt');
  editor.setHighlightActiveLine(true);

  TheGame = new KodingSpy.Game();
  setButtonState('Run');
});
