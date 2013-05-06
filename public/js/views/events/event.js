define(['jquery', 'underscore', 'backbone', 'models/pevent', 'collections/events', 'text!templates/event.html'],

	function( $ , _ , Backbone , PEvent, PEventCollection, eventTpl ){

		var EventView = Backbone.View.extend({

			tagname: 'div',
			id: 'profile-event',
			className: 'alert alert-info profile-event',
			template: _.template( eventTpl ),

			events: {
				'click #btn-edit-event': 'clickEvent'
			},

			initialize: function(options) {
				if(options.place) {
					this.pevent = new PEvent( { _parentPlaceId: options.place.get('_id') });
					this.pevent.fetch();
				}
				else {
					throw 'ERROR Event view: no model given';
				}


				this.listenTo(this.pevent, 'all', this.render);
			},

			render: function(){
				if( this.pevent.isNew() ) {
					this.$el.html( 'no event 2nite -_-' );
				}
				else {
					this.$el.html( this.template(this.pevent.toJSON()) );
					$('#btn-vote-event').popover();
				}

				return this;
			},

			clickEvent: function() {
				Backbone.trigger('pevent:click', this.pevent);
			}
		});


		return EventView;
});