import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types"

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const {uid, name} = getState().auth;

        try {
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();
    
            if(body.ok){
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                console.log(event);
                dispatch(eventAddNew(event));
            }
    
        } catch (error) {
            console.log(error);
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})
export const eventClearActive = () => ({
    type: types.eventClearActive
})

export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            // const {uid} = getState().auth;

            const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();
    
            if(body.ok){
                dispatch(eventUpdate(event));
            }else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const eventUpdate = (event) => ({
    type: types.eventUpdate,
    payload: event
})

export const eventStartDelete = () => {
    return async(dispatch, getState) => {

        const {id} = getState().calendar.activeEvent;

        try {
            const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if(body.ok){
                dispatch(eventDelete());
            }else{
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventDelete = () => ({
    type: types.eventDelete
})

export const eventStartLoading = () => {
    return async(dispatch) => {

        try {

            const resp = await fetchWithToken('events');
            const body = await resp.json();
            
            // const events = body.event;
            const events = prepareEvents(body.event);

            dispatch(eventLoaded(events));

        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventClean = () => ({
    type: types.eventClean
})