var React = require('react');
var RecipeItem = require('../recipe/recipe_item');
var BoardList = require('../board/board_list');

var CreatePin = React.createClass( {
	render: function() {
		return (
			<div>
				<RecipeItem recipe={this.props.recipe} />
			</div>
		)
	}
});

module.exports = CreatePin;