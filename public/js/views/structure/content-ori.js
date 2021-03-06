define(['jquery', 'underscore', 'backbone', 'views/profile', 'views/place-form', 'views/event-form', 'views/com-form', 'views/wall', 'models/place'],

	function( $ , _ , Backbone , ProfileView, PlaceFormView, EventFormView, ComFormView, WallView, Place ){

		var NavigView = Backbone.View.extend({

			tagname: 'div',

			initialize: function(){
				this.currentView = null;
				this.setListeners();
			},

			events: {
				'click #home': 'navigWall'
			},

			setListeners: function() {
				Backbone.on('pevent:click', this.navigFormEvent, this);
				Backbone.on('pevent:save', this.navigProfile, this);
				Backbone.on('pevent:cancel', this.navigProfile, this);
				Backbone.on('pevent:delete', this.navigProfile, this);
				
				Backbone.on('coms:add', this.navigFormCom, this);
				Backbone.on('com:save', this.navigProfile, this);
				Backbone.on('com:cancel', this.navigProfile, this);
				
				Backbone.on('place:click', this.eClickedPlace, this);
				Backbone.on('place:save', this.navigProfile, this);
				Backbone.on('place:cancel', this.navigProfile, this);
			},


			/*** EVENT HANDLERS ***/

			navigWall: function() {
				this.render(new WallView());
			},

			navigProfile: function(model, placeId) {
				this.render(new ProfileView({_id: placeId}));
			},

			navigFormEvent: function(pevent) {
				this.render(new EventFormView({model: pevent}));
			},

			navigFormCom: function(com) {
				this.render(new ComFormView({model: com}));
			},

			eClickedPlace: function(place) {
				if(this.currentView instanceof WallView) {
					this.render(new ProfileView({place: place}));
				}
				else {
					this.render(new PlaceFormView({model: place}));
				}
			},


			//render displays only one view
			//when a new view is passed the previous view is removed
			render: function(view){			

				//remove the view currently displayed
				if(this.currentView) {
					this.currentView.remove();
					delete this.currentView;
				}

				if(!view || !(view instanceof Backbone.View)) {
					view = new WallView();
				}

				//show the new view
				this.currentView = view;
				this.$el.append( this.currentView.el );
				this.currentView.render();

				return this;
			}
		});


		return NavigView;
});