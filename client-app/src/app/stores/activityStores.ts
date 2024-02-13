import {  makeAutoObservable } from "mobx"

export default class ActivityStore {
    title = 'okta daffa ramadani'
    constructor()
    {
        makeAutoObservable(this)
    }

    setTitle = () =>
    {
        this.title = this.title + ' !'
    }
}