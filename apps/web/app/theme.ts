'use client'

import { mergeThemeOverrides } from "@mantine/core"
import {theme} from "@yeongseoksong/framework/ui"
 
export const appTheme= mergeThemeOverrides(theme,{
    colors: {primary :[     '#e7f0fb', '#c8dcf4', '#a3c3ec', '#7aa8e3', '#4f8ddb',
      '#2374d4', '#0b5ed7', '#094db1', '#073d8c', '#052d68']}}
)