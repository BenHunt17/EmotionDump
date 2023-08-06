//Removed most of the fields which I don't care about since it is a huge object.
//I've made every field optional so that the code doesn;t break. I won't try to assert a strict schema since the Daylio file has already proven to be a bit dodgy

export interface DaylioObject {
  tags?: {
    id?: number;
    name?: string;
    createdAt?: number;
    icon?: number;
    order?: number;
    state?: number;
    id_tag_group?: number;
  }[];
  dayEntries?: {
    id?: number;
    minute?: number;
    hour?: number;
    day?: number;
    month?: number;
    year?: number;
    datetime?: number;
    timeZoneOffset?: number;
    mood?: number;
    note?: string;
    note_title?: string;
    tags?: number[];
    assets?: number[];
  }[];
}
