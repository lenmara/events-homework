
/**
 * Created by lenmara on 20.02.14.
 */
/**
 * Конструктор класса обмена сообщениями
 * @constructor
 */
function PubSub(){
    this.observerList = {};
};

/**
 * Функция подписки на событие
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет вызвана при возникновении события
 * @return {function}         ссылка на handler
 */
PubSub.prototype.subscribe = function(eventName, handler) {
    if (typeof handler !== 'function') return;
    
    if (!this.observerList){
        this.observerList = {};
    }

    if (!this.observerList[eventName]){
        this.observerList[eventName] = [];
    }
    this.observerList[eventName].push(handler)

    return handler;

};

/**
 * Функция отписки от события
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет отписана
 * @return {function} ссылка на handler
 */

PubSub.prototype.unsubscribe = function(eventName, handler) {
    if(!handler) return;
    
    var listeners;
    if (listeners = this.observerList[eventName]){
        for (var i = 0; i < listeners.length; i++) {
            if (listeners[i] === handler){
                listeners.splice(i--, 1);
            }
        }
    }
}

/**
 * Функция генерирующая событие
 * @param  {string} eventName имя события
 * @param  {object} data      данные для обработки соответствующими функциями
 * @return {bool}             удачен ли результат операции
 *
 */

PubSub.prototype.publish = function(eventName, data) {
    var events;
    if (events = this.observerList[eventName]){

        for (var i = 0, max = events.length; i < max; i++){
            events[i].apply(this, Array.prototype.slice.call(arguments,1))
        }
    }
    return false;
};

/**
 * Функция отписывающая все функции от определённого события
 * @param  {string} eventName имя события
 * @return {bool}             удачен ли результат операции
 */
PubSub.prototype.off = function(eventName) {
    var event;
    
    if (event = this.observerList[eventName]) {
        event.length = 0;
        return true;

    }

    return false;
};

/**
 * @example
 *
 * PubSub.subscribe('click', function(event, data) { console.log(data) });
 * var second = PubSub.subscribe('click', function(event, data) { console.log(data) });
 *
 * //Отписать одну функцию от события 'click':
 * PubSub.unsubscribe('click', second);
 *
 * //Отписать группу функций от события 'click'
 * PubSub.off('click');
 */

/*
 Дополнительный вариант — без явного использования глобального объекта
 нужно заставить работать методы верно у любой функции
 */

function foo(event, data) {
    //body…
}

pubSub = new PubSub();

pubSub.subscribe('fire', one);
pubSub.subscribe('fire', two);
pubSub.subscribe('fire', three);
pubSub.subscribe('hello', group);

function example(){
    console.log('=================================================================');
    pubSub.publish('fire', 'Scooter');
    pubSub.publish('hello', 'Hello World');
    console.log('=================================================================');
    pubSub.unsubscribe('fire', b);
    pubSub.publish('fire', 'Scooter');
    console.log('=================================================================');
    pubSub.off('fire');
    console.log('=================================================================');
    pubSub.publish('fire', 'Scooter);
};

function one(){
    console.log('one', arguments[0]);
};

function group(){
    console.log('group', arguments[0]);
};
function two() {
    console.log('two', arguments[0]);
}
function three() {
    console.log('three', arguments[0]);
}
example();



