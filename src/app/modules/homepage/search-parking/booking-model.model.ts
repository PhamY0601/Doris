export interface IBookingModel {
  id?: number;
  name?: string;
  license_plates?: string;
  type?: number;
  phone?: number;
  email?: string;
  time?: string;
  date?: string;
}
export class BookingModel implements IBookingModel {
  constructor(
    public id?: number,
    public name?: string,
    public license_plates?: string,
    public type?: number,
    public phone?: number,
    public email?: string,
    public time?: string,
    public date?: string,
  ) {
    this.id = id || undefined;
    this.name = name || '';
    this.license_plates =  license_plates || '';
    this.type = type || undefined;
    this.license_plates =  license_plates || '';
    this.phone = phone || undefined;
    this.email =  email || '';
    this.time = time || '';
    this.date = date || '';
  }
}
