import {  makeAutoObservable, runInAction } from "mobx"
import { Activity } from "../models/activities"
import { agent } from "../api/agen";
import {v4 as uuid} from 'uuid'
export default class ActivityStore {
    activity : Activity | undefined = undefined
    activityREgistry = new Map<string, Activity>()
    editModal = false;
    loadingUpdate = false;
    laodinDelete = false
    loadingInitial = false;
    constructor()
    {
        makeAutoObservable(this)
    }

get ActivitiesByDate()
{
    return Array.from(this.activityREgistry.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
}

    loadingActivies = async() => {
     this.loadingInitial = true;
     try {
        const activities = await agent.Activities.list()
        
            activities.forEach((activit) => {                
              activit.date = activit.date.split("T")[0];
            //   this.activities.push(activit);
            this.activityREgistry.set(activit.id, activit)
            });
            this.loadingInitial = false;
            
    } catch (error) {
        console.log(error);
        this.loadingInitial = false;        
     }
    }

    setLoadingInitial = (state:boolean) => {
        this.loadingInitial = state
    }

    selectActivity = (id:string) => {
        this.activity = this.activityREgistry.get(id);
    }

    cancelSelectActivity = () => {
        this.activity = undefined
    }

    openForm = (id?:string) => {
        id ? this.selectActivity(id) : this.cancelSelectActivity();
        this.editModal = true;
    }

    closeForm = () => {
        this.editModal = false;
    }

    createActivity = async(activity:Activity) => {
        this.loadingUpdate = true
        activity.id = uuid()
        try {
            await agent.Activities.create(activity)
            runInAction(() => {
                this.activityREgistry.set(activity.id, activity);
                this.activity = activity;
                this.editModal = false;
                this.loadingUpdate = false;
            })       
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingUpdate =false
            })
        }
    }

    updateActivity = async (activity : Activity) => {
        this.loadingUpdate= true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
               this.activityREgistry.set(activity.id, activity) 
               this.activity = activity;
               this.editModal = false;
               this.loadingUpdate= false;

            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingUpdate= false
            })
            
        }
    }

    handleDelete = async (id:string) => {
        this.laodinDelete =true
        try {
            await agent.Activities.delete(id)
            runInAction(() => {
                this.activityREgistry.delete(id);
                if(this.activity?.id === id) this.cancelSelectActivity()
                    this.laodinDelete = false
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.laodinDelete = false
            })            
        }
    }
}