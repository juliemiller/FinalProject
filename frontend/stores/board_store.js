var Store = require('flux/utils').Store;
var BoardConstants = require('../constants/board_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var BoardStore = new Store(AppDispatcher);

var _boards = {};

BoardStore.all = function() {
	var boards = [];
	var private_boards = [];

	Object.keys(_boards).forEach(function(boardId) {
		if (_boards[boardId].private === true) {
			private_boards.push(_boards[boardId]);
		} else {
			boards.push(_boards[boardId]);
		}
	})
	return { public: boards, private: private_boards };
};

BoardStore.find = function(id) {
	return _boards[id];
};

BoardStore.__onDispatch = function(payload) {
	switch (payload.actionType) {
		case BoardConstants.BOARDS_RECEIVED:
			BoardStore.receiveBoards(payload.boards);
			break;
		case BoardConstants.BOARD_RECEIVED:
			BoardStore.receiveSingleBoard(payload.board);
			break;	
		case BoardConstants.REMOVE_BOARD:
			BoardStore.removeBoard(payload.id)
			break;
	}
};

BoardStore.receiveBoards = function(boards) {
	boards.forEach(function(board) {
		_boards[board.id] = board;
	})
	BoardStore.__emitChange();

};

BoardStore.receiveSingleBoard = function(board) {
	_boards[board.id] = board;
	BoardStore.__emitChange();
};

BoardStore.removeBoard = function(id) {
	delete _boards[id];
	BoardStore.__emitChange();
}

module.exports = BoardStore;
