$(function(){

	// define the application
	var Notekeeper = {};

	(function(app){

		// variable definitions go here
		var $title = $('#title'),
		  $note = $('#note'),
		  $ul = $('#notesList'),
		  li = '<li><a href="#pgNotesDetail?title=LINK">ID</a></li>',
		  notesHdr = '<li data-role="list-divider">Your Notes</li>',
		  noNotes = '<li id="noNotes">You have no notes</li>';

		app.init = function(){
			app.bindings();
			app.checkForStorage();
		}

		app.bindings = function(){
			// set up binding for form
			$('#btnAddNote').on('touchend', function(e){
				e.preventDefault();
				// save the note
				app.addNote(
					$('#title').val(),
          $('#taskDate').val(),
					$('#note').val()
				);
			});
			$(document).on('touchend','#notesList a', function(e){
				e.preventDefault();
				var href = $(this)[0].href.match(/\?.*$/)[0];
				var title = href.replace(/^\?title=/,'');
				app.loadNote(title);
			});

			$(document).on('touchend','#btnDelete',function(e){
				e.preventDefault();
				var key = $(this).data('href');
				app.deleteNote(key);
			});

		};
		
		app.loadNote = function(title){
			// get notes
			var notes = app.getNotes(),
			// lookup specific note
			wholeNote = notes[title],
      stringArray = wholeNote.split("~"),
      taskDate = stringArray[0],
      note = stringArray[1],
			page = '<div data-role="page" data-url="details" data-add-back-btn="true">\
							<div data-role="header">\
								<h1>Notekeeper</h1>\
								<a id="btnDelete" href="" data-href="ID" data-role="button" class="ui-btn-right">Delete</a>\
							</div>\
							<div data-role="content"><h3>TITLE</h3><p>DATE</p><p>NOTE</p></div>\
						</div>';
			var newPage = $(page);
			//append it to the page container
			newPage.html(function(index,old){
				return old
						.replace(/ID/g,title)
						.replace(/TITLE/g,title
						.replace(/-/g,' '))
            .replace(/DATE/g,taskDate)
						.replace(/NOTE/g,note)
			}).appendTo($.mobile.pageContainer);
			$.mobile.changePage(newPage);
		};

		app.addNote = function(title, taskDate, note){
      note = taskDate + "~" + note;
      
			var notes = localStorage['Notekeeper'],
          notesObj;
			if (notes == undefined || notes == '') {
				notesObj = {};
			} else {
				notesObj = JSON.parse(notes)
			}
			notesObj[title.replace(/ /g,'-')] = note;
			localStorage['Notekeeper'] = JSON.stringify(notesObj);
			// clear the two form fields
			$note.val('');
			$title.val('');
      $taskDate.val('');
			//update the listview
			app.displayNotes();
		};

		app.getNotes = function(){
			// get notes
			var notes = localStorage['Notekeeper'];
			// convert notes from string to object
			if(notes) return JSON.parse(notes);
      return [];
		};

		app.displayNotes = function(){
			// get notes
			var notesObj = app.getNotes(),
			// create an empty string to contain html
			html = '';
      n; // make sure your iterations are properly scoped 
			// loop over notes
			for (n in notesObj) {
				html += li.replace(/ID/g,n.replace(/-/g,' ')).replace(/LINK/g,n);
			}
			$ul.html(notesHdr + html).listview('refresh');
		};

		app.deleteNote = function(key){
			// get the notes from localStorage
			var notesObj = app.getNotes();
			// delete selected note
			delete notesObj[key];
			// write it back to localStorage
			localStorage['Notekeeper'] = JSON.stringify(notesObj);
			// return to the list of notes
			$.mobile.changePage('notekeeper.html');
			// restart the storage check
			app.checkForStorage();
		};

		app.checkForStorage = function(){
      var notes = app.getNotes();
			// are there existing notes?
			if (!$.isEmptyObject(notes)) {
				// yes there are. pass them off to be displayed
				app.displayNotes();
			} else {
				// nope, just show the placeholder
				$ul.html(notesHdr + noNotes).listview('refresh');
			}
		};

		app.init();

	})(Notekeeper);
});