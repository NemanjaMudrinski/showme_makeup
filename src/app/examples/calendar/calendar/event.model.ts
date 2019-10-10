import * as moment from 'moment';


export class Event {
    startEvent: moment.Moment;
    endEvent: moment.Moment;
    header: String;
    type: String;
    info: String;

    constructor(startEvent, endEvent, header, type, info){
        this.startEvent = startEvent;
        this.endEvent = endEvent;
        this.header = header;
        this.type = type;
        this.info = info;
    }

}