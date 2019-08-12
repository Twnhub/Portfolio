export default class EventEmitter {
	constructor() {
		this._listeners = {
			// Hold the listeners that are only to be called once,
			// then removed from the _listeners._once object
			_once: {}
		};
	}

	on(eventName, listener) {
		if (this._listeners[eventName] === undefined) {
			this._listeners[eventName] = {[listener]: listener};
		} else {
			this._listeners[eventName][listener] = listener;
		}
		return this;
	}

	once(eventName, listener) {
		if (this._listeners._once[eventName] === undefined) {
			this._listeners._once[eventName] = {[listener]: listener};
		} else {
			this._listeners._once[eventName][listener] = listener;
		}
		return this;
	}

	off(eventName, listener) {
		delete this._listeners[eventName][listener];
		delete this._listeners._once[eventName][listener];
		return this;
	}

	emit(eventName, ...args) {
		let listeners = [];
		if (this._listeners[eventName] !== undefined) {
			listeners = listeners.concat(Object.values(this._listeners[eventName]));
		} 
		if (this._listeners._once[eventName] !== undefined) {
			listeners = listeners.concat(Object.values(this._listeners._once[eventName]));
		}
		for (let i = 0; i < listeners.length; i++) {
			listeners[i](...args);
		}
		delete this._listeners._once[eventName];
		return this;
	}
}