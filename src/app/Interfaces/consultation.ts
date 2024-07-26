export interface Consultation {
    patient: object
    doctor: object
    dateTime: string,
    type: number,
    paymentIntentId: string,
    clientSecret: string
}
