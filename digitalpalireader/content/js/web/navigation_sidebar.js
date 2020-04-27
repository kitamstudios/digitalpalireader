'use strict';

var DPRNav = {
  changeSet: function (noget, book) {
    var nik = document.getElementById('nav-set').value;
    if (G_hier == 't' && this.limitt(document.getElementById('nav-set').selectedIndex)) {
      alert('Ṭīkā not available for ' + G_nikLongName[document.getElementById('nav-set').value] + '.');
      document.getElementById('nav-set').selectedIndex = oldnikaya;
      return;
    }
    if (G_hier == 'a' && document.getElementById('nav-set').value == 'g') {
      alert('Atthakatha not available for Gram.');
      document.getElementById('nav-set').selectedIndex = oldnikaya;
      return;
    }
    if (G_hier == 'a' && document.getElementById('nav-set').value == 'b') {
      alert('Atthakatha not available for Abhidh-s.');
      document.getElementById('nav-set').selectedIndex = oldnikaya;
      return;
    }
    oldnikaya = document.getElementById('nav-set').selectedIndex;

    this.setBookList(nik, book);
    // xxxxxxxxxxxxx DPRXML.updateHierarchy(0);
  },


  getBookName: function (nik, ht, no) { // nik is nikaya, ht is a G_hier, no will be xml no - 1


    if (nik == 'k' || nik == 'y' || nik == 'n') {
      no = G_kynames[nik][no];
      if (ht != 'm') no = no.replace(/([^a]) 1$/, '$1');
    }
    else no++;
    return no.toString();
  },

  setBookList: function (nik, book) {
    __navigationTabViewModel.navBook.removeAll();

    var titles;
    if (nikvoladi[nik]) titles = nikvoladi[nik];
    else titles = nikvoladi[nik + G_hier];
    var bookNode = document.getElementById('nav-book');
    while (bookNode.itemCount > 0) bookNode.removeItemAt(0);
    for (var i = 0; i < titles.length; i++) {
      if (nik == 'k' || nik == 'y' || nik == 'n') {
        var title = G_kynames[nik][titles[i]];
        var val = titles[i] + 1;
      }
      else {
        var title = titles[i];
        var val = i + 1;
      }
      __navigationTabViewModel.navBook.push({value: val, label: translit(title)});
    }
    bookNode.selectedIndex = book ? book : 0;
  },

  limitt: function (nikn) {
    if (nikn == 5 || nikn > 6) { return true; }
    else { return false };
  },

  setSearchBookList: function () {
    const nik = $('#tsoSETm').val();

    const titles = nikvoladi[nik] ? nikvoladi[nik] : nikvoladi[nik + $('#tsoMAT2m').val()];

    __searchTabViewModel.bookListA.removeAll();
    __searchTabViewModel.bookListB.removeAll();
    __searchTabViewModel.bookMenu.removeAll();
    for (var i = 0; i < titles.length; i++) {
      // menu
      let menuValue = ((nik == 'k' || nik == 'y' || nik == 'n') ? (titles[i] + 1) : (i + 1));
      let menuText = translit((nik == 'k' || nik == 'y' || nik == 'n') ? G_kynames[nik][titles[i]] : G_nikLongName[nik] + ' ' + titles[i]);

      __searchTabViewModel.bookMenu.push({label: menuText, value: menuValue});

      // check boxes
      const label = ((nik == 'k' || nik == 'y' || nik == 'n') ? G_kynames[nik][titles[i]] : (typeof (titles[i]) == 'number' ? 'Book ' : '') + titles[i]);
      const cbValue = ((nik == 'k' || nik == 'y' || nik == 'n') ? (titles[i] + 1) : (i + 1));

    if (i >= Math.ceil(titles.length / 2)) {

        __searchTabViewModel.bookListB.push({label: label, id:`tsoBObook${i+1}`, value: cbValue, selected: __searchTabViewModel.searchBookCheckbox(i+1)});
      } else{
        __searchTabViewModel.bookListA.push({label: label, id:`tsoBObook${i+1}`, value: cbValue, selected: __searchTabViewModel.searchBookCheckbox(i+1)});
      }
    }
    DPRXML.updateSearchHierarchy(0);
  },

  switchhier: function (htmp) {

    if (G_hier == htmp) return;

    var himg = ['l', 'm', 'r'];

    if (htmp == 't' && this.limitt(document.getElementById('nav-set').selectedIndex)) {
      var MAT = document.getElementById('hier-m').checked == true ? 'hier-m' : 'hier-a';
      alert('Ṭīkā not available for ' + G_nikLongName[document.getElementById('nav-set').value] + '.');
      setTimeout(function () { document.getElementById(MAT).checked = true }, 10);
      return;
    }
    if (htmp == 'a' && document.getElementById('nav-set').selectedIndex > 7) {
      alert('Aṭṭhakathā not available for ' + G_nikLongName[document.getElementById('nav-set').value] + '.');
      setTimeout(function () { __navigationTabViewModel.MAT('m'); }, 10);
      return;
    }
    if (document.getElementById('nav-set').value == 'k' && htmp == 'a' && kudvala[document.getElementById('nav-book').value] == undefined) {
      alert('Aṭṭhakathā not available for ' + this.getBookName(document.getElementById('nav-set').value, htmp, document.getElementById('nav-book').selectedIndex) + '.');
      setTimeout(function () { __navigationTabViewModel.MAT('m'); }, 10);
      return;
    }

    G_hier = htmp;


    var book = document.getElementById('nav-book').value;
    if (document.getElementById('nav-set').value == 'k') {
      if (htmp == 'm') {
        book = parseInt(book) - 1;
      }
      else {
        book = kudvala[book];
      }
    }
    else if (document.getElementById('nav-set').value == 'y') {
      var book = document.getElementById('nav-book').value;
      if (htmp == 'm') {
        book = parseInt(book) - 1;
      }
      else {
        book = abhivala[book];
      }
    }
    else
      book = parseInt(book) - 1;

    this.changeSet(1, book);
    // xxxxxxxxxxxxxxx DPRXML.updateHierarchy(0);
  },

  historyBox: function () {
    if (!DPR_PAL.isXUL) {
      return true;
    }

    // history

    var hout = '';
    var theHistory = getHistory();
    if (theHistory.length > 0) {
      document.getElementById('hist-box').collapsed = false;
      var histNode = document.getElementById('history');
      while (histNode.itemCount > 0) histNode.removeItemAt(0);
      var isclear = '';
      histNode.appendItem('-- History --', '0');
      for (var i = 0; i < theHistory.length; i++) {
        var thist = theHistory[i].split('@');
        var thist0 = toUni(thist[0]);
        thist0 = thist0.split('-');
        thist0[thist0.length - 1] = translit(thist0[thist0.length - 1]);
        thist0 = thist0.join('-');
        histNode.appendItem(thist0, thist[1]);

        var ch = histNode.childNodes[0].childNodes;
        var x = thist[1].split(',');
        if (x.length > 3) {
          ch[i + 1].setAttribute('onclick', "DPRSend.openPlace(['" + x[0] + "'," + x[1] + "," + x[2] + "," + x[3] + "," + x[4] + "," + x[5] + "," + x[6] + ",'" + x[7] + "'],null,null,DPRSend.eventSend(event));");
        }
        else {
          ch[i + 1].setAttribute('onclick', "DPRSend.openIndex(['" + x[0] + "'," + x[1] + ",'" + x[2] + "'],DPRSend.eventSend(event));");
        }
      }
      histNode.selectedIndex = 0;
    }
    else document.getElementById('hist-box').collapsed = true;
  },

  readXML: function (file) {
    var cont = readFile(file);
    cont = (cont ? cont.join('\n') : '<?xml version="1.0" encoding="UTF-8"?>\n<xml></xml>');
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(cont, 'text/xml');
    return xmlDoc;
  },

  searchHistoryBox: function () {
    console.log("History not yet implemented.");
    return;
    var xmlDoc = this.readXML('DPR_Search_History');

    var bNodes = xmlDoc.getElementsByTagName('search');
    if (bNodes.length > 0) {
      document.getElementById('sh-box').collapsed = false;
      var bList = document.getElementById('searches');
      while (bList.itemCount > 0) bList.removeItemAt(0);
      bList.appendItem('-- History --');

      var types = ['Sets', 'Books', 'Book', 'Part', '', 'ATI'];

      var cnt = 0;

      for (var i = bNodes.length - 1; i >= 0; i--) { // backwards
        cnt++;

        var searchType = bNodes[i].getElementsByTagName('searchType')[0].textContent;
        var searchString = bNodes[i].getElementsByTagName('query')[0].textContent;
        var searchMAT = bNodes[i].getElementsByTagName('MAT')[0].textContent;
        var searchSet = bNodes[i].getElementsByTagName('sets')[0].textContent;
        var searchBook = bNodes[i].getElementsByTagName('book')[0].textContent;
        var searchPart = bNodes[i].getElementsByTagName('part')[0].textContent;
        var searchRX = bNodes[i].getElementsByTagName('rx')[0].textContent;

        var place = '';

        switch (parseInt(searchType)) {
          case 0:
          case 5:
            place = searchSet.split('').join(',');
            break;
          case 1:
            place = G_nikLongName[searchSet];
            break;
          case 2:
          case 3:
          case 4:
            place = G_nikLongName[searchSet] + ' ' + searchBook.split('').join(',');
            break;
        }

        bList.appendItem('\'' + searchString + '\' - ' + place + ' (' + types[parseInt(searchType)] + ')');

        var ch = bList.childNodes[0].childNodes;
        ch[cnt].setAttribute('value', searchType + "|" + searchString + "|" + searchMAT + "|" + searchSet + "|" + searchBook + "|" + searchPart + "|" + searchRX);
        //ch[cnt].setAttribute('tooltiptext','run search');
      }
      bList.selectedIndex = 0;

    }
    else document.getElementById('sh-box').collapsed = true;
  },

  dictHistoryBox: function () {
    var xmlDoc = this.readXML('DPR_Dict_History');

    var bNodes = xmlDoc.getElementsByTagName('dict');
    if (bNodes.length > 0) {
      document.getElementById('dh-box').collapsed = false;
      var bList = document.getElementById('dicts');
      while (bList.itemCount > 0) bList.removeItemAt(0);
      bList.appendItem('-- History --');

      var cnt = 0;

      for (var i = bNodes.length - 1; i >= 0; i--) {
        cnt++;

        var query = bNodes[i].getElementsByTagName('query')[0].textContent;
        var type = bNodes[i].getElementsByTagName('type')[0].textContent;
        var opts = bNodes[i].getElementsByTagName('opts')[0].textContent.replace(/,/g, "','");

        bList.appendItem(query + ' (' + type + ')');

        var ch = bList.childNodes[0].childNodes;
        ch[cnt].setAttribute('onclick', "DPRSend.sendDict(true,DPRSend.eventSend(event),'" + type + "','" + translit(query) + "',['" + opts + "']);");
        ch[cnt].setAttribute('tooltiptext', 'run lookup');
      }
      bList.selectedIndex = 0;

    }
    else document.getElementById('dh-box').collapsed = true;
  },


  bookmarkBox: function () {
    var xmlDoc = this.readXML('DPR_Bookmarks');

    var bNodes = xmlDoc.getElementsByTagName('bookmark');
    if (bNodes.length > 0) {
      document.getElementById('bm-box').collapsed = false;
      var bList = document.getElementById('bookmarks');
      while (bList.itemCount > 0) bList.removeItemAt(0);
      bList.appendItem('-- Bookmarks --');
      for (var i = 0; i < bNodes.length; i++) {

        var name = bNodes[i].getElementsByTagName('name')[0].textContent;
        var loc = bNodes[i].getElementsByTagName('location')[0].textContent.split('#');
        var scroll = bNodes[i].getElementsByTagName('scroll')[0].textContent;
        var desc = bNodes[i].getElementsByTagName('description')[0].textContent;

        bList.appendItem(translit(name));

        var ch = bList.childNodes[0].childNodes;
        ch[i + 1].setAttribute('onclick', "DPRSend.openPlace(['" + loc[0] + "'," + loc[1] + "," + loc[2] + "," + loc[3] + "," + loc[4] + "," + loc[5] + "," + loc[6] + ",'" + loc[7] + "'],null,null,DPRSend.eventSend(event)," + scroll + ");");
        ch[i + 1].setAttribute('tooltiptext', desc);
      }
      bList.selectedIndex = 0;

    }
    else document.getElementById('bm-box').collapsed = true;
  },

  gotoPlace: function ([nikaya, book, meta, volume, vagga, sutta, section, hiert]) {
    $('#nav-set').val(nikaya);
    $(".hierlabel.active").removeClass("active");
    $("#hier-"+hiert).parent().addClass("active");
    $("#hier-"+hiert).prop("checked",true);
    digitalpalireader.changeHier(hiert);
    $('#nav-book').prop("selectedIndex",book);
    $('#nav-meta').prop("selectedIndex", meta);
    $('#nav-volume').prop("selectedIndex", volume);
    $('#nav-vagga').prop("selectedIndex", vagga);
    $('#nav-sutta').prop("selectedIndex", sutta);
    $('#nav-section').prop("selectedIndex", section);

  },

  searchBook: function (nik, book, hiert) {
    DPR_Chrome.openDPRSidebar();
    $("#searchTab").click();
    document.getElementById('tipType').selectedIndex = 2;
    DPROpts.tipitakaOptions();
    document.getElementById('tsoSETm').selectedIndex = G_nikToNumber[nik];
    this.setSearchBookList();

    document.getElementById('tsoBOOKm').selectedIndex = book - 1;
    DPRXML.updateSearchHierarchy(0);
    document.getElementById('tsoMATm').checked= (hiert == 'm');
    document.getElementById('tsoMATa').checked= (hiert == 'a');
    document.getElementById('tsoMATt').checked= (hiert == 't');
  },

}
