import fs from 'node:fs'
import path from 'node:path'
import type { DefaultTheme, UserConfig } from 'vitepress'

type DefineConfig = UserConfig<DefaultTheme.Config>
type SidebarParents = Set<{
    name: string,
    path: string,
    items: DefaultTheme.SidebarItem[]
}>
type SetToObject<T> = T extends Set<infer U> ? U : never

export type SidebarGroupParentGeneratorOptions = {
    childrenCardGenerator?(children: SetToObject<SidebarParents>['items']): string,
}

export default class SidebarGroupParentGenerator {
    private generatedGroupParents: Set<string> = new Set()
    private allowOverwrite: boolean = false

    constructor() {
        process.on('SIGINT', () => this.beforeExit())
        process.on('SIGTERM', () => this.beforeExit())
        process.on('SIGHUP', () => this.beforeExit())
        process.on('exit', () => this.cleanupGeneratedGroupParents())

        this.allowOverwrite = process.argv.includes('--allow-overwrite')
        if (this.allowOverwrite) {
            console.warn('[SidebarParentGenerator] Allowing overwrite of existing files')
        }
    }

    public defineConfig(config: DefineConfig, options?: SidebarGroupParentGeneratorOptions): DefineConfig {
        const needBuild = process.argv.includes('dev') || process.argv.includes('build')

        if (
            !needBuild ||
            typeof config.themeConfig !== 'object' ||
            !Array.isArray(config.themeConfig.sidebar)
        ) return config

        const parents = this.searchGroupParents(config.themeConfig.sidebar)
        const rootPath = path.join(process.cwd(), config.srcDir ?? '.')

        if (!fs.existsSync(rootPath)) {
            console.error(`[SidebarParentGenerator] srcDir "${config.srcDir}" does not exist. Please run vitepress in the root directory of your project.`)
            return config
        }

        if (config.buildEnd) {
            const currentBuildEnd = config.buildEnd
            config.buildEnd = async (...args) => {
                await currentBuildEnd(...args)
                this.cleanupGeneratedGroupParents()
            }
        } else {
            config.buildEnd = () => {
                this.cleanupGeneratedGroupParents()
            }
        }

        for (const parent of parents) {
            const filePath = this.generateParentMarkdown(rootPath, parent, options?.childrenCardGenerator)
            if (filePath) this.generatedGroupParents.add(filePath)
        }

        console.log(`[SidebarParentGenerator] Generated ${this.generatedGroupParents.size} sidebar group parent files.`)
        return config
    }

    private searchGroupParents(item: DefaultTheme.Sidebar, currentItems?: SidebarParents): SidebarParents {
        if (currentItems === undefined) currentItems = new Set()

        if (Array.isArray(item)) {
            // Sidebar array
            for (const subItem of item) {
                if (
                    subItem === null ||
                    typeof subItem !== 'object' ||
                    typeof subItem.base !== 'string' ||
                    typeof subItem.text !== 'string' ||
                    subItem.items === undefined
                ) continue

                if (!subItem.link) {
                    currentItems.add({
                        name: subItem.text,
                        path: subItem.base,
                        items: subItem.items
                    })

                    subItem.link = '/'
                }

                this.searchGroupParents(subItem.items, currentItems)
            }
        } else if (typeof item === 'object' && item !== null) {
            // Sidebar multi
            for (const [_, items] of Object.entries(item)) {
                if (Array.isArray(items)) {
                    this.searchGroupParents(items, currentItems)
                } else if (
                    typeof items === 'object' &&
                    items !== null &&
                    items.items !== undefined &&
                    Array.isArray(items.items)
                ) {
                    this.searchGroupParents(items.items, currentItems)
                }
            }
        }

        return currentItems
    }

    private generateParentMarkdown(rootPath: string, item: SetToObject<SidebarParents>, childrenCardGenerator: SidebarGroupParentGeneratorOptions['childrenCardGenerator']): string | null {
        const filePath = path.join(rootPath, item.path, 'index.md')
        if (!this.allowOverwrite && fs.existsSync(filePath)) return null

        const items = structuredClone(item.items).map((child) => {
            if (child.link === '/' && child.base) {
                child.link = path.parse(child.base).name
            }
            return child
        })

        const children = childrenCardGenerator != null ? childrenCardGenerator(items) : items.map((child) => {
            return `[${child.text}](${child.link})  `
        }).join('\n')

        let content = `
            ---
            title: ${item.name}
            ---

            <!-- This file is auto-generated by SidebarGroupParentGenerator. Do not edit it directly. -->

            # ${item.name}

            ${children}
        `

        try {
            fs.writeFileSync(filePath, content.trim().replaceAll(/ {3,}|\t/g, ''), { encoding: 'utf-8' })
        } catch (error) {
            console.error(`Failed to write file: ${filePath}`, error)
            return null
        }

        return filePath
    }

    private cleanupGeneratedGroupParents() {
        if (this.generatedGroupParents.size === 0) return
        for (const path of this.generatedGroupParents) {
            if (fs.existsSync(path)) {
                try {
                    fs.unlinkSync(path)
                } catch (error) {
                    console.error(`Failed to delete file: ${path}`, error)
                }
            }
        }

        console.log('[SidebarParentGenerator] Cleanup completed.')
        this.generatedGroupParents.clear()
    }

    private beforeExit() {
        this.cleanupGeneratedGroupParents()
        process.exit(0)
    }
}