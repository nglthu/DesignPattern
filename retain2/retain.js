$(function () {
	var model = {
		init: function () {
			if (!localStorage.notes) {
				localStorage.notes = JSON.stringify([]);
			}
		}
		, add: function (obj) {
			var data = JSON.parse(localStorage.notes);
			data.push(obj);
			localStorage.notes = JSON.stringify(data);
		}
		, getAllNotes: function () {
			return JSON.parse(localStorage.notes).reverse();
		}
	};
	var octopus = {
		addNewNote: function (noteStr) {
			model.add({
				content: noteStr
				, date: Date.now()
			});
			view.render();
		}
		, getNotes: function () {
			return model.getAllNotes();
		}
		, init: function () {
			model.init();
			view.init();
		}
	}

var view = {
	init: function () {
		this.noteList = $('#notes');
		var newNoteForm = $("#new-note-form");
		var newNoteContent = $("#new-note-content");
		newNoteForm.submit(function(e) {
			octopus.addNewNote(newNoteContent.val());
			newNoteContent.val('');
			e.preventDefault();
		});
		view.render();
	}
	, render: function () {
		var htmlstr = '';
		octopus.getNotes().forEach(function (note) {
			htmlstr += '<li class="note">' + '<span class="note-date">' + new Date(note.date).toString() + '</span>' + note.content + '</li>'
		});
		this.noteList.html(htmlstr);
	}
};
	octopus.init();

}());