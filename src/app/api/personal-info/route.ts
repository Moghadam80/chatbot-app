import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';
import PersonalInfo from '@/models/PersonalInfo';
import { useSession } from "next-auth/react";

const personalInfoSchema = z.object({
    firstName: z.string()
        .min(3, 'First name must be at least 3 characters')
        .max(50, 'First name must not exceed 50 characters'),
    lastName: z.string()
        .min(3, 'Last name must be at least 3 characters')
        .max(50, 'Last name must not exceed 50 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
    address: z.string()
        .min(5, 'Address must be at least 5 characters')
        .max(200, 'Address must not exceed 200 characters'),
});

export async function POST(req: Request) {

    try {
        await connectToDatabase();
        const body = await req.json();
        
        // Validate the request body
        const validatedData = personalInfoSchema.parse(body);
        
        // Check if user with this email already exists
        const existingUser = await PersonalInfo.findOne({ email: validatedData.email });
        if (existingUser) {
            // Update existing user's information
            const updatedUser = await PersonalInfo.findOneAndUpdate(
                { email: validatedData.email },
                validatedData,
                { new: true }
            );
            
            return NextResponse.json({
                success: true,
                message: 'Personal information updated successfully',
                data: updatedUser
            });
        }

        // Create new personal info document
        const personalInfo = new PersonalInfo(validatedData);
        await personalInfo.save();

        return NextResponse.json({
            success: true,
            message: 'Personal information saved successfully',
            data: personalInfo
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, message: 'Validation error', errors: error.errors },
                { status: 400 }
            );
        }
        
        console.error('Error saving personal info:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const { data: session } = useSession();

        
        if (!session?.user?.email) {
            return NextResponse.json({
                success: false,
                message: 'User not authenticated',
            }, { status: 401 });
        }

        await connectToDatabase();
        
        const personalInfo = await PersonalInfo.findOne({ email: session.user.email });
        
        if (!personalInfo) {
            return NextResponse.json({
                success: true,
                data: {
                    firstName: '',
                    lastName: '',
                    email: session.user.email,
                    phone: '',
                    address: '',
                }
            });
        }

        return NextResponse.json({
            success: true,
            data: personalInfo
        });
    } catch (error) {
        console.error('Error fetching personal info:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
} 