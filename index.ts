import { database, Item } from './database'

class Computer {
  time = 1
  providers = new Map<string, number>()
  demands = new Map<string, number>()
  supplies = new Map<string, number>()
  needs = new Map<string, number>()

  /** 额外产出的资源 */
  getExtra() {
    const { demands, supplies } = this
    const extraNames = Array.from(supplies.keys()).filter(name => supplies.get(name) > (demands.get(name) || 0))
    return new Map(extraNames.map(name => [name, supplies.get(name) - (demands.get(name) || 0)]))
  }

  /** 设置时长，单位秒 */
  setTimeCircle = (time: number) => (this.time = time)

  addProvider = (name: string, count: number) => {
    this.providers.set(name, (this.providers.get(name) || 0) + count)
  }
  addDemand = (name: string, weight: number) => {
    this.demands.set(name, (this.demands.get(name) || 0) + weight)
  }
  addSupply = (name: string, weight: number) => {
    this.supplies.set(name, (this.supplies.get(name) || 0) + weight)
  }
  addNeed = (name: string, weight: number) => {
    this.needs.set(name, (this.needs.get(name) || 0) + weight)
  }
  findDemand = (): { name: string; weight: number } => {
    const { demands, supplies } = this
    const name = Array.from(demands.keys()).find(name => demands.get(name) > (supplies.get(name) || 0))
    if (!name) return null
    return { name, weight: demands.get(name) - (supplies.get(name) || 0) }
  }
  findProvider = (name: string) => {
    return database.find(item => item.export?.some(ele => ele.name === name))
  }
  compute = () => {
    const { findDemand, findProvider, addSupply, addNeed, addProvider, addDemand } = this

    const demand = findDemand()
    if (!demand) return

    const provider = findProvider(demand.name)

    if (!provider) {
      addSupply(demand.name, demand.weight)
      addNeed(demand.name, demand.weight)
    } else {
      const product = provider.export?.find(ele => ele.name === demand.name)
      const time = Math.ceil(demand.weight / (product?.weight || 1))

      addProvider(provider.name, time)
      provider.export?.forEach(item => addSupply(item.name, item.weight * time))
      provider.import?.forEach(item => addDemand(item.name, item.weight * time))
    }

    return this.compute()
  }
}

const computer = new Computer()

const time = 600 * 10000
const duplicates = 12
/** 100 周期 */
computer.setTimeCircle(time)

/** 12 个复制人 100 周期消耗 */
const originDemands = [
  { name: '食物', weight: (1000 / 600) * time * duplicates },
  { name: '氧气', weight: 100 * time * duplicates }
]

originDemands.forEach(ele => computer.addDemand(ele.name, ele.weight))

computer.compute()

console.log({
  说明: `${duplicates} 个复制人 ${time / 600} 周期的生存需求，单位：克，焦，秒，千卡，DTU`,
  原始需求: originDemands,
  资源转换工具: new Map(
    Array.from(computer.providers.keys()).map(name => [name, Math.ceil(computer.providers.get(name) / time)])
  ),
  满足需求需要的总资源: computer.needs,
  平均每秒需要提供资源: new Map(
    Array.from(computer.needs.keys()).map(name => [name, Math.ceil(computer.needs.get(name) / time)])
  ),
  满足需求后的额外产出: computer.getExtra(),
  平均每秒额外产出的氢气可发电: (computer.getExtra().get('氢气') / 100 / time) * 800
})
