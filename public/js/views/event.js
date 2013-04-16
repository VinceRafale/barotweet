define(['jquery', 'underscore', 'backbone', 'models/pevent', 'collections/events', 'text!templates/event.html'],

	function( $ , _ , Backbone , PEvent, EventCollection, eventTpl ){

		var EventView = Backbone.View.extend({

			tagname: 'div',
			id: 'profile-event',
			className: 'alert alert-info profile-event',
			template: _.template( eventTpl ),

			initialize: function(options) {
				console.log('creating Event view');
			},

			render: function(){

				if(!this.model.isNew()) {
					this.$el.html( this.template(this.model.toJSON()) );
				}
				else {
					this.$el.html( 'no event 2nite -_-' );
				}

				return this;
			}

		});


		return EventView;
});