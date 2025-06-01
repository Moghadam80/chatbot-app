'use client';

import React, { useState, useEffect } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { sendInformationAction } from '@/actions/profile/send-information';

interface PersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

const PersonalInfoForm = () => {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = z.object({
        firstName: z.string()
            .min(3, 'First name must be at least 3 characters')
            .max(50, 'First name must not exceed 50 characters')
            .refine(val => val.trim().length > 0, 'First name is required'),
        lastName: z.string()
            .min(3, 'Last name must be at least 3 characters')
            .max(50, 'Last name must not exceed 50 characters')
            .refine(val => val.trim().length > 0, 'Last name is required'),
        email: z.string()
            .email('Please enter a valid email address')
            .min(1, 'Email is required'),
        phone: z.string()
            .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number (e.g., +1234567890)')
            .min(1, 'Phone number is required'),
        address: z.string()
            .min(5, 'Address must be at least 5 characters')
            .max(200, 'Address must not exceed 200 characters')
            .refine(val => val.trim().length > 0, 'Address is required'),
    })

    type BillboardFormValues = z.infer<typeof formSchema>

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: session?.user?.email || '',
            phone: '',
            address: '',
        }
    })

    // Add useEffect to fetch initial data
    useEffect(() => {
        const fetchPersonalInfo = async () => {
            if (!session?.user?.email) return;
            
            try {
                const response = await fetch('/api/personal-info');
                const data = await response.json();
                if (data.success) {
                    form.reset(data.data);
                }
            } catch (error) {
                console.error('Error fetching personal info:', error);
            }
        };

        fetchPersonalInfo();
    }, [session]);

    const onSubmit = async (data: BillboardFormValues) => {
        setIsLoading(true);
        try {
            const response = await sendInformationAction(data)
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.message || 'Failed to save personal info');
            }

        } catch (error) {
            console.error('Error saving user data:', error);
            // You might want to show an error message to the user here
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-black">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            disabled={true}
                                            {...field}
                                            value={session?.user?.email || ''}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <FormField
                            control={form.control}
                            name='phone'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        >

                        </FormField>
                    </div>

                    <div>
                        <FormField
                            control={form.control}
                            name='address'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea disabled={isLoading} {...field} rows={3} />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        >

                        </FormField>
                    </div>

                    <div className="flex space-x-4">
                        <Button className='bg-blue-600 text-white rounded-xl' disabled={isLoading} type='submit'>
                            Save
                        </Button>
                    </div>
                </form>
            </Form>

        </div>
    );
};

export default PersonalInfoForm; 