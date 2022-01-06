import create from 'zustand'
import { persist } from "zustand/middleware";

const store = set => ({
    stupid: '',
    setactiveTab: name => set({ stupid: name })
})
export const tabState = create(persist(store))