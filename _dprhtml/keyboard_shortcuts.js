document.onkeypress = DPR_keypress;

function DPR_keypress(e) {
  if (document.activeElement.type == "text" || document.activeElement.tagName == "TEXTAREA" || e.altKey || e.ctrlKey || e.metaKey) {
    return;
  }

  if (['1', '2', '3', '4', '5'].includes(e.key)) {
    DPRShowBottomPane(BottomPaneTabsViewModel.TabIds[e.charCode - 49]);
    event.preventDefault();
    return;
  }

  const cmd = Object.entries(__dprViewModel.commands).find(([_, x]) => x().matchKey(e));
  if (cmd && !cmd[1]().notImplemented && cmd[1]().canExecute && cmd[1]().visible) {
    cmd[1]().execute();
    event.preventDefault();
    return;
  }

  if (false && e.key === e) {
    if (window.getSelection().toString() != '') {
      wMain.sendtoPad(window.getSelection().toString() + '');
    }
    else if (wBot.getSelection().toString() != '') {
      wMain.sendtoPad(wBot.getSelection().toString() + '');
    }
    else if (document.getElementById('convi')) { wMain.sendtoPad(document.getElementById('convi').innerHTML); }
    else alertFlash('You must select some text to send to the textpad', 'yellow');
    return;
  }

  if (false && e.key === 'E') {
    if (window.getSelection().toString() != '') {
      wMain.sendtoPad(window.getSelection().toString() + '', true);
    }
    else if (wBot.getSelection().toString() != '') {
      wMain.sendtoPad(wBot.getSelection().toString() + '', true);
    }
    else if (document.getElementById('convi')) { wMain.sendtoPad(document.getElementById('convi').innerHTML, true); }
    else alertFlash('You must select some text to send to the textpad', 'yellow');
    return;
  }

  if (false && e.key === ',') {
    if (dBot.getElementById('tout')) { dBot.getElementById('tout').onclick(); }
    else if (document.getElementById('pSect')) document.getElementById('pSect').onmouseup();
    return;
  }

  if (false && e.key === '.') {
    if (dBot.getElementById('bout')) dBot.getElementById('bout').onclick();
    else if (document.getElementById('nSect')) document.getElementById('nSect').onmouseup();
    return;
  }

  if (e.key === '^') {
    resetAllDprSettings();
    window.location.reload();
    return;
  }

  if (false && e.key === '#') {
    newquiz();
    return;
  }

  if (false && e.key === '*') {
    bvAlert(bv()); return;
  }

  if (false && e.key === 'b') {
    dTop.getElementById('bkButton').onmousedown();
    return;
  }

  if (e.key === 'h') {
    openDPRTab('https://www.youtube.com/watch?v=8n_Tyh2itsQ', 'DPR-help', 0);
    return;
  }

  if (false && e.key === '@') {
    // Launch feedback form.
    return;
  }

  if (e.key === '?') { // ?
    $('#helpDialog').modal('show');
    return;
  }
}

function resetAllDprSettings() {
  Object.entries(localStorage).forEach(([k, _]) => localStorage.removeItem(k));
}
