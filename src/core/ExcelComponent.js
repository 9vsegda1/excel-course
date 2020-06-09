import {DomListener} from '@core/DomListener'
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''

    this.emitter = options.emitter
    this.unsubs = []
    this.store = options.store
    this.subscribe = options.subscribe || []

    this.prepare()
  }
  // Настраиваем компонент до инит
  prepare() {

  }
  // фаер слушателей
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Сюда приходят изменения по тем полям, на которые мы подписались
  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // Подписка на события event
  $on(event, fn) {
    const unsub = this.emitter.subcribe(event, fn)
    this.unsubs.push(unsub)
  }
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Инициализация компонента
  // добавление домслушателей
  init() {
    this.initDOMListeners()
  }
  // удаление компонента слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => unsub())
  }
}
