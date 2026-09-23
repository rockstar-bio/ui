import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"
import { Step, Steps } from "fumadocs-ui/components/steps"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import { File, Files, Folder } from "fumadocs-ui/components/files"
import { TypeTable } from "fumadocs-ui/components/type-table"

import { ComponentPreview } from "@/components/preview"
import { PropsTable } from "@/components/props-table"
import { ComponentExample } from "@/components/example"
import { Anatomy } from "@/components/anatomy"

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Steps,
    Step,
    Tab,
    Tabs,
    Files,
    Folder,
    File,
    TypeTable,
    ComponentPreview,
    PropsTable,
    ComponentExample,
    Anatomy,
    ...components,
  }
}
