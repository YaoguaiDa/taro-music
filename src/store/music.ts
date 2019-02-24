import { observable } from 'mobx'
import events from '../utils/events'
import { findIndex } from '../utils'

export interface CurrentSongTypes {
	src: string
	name: string
	singer: string
}

export interface MusicTypes {
	// audioManager: any
	// setAudioManager: Function
	playlist: any[]
	currentIndex: number
	currentSong: object | CurrentSongTypes
	play: Function
	switch: Function
	setCurrentSong: Function
}

export default observable<MusicTypes>({
	// audioManager: null,
	// setAudioManager(audioManager) {
	// 	this.audioManager = audioManager
	// },
	playlist: [],
	currentIndex: -1,
	currentSong: {
		name: '没有意外',
		singer: [
			{
				id: 1016794,
				mid: '002nXp292LIOGV',
				name: '蔡徐坤'
			}
		],
		id: 228853305,
		mid: '003Fe8vW2OUnje',
		album: {
			id: 6272362,
			mid: '0005ixSf2Qclga',
			name: '没有意外',
			picUrl: 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000005ixSf2Qclga.jpg?max_age=2592000'
		},
		duration: 315,
		musicType: 'qq',
		src:
			'http://dl.stream.qqmusic.qq.com/C400003Fe8vW2OUnje.m4a?guid=239639072&vkey=677EB5F885637F27EC78879CE5E28E15D4712BACE1266FE875174D3E8C1B605DDCE889DAD115A55F9B447FE093DBDB49F9B5F1B4486880A8&uin=0&fromtag=38'
	},
	play({ song }) {
		if (song.id === this.currentSong.id) {
			return
		}
		const playlist = [...this.playlist]
		// 查询当前播放列表是否有待插入的音乐，并返回其索引
		let currentIndex = findIndex(playlist, song)
		// 当前播放列表有待插入的音乐时，直接改变当前播放音乐的索引
		if (currentIndex === -1) {
			currentIndex = playlist.push(song) - 1
			this.playlist = playlist
		}
		this.currentIndex = currentIndex
		this.currentSong = [...this.playlist][currentIndex]
		console.log(this.playlist)
		events.trigger('play')
	},
	switch() {},
	setCurrentSong(currentIndex) {
		this.currentIndex = currentIndex
		this.currentSong = [...this.playlist][currentIndex]
		events.trigger('play')
	}
})
