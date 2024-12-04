interface Entity {
  id: number
}

export class InMemoryRepository<T extends Entity> {
  private items: Map<number, T> = new Map()

  add(item: T): T {
    this.items.set(item.id, item)
    return item
  }

  findById(id: number): T | undefined {
    return this.items.get(id)
  }

  findAll(): T[] {
    return Array.from(this.items.values())
  }

  update(id: number, updatedItem: Partial<T>): T | undefined {
    const existingItem = this.items.get(id)
    if (!existingItem) {
      return undefined
    }

    const mergedItem = { ...existingItem, ...updatedItem }
    this.items.set(id, mergedItem as T)
    return mergedItem as T
  }

  remove(id: number): boolean {
    return this.items.delete(id)
  }

  clear(): void {
    this.items.clear()
  }
}
