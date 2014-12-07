var SkulptRunning = false;
var TheGame;

var AceLoader = function (level) {
  setButtonState('Run');
  var editor = ace.edit("editor");
  var AceRange = ace.require('ace/range').Range;
  editor.setValue('');
  $.ajax({
    url: 'lucy/dev/game/assets/levels/' + level + '.txt',
    success: function(data) {
      editor.setValue(data, 1);
      editor.session.addFold("", new AceRange(0,0,1,100));
    }
  });
}

var ShowMessage = function (message, diamonds) {
  var msg = {};
  msg.title = message;

  if (diamonds > -1)
  {
    msg.imageUrl = 'lucy/dev/game/assets/result/resultscreen0'+diamonds+'.png';
  }
  swal(msg);

  $('.icon.custom').css({
      'width': '300px',
      'height': '100px'
    });
}

var HideMessage = function () {
  $('.sweet-alert').hide();
  $('.sweet-overlay').hide();
}

function stopSounds() {
  console.log(TheGame);
  TheGame.setSoundEnabled(false);
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
      runButton.html('Reset!');
      runButton.data('state', 'Reset');
    }
  }
  else if (state == 'Run') {
    runButton.attr('class', 'btn btn-success btn-lg');
    runButton.html('Run!');
    runButton.data('state', 'Run');
  }
}

function setLevelsDropDown(levels) {
  var levelsDropDown = $('#levelsDropDown');
  levelsDropDown.html('');
  for (var i=0; i < levels.length; i++)
  {
    var level = levels[i];
    levelsDropDown.append('<li><a href="#'+level+'" onClick="onLevelClicked(this);">'+level+'</a></li>');
  }
}

function onLevelClicked(level) {
  var levelName = $(level).html();
  TheGame.startLevelFromName(levelName);
}

$(document).ready(function()
{
  var editor = ace.edit("editor");
  var langTools = ace.require("ace/ext/language_tools");

  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/python");
  editor.setFontSize('12pt');
  editor.setHighlightActiveLine(true);

  editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
  var customCompleter = {
    getCompletions: function(editor, session, pos, prefix, callback) {
      if (prefix.length === 0) { callback(null, []); return }
      callback(null, [
        {name:"moveForward",value:"moveForward(1)",meta:"Move Forward"},
        {name:"turnLeft",value:"turnLeft()",meta:"Turn Left"},
        {name:"turnRight",value:"turnRight()",meta:"Turn Right"},
        ]);
    }
  }

  editor.completers = [customCompleter, langTools.snippetCompleter];

  TheGame = new KodingSpy.Game();
  setButtonState('Run');
  setLevelsDropDown(TheGame.allLevels);
});
