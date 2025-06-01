import { NextResponse } from "next/server";

interface PersonalInfoData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

export async function sendInformationAction(data: PersonalInfoData) {
    try {
        const response = await fetch('/api/personal-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        return response;
    } catch (error) {
        console.error('Error sending personal info:', error);
        throw error;
    }
}