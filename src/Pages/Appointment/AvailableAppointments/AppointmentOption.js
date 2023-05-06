import React from 'react';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
    const { name, slots } = appointmentOption;

    return (
        <div className="card shadow-xl">
            <div className="card-body text-center ">
                <h2 className="card-title text-secondary font-bold self-center">{name}</h2>
                <p className='font-semibold'>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
                <p className='font-semibold mb-4'>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <div className="card-actions self-center">
                    <label htmlFor="booking-modal"
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(appointmentOption)} className={`btn border-0 text-white 
                        ${slots.length === 0 ? 'bg-slate-500' : 'bg-gradient-to-r from-secondary to-primary'}`}>Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;