export class Emitter {
  constructor() {
    this.listeners = {}
  }
  // Уведомляем слушателей
  // 'focus' / 'formula:done'
  // table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }
  // Подписываемся на уведомление
  // добавляем нового слушателя
  // formula.subscribe('table:select', ()=>{})
  subcribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

