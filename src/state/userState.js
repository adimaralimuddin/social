
import create from 'zustand'
import { persist } from 'zustand/middleware'
// import { persist } from "zustand/middleware"

export const userState = create(set => ({
    user: null,
    setUser: (newUser) => set({ user: newUser })

}))

export const profileState = create(persist(set => ({
    profile: null,
    followers: null,
    following: null,
    friends: null,
    posts: null,
    activeBtn: null,
    isLogin: null,
    setProfile: (data) => set({ profile: data }),
    setFollowers: (data) => set({ followers: data }),
    setFollowing: (data) => set({ following: data }),
    setFriends: (data) => set({ friends: data }),
    setPosts: (data) => set({ posts: data }),
    setActiveBtn: (name) => set({ activeBtn: name }),
    setIsLogin: (val) => set({ isLogin: val }),
})))

const selectedProfileUid = set => ({ uid: null, set: data => set({ uid: data }) })
export const selectedProfileUidState = create(persist(selectedProfileUid))

export const selectedProfileState = create(persist(set => ({
    profile: null,
    currentProfile: null,
    followers: null,
    following: [],
    friends: [],
    posts: [],
    setProfile: (data) => set({ profile: data }),
    setFollowers: (data) => set({ followers: data }),
    setFollowing: (data) => set({ following: data }),
    setFriends: (data) => set({ friends: data }),
    setPosts: (data) => set({ posts: data }),
})))

export const updateProfileState = create(set => ({
    profile: null,
    primaryInfo: null,
    hobbies: null,
    setProfile: (data) => set({ profile: data }),
    setPrimaryInfo: (data) => set({ primaryInfo: data }),
    setHobbies: (data) => set({ hobbies: data }),
}))

const updateProfileProfileStore = set => ({
    featuredImageFile: null,
    setFeaturedImageFile: (data) => set({ featuredImageFile: data }),
    avatarImageFile: null,
    setAvatarImageFile: (data) => set({ avatarImageFile: data }),
    featuredImageUrl: null,
    setFeaturedImageUrl: (data) => set({ featuredImageUrl: data }),
    bio: '',
    setBio: data => set({ bio: data })
})
export const updateProfileProfileState = create((updateProfileProfileStore))

const updateProfilePrimaryInfoStore = set => ({
    primaryInfo: {},
    setPrimaryInfo: data => set({ primaryInfo: data })
})
export const updateProfilePrimaryInfoState = create(persist(updateProfilePrimaryInfoStore))