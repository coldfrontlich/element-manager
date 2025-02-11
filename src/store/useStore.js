import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
	persist(
		set => ({
			overrides: {},
			setOverride: (id, data) =>
				set(state => ({
					overrides: { ...state.overrides, [id]: data },
				})),
		}),
		{
			name: 'element-storage',
			getStorage: () => localStorage,
		}
	)
)
